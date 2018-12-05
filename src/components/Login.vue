<template>
    <div>
      <Card :bordered="false" class="card">
        <p slot="title">后台系统登录</p>
         <Input v-model="name" prefix="ios-contact" placeholder="Username" style="width: 300px" />
         <Input v-model="password"  type="password" prefix="ios-lock" placeholder="Password" style="width: 300px;margin-top: 10px" />
        <p></p>
         <Button type="primary" style="width: 100px; margin-top: 40px" @click="login">登录</Button>
      </Card>
    </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      name: '',
      password: ''
    }
  },
  methods: {
    login () {
      if (this.name === 'outpatient' && this.password === '123456') {
        // 门诊医生
        this.$store.dispatch('changeLoginState', true)
        this.$store.dispatch('changeRole', 'outpatient')
        this.$router.push({
          name: 'VisitList'
        })
      } else if (this.name === 'medical' && this.password === '123456') {
        // 科室医生
        this.$store.dispatch('changeLoginState', true)
        this.$store.dispatch('changeRole', 'medical')
        this.$router.push({
          name: 'ExaminationList'
        })
      } else if (this.name === 'pharmacy' && this.password === '123456') {
        // 药房
        this.$store.dispatch('changeLoginState', true)
        this.$store.dispatch('changeRole', 'pharmacy')
        this.$router.push({
          name: 'PrescriptList'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .card {
    width: 500px;
    margin-left: 450px;
    margin-top: 50px;
  }
</style>
