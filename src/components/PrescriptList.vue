<template>
    <div>
      <Card v-for="prescript in prescriptList"
            :key="prescript.id"
            class="card">
        <p slot="title" style="text-align:left">
          <Icon type="ios-film-outline"></Icon>
          {{prescript.id}}
        </p>
        <a href="#" slot="extra" @click.prevent="handleClick(prescript.id)">
          处理
        </a>

        <div style="text-align:left">
          <p>开方时间： {{prescript.timestamp | beijing}}</p>
          <p>病人： {{prescript.patient_id.name}}</p>
          <p>药房： {{prescript.pharmacy_id.name}}</p>
          <p>检查单详情： {{prescript.detail}}</p>

        </div>
      </Card>
    </div>
</template>

<script>
import APIUtil from '../services/APIUtil'

export default {
  name: 'PrescriptList',
  data () {
    return {
      prescriptList: []
    }
  },
  methods: {
    handleClick (id) {
      this.$router.push({
        name: 'Prescript',
        params: {
          id: id
        }
      })
    }
  },
  mounted () {
    APIUtil.get('Prescript').then(response => {
      if (response.status === 200) {
        this.prescriptList = response.data.Prescript.sort((a, b) => {
          return b.timestamp - a.timestamp
        })
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
