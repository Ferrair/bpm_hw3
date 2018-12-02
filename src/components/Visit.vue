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
          <Summary :examination="examinationSummary" :prescript="prescriptSummary"/>
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
      havePrescript: false
    }
  },
  computed: {
    headerText () {
      return '挂号单 - ' + this.id
    }
  },
  methods: {
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
     * 确认诊断
     */
    confirm () {
      /*
       * 生成检查单
       */
      if (this.haveExamination) {
        let data = this.examinationSummary.pop()

        APIUtil.post('Examination', {
          'timestamp': Util.unix(),
          'detail': '检查项目： ' + data.name + ';检查价格： ' + data.price + ';检查医生： ' + data.medical_doctor_name,
          'patient_id': {'id': this.id, 'type': 'Patient'},
          'outpatient_doctor_id': {'id': this.registration.outpatient_doctor_id.id, 'type': 'outpatientdoctor'},
          'medical_doctor_id': {'id': data.medical_doctor_id, 'type': 'medicaldoctor'}
        }).then(response => {
          if (response.status === 200) {
            // TODO callback
          }
        })
      }

      /*
       * 生成处方
       */
      if (this.havePrescript) {
        let detail = ''
        let pharmacyId = ''
        this.prescriptSummary.forEach(item => {
          pharmacyId = item.pharmacy_id
          detail += item.pharmacy + ' ==> ' + item.name + ' * ' + item.number + '  ' + item.description + ';'
        })

        APIUtil.post('Prescript', {
          'timestamp': Util.unix(),
          'detail': detail,
          'patient_id': {'id': this.id, 'type': 'Patient'},
          'outpatient_doctor_id': {'id': this.registration.outpatient_doctor_id.id, 'type': 'outpatientdoctor'},
          'pharmacy_id': {'id': pharmacyId, 'type': 'pharmacy'}
        }).then(response => {
          if (response.status === 200) {
            // TODO callback
          }
        })
      }
    },

    payment (type, number, id) {
      // TODO Payment怎么生成
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
<style lang="less" scoped>
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
