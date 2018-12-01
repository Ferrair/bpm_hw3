<template>
  <Card class="card" title="检查单 - 118037910008">
    <Layout>
      <Content class="info-header gray-bg">
        <BasicInfo>
          <div slot="patient-info">
            <div>患者姓名: 王启航</div>
            <div>患者年龄: 21</div>
            <div>患者性别: 男</div>
            <div>检查单详情: CT检查</div>
          </div>
          <div slot="doctor-info">
            <div>医生姓名: 我是科室医生❤️</div>
            <div>医生联系方式: 16621004280</div>
          </div>
        </BasicInfo>
      </Content>
      <Divider>检查结果</Divider>
      <Content class="info-examination-result">
        <ExaminationResult @onResultChange="onResultChange"/>
      </Content>
      <Footer class="info-operation">
        <Button type="success" @click="confirm">检查结束</Button>
        <Button type="warning" @click="reExamination" style="margin-left: 20px">再次检查</Button>
      </Footer>
    </Layout>
    <p slot="extra">
      检查时间: 2018/12/02 09:00
    </p>
  </Card>
</template>

<script>
import BasicInfo from './basic/BasicInfo'
import ExaminationResult from './examination/ExaminationResult'

export default {
  name: 'Examination',
  components: {
    BasicInfo,
    ExaminationResult
  },
  data () {
    return {
    }
  },
  methods: {
    /**
     * 确认检查
     */
    confirm () {

    },

    /**
     * 再次检查
     */
    reExamination () {

    },
    /**
     * 检查结果数据
     */
    onResultChange (result) {
    }
  },
  mounted () {
    // APIUtil.get('Examination', {
    //   'Examination.patient_id.id': '1542698662334'
    // }).then(response => {
    //   if (response.status === 200) {
    //     let list = response.data.Examination
    //     console.log(list)
    //   }
    // })
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
