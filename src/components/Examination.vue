<template>
  <Card class="card" title="检查单ID">
    <Layout>
      <Header class="info-header gray-bg">
        病人基本信息，医生基本信息
      </Header>
      <Content class="info-examination-item">检查项目 Table</Content>
      <Content class="info-examination-result">检查结果 Table</Content>
      <Content class="info-examination-image">检查图片 3个</Content>
      <Content class="info-examination-decs">检查描述 texearea</Content>
      <Footer class="info-operation">按钮 -- 确认/再次检查</Footer>
    </Layout>
    <p slot="extra">
      Timer
    </p>
  </Card>
</template>

<script>
export default {
  name: 'Examination',
  data () {
    return {
    }
  },
  methods: {
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
    height: 150px;
  }
  .info-examination-item{
    height: 150px;
  }
  .info-examination-result{
    height: 150px;
  }
  .info-examination-image {
    height: 150px;
  }
  .info-examination-decs{
    height: 150px;
  }
  .info-operation{
    height: 20px;
  }
</style>
