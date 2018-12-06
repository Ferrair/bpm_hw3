<template>
  <Card id="pdf" class="card" :title="headerText">
    <Layout>
      <Content class="info-header gray-bg">
        <BasicInfo>
          <div slot="patient-info">
            <div><strong>患者姓名: </strong>{{examination.patient_id.name}}</div>
            <div><strong>患者年龄: </strong>21</div>
            <div><strong>患者性别: </strong>男</div>
            <div><strong>检查单详情: </strong>{{examination.detail}}</div>
          </div>
          <div slot="doctor-info">
            <div><strong>医生姓名: </strong>{{examination.medical_doctor_id.name}}️</div>
            <div><strong>医生联系方式:</strong> 16621004280</div>
          </div>
        </BasicInfo>
      </Content>
      <Button v-if="!started" type="success" class="start-button" @click="startExamination">开始检查</Button>
      <div v-if="started">
        <Divider>检查结果</Divider>
        <Content class="info-examination-result">
          <ExaminationResult @onResultChange="onResultChange"/>
        </Content>
        <Footer class="info-operation">
          <Button :disabled="finished" type="success" @click="confirm(false)">检查结束</Button>
          <Button :disabled="finished" type="warning" @click="confirm(true)" style="margin-left: 20px">再次检查</Button>
        </Footer>
      </div>
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
      result: '',
      started: false,
      finished: false
    }
  },
  computed: {
    headerText () {
      return '检查单 - ' + this.id
    }
  },
  methods: {
    /**
     * 生成报告
     * @param id: 检查结果数据
     */
    generateReport (id) {
      this.generatePDF(id, file => {
        let fd = new FormData()
        fd.append(id, file)
        APIUtil.postFormData('Examinationresult/' + id, fd).then(response => {
          console.log(response.data)
        })
      })
    },
    /**
     * 确认检查
     */
    confirm (reExamination = false) {
      APIUtil.post('Examinationresult', {
        'detail': this.result,
        'timestamp': Util.unix(),
        'need_re_examination': reExamination ? 'Yes' : 'No',
        'patient_id_1': {'id': this.examination.patient_id.id, 'type': 'Patient'},
        'examination_id': {'id': this.examination.id, 'type': 'examination'},
        'medical_doctor_id': {'id': this.examination.medical_doctor_id.id, 'type': 'medicaldoctor'}
      }).then(response => {
        if (response.status === 200) {
          alert('检查完成')
          this.generateReport(response.data.id)
          this.finished = true
        }
      })
    },
    /**
     * 检查结果数据
     */
    onResultChange (result) {
      this.result = result
    },

    startExamination () {
      this.started = true
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
  .start-button{
    margin: 20px;
    padding: 10px;
  }
</style>
