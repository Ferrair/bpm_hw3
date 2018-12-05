<template>
    <Card class="card" :title="headerText">
      <Layout>
        <Content class="info-header gray-bg">
          <BasicInfo>
            <div slot="patient-info">
              <div>患者姓名: {{registration.patient_id.name}}</div>
              <div>患者年龄: 21</div>
              <div>患者性别: 男</div>
              <div>挂号详情: {{registration.detail}}</div>
            </div>
            <div slot="doctor-info">
              <div>医生姓名: {{registration.outpatient_doctor_id.name}}️</div>
              <div>医生联系方式: 16621004280</div>
              <div>医生主治: {{registration.outpatient_doctor_id.major}}️</div>
            </div>
          </BasicInfo>
        </Content>
        <Divider>检查单</Divider>
        <Content class="info-examination">
          <ExaminationTable @onSelectChange="onExaminationChange"/>
        </Content>
        <Divider>处方</Divider>
        <Content class="info-drug">
          <PrescriptTable @onSelectChange="onPrescriptChange"/>
        </Content>
        <Divider v-if="haveExamination||havePrescript">综合</Divider>
        <Content v-if="haveExamination||havePrescript" class="info-payment">
          <Summary :examination="examinationSummary" :prescript="prescriptSummary" @totalPriceChange="totalPriceChange"/>
        </Content>
        <Footer v-if="haveExamination||havePrescript" class="info-operation">
          <Button type="success" @click="confirm">确认诊断</Button>
        </Footer>
      </Layout>
      <p slot="extra">
        挂号时间:  {{registration.register_time | beijing}}
      </p>
    </Card>
</template>

<script>
import BasicInfo from './basic/BasicInfo'
import ExaminationTable from './visit/ExaminationTable'
import PrescriptTable from './visit/PrescriptTable'
import Summary from './visit/Summary'
import APIUtil from '../services/APIUtil'
import Util from '../services/Util'
import Vue from 'vue'

