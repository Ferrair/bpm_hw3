<template>
    <div>
      <Card class="card" :title="headerText">
        <Layout>
          <Content class="info-header gray-bg">
            <BasicInfo>
              <div slot="patient-info">
                <div><strong>患者姓名:</strong> {{prescript.patient_id.name}}</div>
                <div><strong>患者年龄:</strong> 21</div>
                <div><strong>患者性别:</strong> 男</div>
                <div><strong>处方详情:</strong>
                  <span v-for="item in prescript.detail.split(';')" :key="item">
                     <br>{{item}}
                  </span>
                </div>
              </div>
              <div slot="doctor-info">
                <div><strong>药房名称:</strong> {{prescript.pharmacy_id.name}}️</div>
                <div><strong>药房地址:</strong> 3号楼201窗口</div>
              </div>
            </BasicInfo>
          </Content>
          <Button v-if="!started" type="success" class="start-button" @click="startPrescript">取药</Button>
          <div v-if="started">
            <Divider>取药结果</Divider>
            <Input class="prescript-text" v-model="result" type="textarea" :rows="6" placeholder="输入取药结果" />
            <Footer class="info-operation">
              <Button type="success" @click="confirm()">取药结束</Button>
            </Footer>
          </div>
        </Layout>
        <p slot="extra">
          处方时间: {{prescript.timestamp | beijing}}
        </p>
      </Card>
    </div>
</template>

<script>
import APIUtil from '../services/APIUtil'
import Util from '../services/Util'
import BasicInfo from './basic/BasicInfo'

export default {
  name: 'Prescript',
  components: {
    BasicInfo
  },
  data () {
    return {
      id: this.$route.params.id,
      prescript: Object,
      result: '',
      started: false
    }
  },
  computed: {
    headerText () {
      return '处方 - ' + this.id
    }
  },
  methods: {
    startPrescript () {
      this.started = true
    },
    confirm () {
      APIUtil.post('Drugresult', {
        'detail': this.result,
        'timestamp': Util.unix(),
        'patient_id_1': {'id': this.prescript.patient_id.id, 'type': 'Patient'},
        'pharmacy_id': {'id': this.prescript.pharmacy_id.id, 'type': 'pharmacy'},
        'prescript_id': {'id': this.prescript.id, 'type': 'prescript'}
      }).then(response => {
        if (response.status === 200) {
          alert('取药结束，病人已经拿药了')
        }
      })
    }
  },
  mounted () {
    APIUtil.get('Prescript/' + this.id).then(response => {
      if (response.status === 200) {
        this.prescript = response.data
      }
    })
  }
}
</script>

<style scoped lang="scss">
  .prescript-text{
    margin-top: 10px;
    padding: 10px;
  }
  .start-button{
    margin: 20px;
    padding: 10px;
  }
</style>
