<template>
    <div>
      <div class="examination-image-area">
        <img class="examination-image" src='../../assets/pic1.jpeg'>
        <img class="examination-image" src='../../assets/pic2.jpeg'>
        <img class="examination-image" src='../../assets/pic3.jpeg'>
        <img class="examination-image" src='../../assets/pic4.jpeg'>
      </div>
      <Input class="examination-text" v-model="examinationResult" type="textarea" :rows="6" placeholder="输入检查结果" />
    </div>
</template>

<script>
export default {
  name: 'ExaminationResult',
  watch: {
    examinationResult () {
      this.$emit('onResultChange', this.examinationResult)
    }
  },
  data () {
    return {
      examinationResult: ''
    }
  }
}
</script>

<style scoped lang="scss">
  .examination-image-area {
    text-align: left;
    margin-left: 15px;

    .examination-image{
      max-height: 150px;
      max-width: 150px;
      padding: 10px;
    }
  }
  .examination-text{
    margin-top: 10px;
    padding: 10px;
  }
</style>