export default {
  name: 'Visit',
  components: {
    PrescriptTable,
    BasicInfo,
    ExaminationTable,
    Summary
  },
  data () {
    return {
      id: this.$route.params.id,
      registration: Object,
      /*
       *{
       *  name: '',
       *  price: ''
       *}
       *
       */
      examinationSummary: [],
      /*
       *{
       *  name: '',
       *  price: '',
       *  number: '',
       *  summary: ''
       *}
       *
       */
      prescriptSummary: [],
      haveExamination: false,
      havePrescript: false,
      summary: 0
    }
  },
  computed: {
    headerText () {
      return '挂号单 - ' + this.id
    }
  },
  methods: {
    totalPriceChange (summary) {
      this.summary = summary
    },
    /**
     * 检查单数据变化
     * @param selection 所有选择的数据
     */
    onExaminationChange (selection) {
      this.examinationSummary = []
      selection.forEach(item => {
        this.examinationSummary.push({
          name: item.name,
          price: item.price,
          medical_doctor_id: item.medical_doctor_id,
          description: item.description,
          medical_doctor_name: item.medical_doctor
        })
      })
      this.haveExamination = this.examinationSummary.length !== 0
    },

    /**
     * 处方数据变化
     * @param selection 所有选择的数据
     */
    onPrescriptChange (selection) {
      this.prescriptSummary = []
      selection.forEach(item => {
        this.prescriptSummary.push({
          name: item.name,
          price: item.price,
          number: item.number,
          summary: item.price * item.number,
          pharmacy_id: item.pharmacy_id,
          pharmacy: item.pharmacy
        })
      })
      this.havePrescript = this.prescriptSummary.length !== 0
    },
    /**
     * 处方数据的Payload
     */
    _prescriptPayload () {
      let detail = ''
      let pharmacyId = ''
      this.prescriptSummary.forEach(item => {
        pharmacyId = item.pharmacy_id
        detail += item.pharmacy + ' ==> ' + item.name + ' * ' + item.number + '  ' + item.description + ';'
      })
      return {
        'timestamp': Util.unix(),
        'detail': detail,
        'patient_id': {'id': this.registration.patient_id.id, 'type': 'Patient'},
        'outpatient_doctor_id': {'id': this.registration.outpatient_doctor_id.id, 'type': 'outpatientdoctor'},
        'pharmacy_id': {'id': pharmacyId, 'type': 'pharmacy'}
      }
    },
    /**
     * 检查单数据的Payload
     */
    _examinationPayload () {
      let data = this.examinationSummary[0]
      return {
        'timestamp': Util.unix(),
        'detail': '检查项目： ' + data.name + ';检查价格： ' + data.price + ';检查医生： ' + data.medical_doctor_name,
        'patient_id': {'id': this.registration.patient_id.id, 'type': 'Patient'},
        'outpatient_doctor_id': {'id': this.registration.outpatient_doctor_id.id, 'type': 'outpatientdoctor'},
        'medical_doctor_id': {'id': data.medical_doctor_id, 'type': 'medicaldoctor'}
      }
    },

    /**
     * 确认诊断
     */
    confirm () {
      /*
       * 单独生成检查单
       */
      if (this.haveExamination && !this.havePrescript) {
        let payload = this._examinationPayload()
        APIUtil.post('Examination', payload).then(response => {
          if (response.status === 200) {
            alert('检查单已经生成')
            this.payment('Examination', this.summary, {examination_id: response.data.id})
          }
        })
      }

      /*
       * 单独生成处方
       */
      if (!this.haveExamination && this.havePrescript) {
        let payload = this._prescriptPayload()

        APIUtil.post('Prescript', payload).then(response => {
          if (response.status === 200) {
            alert('处方已经生成')
            this.payment('Prescript', this.summary, {prescript_id: response.data.id})
          }
        })
      }
      /*
       * 共同生成检查单和处方
       */
      if (this.haveExamination && this.havePrescript) {
        Vue.axios.all([APIUtil.post('Prescript', this._prescriptPayload()), APIUtil.post('Examination', this._examinationPayload())])
          .then(Vue.axios.spread((res1, res2) => {
            alert('处方+检查单同时已经生成')
            this.payment('Both', this.summary, {prescript_id: res1.data.id, examination_id: res2.data.id})
          }))
      }
    },
    /**
     *
     * @param type 'Examination' | 'Prescript' | 'Both'
     * @param number
     * @param ids 检查单或者处方ID
     */
    payment (type, number, ids) {
      let payload = {
        'timestamp': Util.unix(),
        'type': type,
        'status': 'unpaid',
        'number': number,
        'patient_id': {'id': this.registration.patient_id.id, 'type': 'Patient'},
        'outpatient_doctor_id': {'id': this.registration.outpatient_doctor_id.id, 'type': 'outpatientdoctor'}
      }
      if (ids.prescript_id) {
        payload.prescript_id = {'id': ids.prescript_id, 'type': 'prescript'}
      }
      if (ids.examination_id) {
        payload.examination_id = {'id': ids.examination_id, 'type': 'examination'}
      }

      APIUtil.post('Payment', payload).then(response => {
        if (response.status === 200) {
          alert('缴费单已经生成, 价格：' + number)
          this.updateRegistration()
        }
      })
    },
    /**
     * 将Registration修改，便于前端进行Listen
     */
    updateRegistration () {
      let payload = this.registration
      payload.status = 'Payment'
      APIUtil.put('Registration/' + this.registration.id, payload).then(response => {
        if (response.status === 200) {
          console.log('UpdateRegistration')
        }
      })
    }

  },
  mounted () {
    APIUtil.get('Registration/' + this.id).then(response => {
      if (response.status === 200) {
        this.registration = response.data
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../scss/index.css";

  .info-header {
    height: auto;
  }
  .info-examination{
    height: auto;
  }
  .info-registration{
    height: auto;
  }
  .info-drug {
    height: auto;
  }
  .info-payment{
    height: auto;
    text-align: left;
    padding-left: 10px;
  }
  .info-operation{
    height: auto;
  }
</style>
