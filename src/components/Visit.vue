<template>
    <Card class="card" title="挂号单 - 118037910008">
      <Layout>
        <Content class="info-header gray-bg">
          <BasicInfo>
            <div slot="patient-info">
              <div>患者姓名: 王启航</div>
              <div>患者年龄: 21</div>
              <div>患者性别: 男</div>
              <div>挂号详情: 组件是可复用的 Vue 实例，且带有一个名字：在这个例子中是我们可以在一个通过 new Vue 创建的 Vue 根实例中，把这个组件作为自定义元素来使用。️</div>
            </div>
            <div slot="doctor-info">
              <div>医生姓名: 我是门诊医生❤️</div>
              <div>医生联系方式: 16621004280</div>
              <div>医生主治: 不孕不育🧒👦不孕不育🧒👦不孕不育🧒👦不孕不育🧒👦不孕不育🧒👦不孕不育🧒👦</div>
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
        挂号时间: 2018/12/02 09:00
      </p>
    </Card>
</template>

<script>
import BasicInfo from './basic/BasicInfo'
import ExaminationTable from './visit/ExaminationTable'
import PrescriptTable from './visit/PrescriptTable'
import Summary from './visit/Summary'

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
          price: item.price
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
          summary: item.price * item.number
        })
      })
      this.havePrescript = this.prescriptSummary.length !== 0
    },

    /**
     * 确认诊断
     */
    confirm () {

    }

  },
  mounted () {
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
