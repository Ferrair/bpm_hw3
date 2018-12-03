<template>
  <div>
    <Card v-for="examination in examinationList"
          :key="examination.id"
          class="card">
      <p slot="title" style="text-align:left">
        <Icon type="ios-film-outline"></Icon>
        {{examination.id}}
      </p>
      <a href="#" slot="extra" @click.prevent="handleClick(examination.id)">
        处理
      </a>

      <div style="text-align:left">
        <p>开单时间： {{examination.timestamp | beijing}}</p>
        <p>病人： {{examination.patient_id.name}}</p>
        <p>门诊医生： {{examination.medical_doctor_id.name}}</p>
        <p>检查单详情： {{examination.detail}}</p>

      </div>
    </Card>
  </div>
</template>

<script>
import APIUtil from '../services/APIUtil'

export default {
  name: 'ExaminationList',
  data () {
    return {
      examinationList: []
    }
  },
  methods: {
    handleClick (id) {
      this.$router.push({
        name: 'Examination',
        params: {
          id: id
        }
      })
    }
  },
  mounted () {
    APIUtil.get('Examination').then(response => {
      if (response.status === 200) {
        this.examinationList = response.data.Examination
      }
    })
  }
}
</script>

<style scoped lang="scss">
  .card {
    width: 500px;
    margin-left: 300px;
    margin-top: 20px;
  }
</style>
