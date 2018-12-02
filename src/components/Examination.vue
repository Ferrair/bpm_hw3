<template>
  <Card class="card" title="检查单 - 118037910008">
    <Layout>
      <Content class="info-header gray-bg">
        <BasicInfo>
          <div slot="patient-info">
            <div>患者姓名: {{examination.patient_id.name}}</div>
            <div>患者年龄: 21</div>
            <div>患者性别: 男</div>
            <div>检查单详情: {{examination.detail}}</div>
          </div>
          <div slot="doctor-info">
            <div>医生姓名: {{examination.medical_doctor_id.name}}️</div>
            <div>医生联系方式: 16621004280</div>
          </div>
        </BasicInfo>
      </Content>
      <Divider>检查结果</Divider>
      <Content class="info-examination-result">
        <ExaminationResult @onResultChange="onResultChange"/>
      </Content>
      <Footer class="info-operation">
        <Button type="success" @click="confirm(false)">检查结束</Button>
        <Button type="warning" @click="confirm(true)" style="margin-left: 20px">再次检查</Button>
      </Footer>
    </Layout>
    <p slot="extra">
      检查时间: {{examination.timestamp | beijing}}
    </p>
  </Card>
</template>

<script>
import BasicInfo from './basic/BasicInfo'
import ExaminationResult from './examination/ExaminationResult'
import APIUtil from '../services/APIUtil'
import Util from '../services/Util'

export default {
  name: 'Examination',
  components: {
    BasicInfo,
    ExaminationResult
  },
  data () {
    return {
      id: this.$route.params.id,
      examination: Object,
      result: ''
    }
  },
  computed: {
    headerText () {
      return '检查单 - ' + this.id
    }
  },
  methods: {
    /**
     * 确认检查
     */
    confirm (reExamination = false) {
      APIUtil.post('Examinationresult', {
        'detail': this.result,
        'timestamp': Util.unix(),
        'need_re_examination': reExamination ? 'Yes' : 'No',
        'patient_id_1': {'id': this.examination.patient_id.id, 'type': 'Patient'},
        'medical_doctor_id': {'id': this.examination.medical_doctor_id.id, 'type': 'medicaldoctor'}
      }).then(response => {
        if (response.status === 200) {
          // TODO callback
        }
      })
    },
    /**
     * 检查结果数据
     */
    onResultChange (result) {
      this.result = result
    }
  },
  mounted () {
    APIUtil.get('Examination/' + this.id).then(response => {
      if (response.status === 200) {
        this.examination = response.data
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../scss/index.css";

  .info-header {
    height: auto;
  }
  .info-examination-result{
    height: auto;
  }
  .info-operation{
    height: auto;
  }
</style>
