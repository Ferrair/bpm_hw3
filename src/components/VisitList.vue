<template>
    <div>
      <Card v-for="registration in registrationList"
            :key="registration.id"
            class="card">
        <p slot="title" style="text-align:left">
          <Icon type="ios-film-outline"></Icon>
          {{registration.id}}
        </p>
        <a href="#" slot="extra" @click.prevent="handleClick(registration.id)">
          处理
        </a>

        <div style="text-align:left">
          <p>挂号时间： {{registration.register_time | beijing}}</p>
          <p>挂号病人： {{registration.patient_id.name}}</p>
          <p>挂号详情： {{registration.detail}}</p>

        </div>
      </Card>
    </div>
</template>

<script>
import APIUtil from '../services/APIUtil'

export default {
  name: 'VisitList',
  data () {
    return {
      registrationList: []
    }
  },
  methods: {
    handleClick (id) {
      this.$router.push({
        name: 'Visit',
        params: {
          id: id
        }
      })
    }
  },
  mounted () {
    APIUtil.get('Registration').then(response => {
      if (response.status === 200) {
        this.registrationList = response.data.Registration
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
