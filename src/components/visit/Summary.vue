<template>
    <div>
      <h3>总价 : {{summary}}</h3>
      <Row>
        <Col span="12">
          <div v-for="(data, index) in examination" :key="index">
            {{data.name}} : {{data.price}}
          </div>
        </Col>
        <Col span="12">
          <div v-for="(data, index) in prescript" :key="index">
            {{data.name}} : {{data.price}} * {{data.number}} = {{data.summary}}
          </div>
        </Col>
      </Row>
    </div>
</template>

<script>
export default {
  name: 'Summary',
  props: {
    examination: Array,
    prescript: Array
  },
  computed: {
    summary () {
      let total = 0
      this.examination.forEach(item => {
        total += item.price
      })
      this.prescript.forEach(item => {
        total += item.summary
      })
      return total
    }
  }
}
</script>

<style scoped>
</style>
