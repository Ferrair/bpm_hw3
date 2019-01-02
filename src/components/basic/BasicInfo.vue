<template>
    <div class="basic-info">
      <Row>
        <Col span="12">
          <Row>
            <Col span="8">
              <img class="basic-info-avatar" :src="patientImage">
            </Col>
            <Col span="16" class="basic-info-text">
              <slot name="patient-info"></slot>
            </Col>
          </Row>
        </Col>
        <Col span="12">
          <Row>
            <Col span="8">
              <img class="basic-info-avatar" :src="doctorImage">
            </Col>
            <Col span="16" class="basic-info-text">
              <slot name="doctor-info"></slot>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
</template>

<script>
export default {
  name: 'BasicInfo',
  data () {
    return {
      patientImage: require('../../assets/avatar.png'),
      doctorImage: require('../../assets/doctor1.jpeg')
    }
  }
}
</script>

<style lang="scss" scoped>
  .basic-info {
    padding-top: 10px;

    .basic-info-avatar {
      max-height: 140px;
      max-width: 140px;
    }
    .basic-info-text {
      text-align: left;
      line-height: 2;
    }
  }

</style>
