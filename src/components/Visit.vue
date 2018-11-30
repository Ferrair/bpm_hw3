<template>
    <Card class="card" title="挂号单ID">
      <Layout>
        <Header class="info-header gray-bg">
          病人基本信息，医生基本信息
        </Header>
        <Content class="info-registration">病人挂号信息</Content>
        <Content class="info-examination">检查单在这里开  Table</Content>
        <Content class="info-drug">药物在这里开 Table</Content>
        <Content class="info-payment">费用综合 直接列出具体明细</Content>
        <Footer class="info-operation">按钮 -- 确认</Footer>
      </Layout>
      <p slot="extra">
        Timer
      </p>
    </Card>
</template>

<script>

export default {
  name: 'Visit',
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../scss/index.css";

  .info-header {
    height: 150px;
  }
  .info-examination{
    height: 150px;
  }
  .info-registration{
    height: 150px;
  }
  .info-drug {
    height: 150px;
  }
  .info-payment{
    height: 150px;
  }
  .info-operation{
    height: 20px;
  }
</style>
