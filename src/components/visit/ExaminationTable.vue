<template>
    <div>
      <Table border stripe  height="250"
             :columns="examination_columns"
             @on-selection-change="onSelectChange"
             :data="examination_data">
      </Table>
    </div>
</template>

<script>
export default {
  name: 'ExaminationTable',
  data () {
    return {
      examination_columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '检查项目',
          width: 150,
          key: 'name'
        },
        {
          title: '价格 ¥',
          width: 100,
          align: 'right',
          key: 'price'
        },
        {
          title: '科室医生',
          width: 150,
          key: 'medical_doctor'
        },
        {
          title: '描述',
          key: 'description'
        }
      ],
      examination_data: [
        {
          name: 'CT检查',
          price: 180,
          medical_doctor: '王医生',
          description: '一些介绍吧，显的界面丰满一点',
          medical_doctor_id: ''
        },
        {
          name: '血常规',
          price: 100,
          medical_doctor: '简医生',
          description: '一些介绍吧，显的界面丰满一点',
          medical_doctor_id: ''
        }, {
          name: '核磁共振',
          price: 1080,
          medical_doctor: '陈医生',
          description: '一些介绍吧，显的界面丰满一点',
          medical_doctor_id: ''
        }, {
          name: '肝功能',
          price: 50,
          medical_doctor: '郑医生',
          description: '一些介绍吧，显的界面丰满一点',
          medical_doctor_id: ''
        }, {
          name: 'B超',
          price: 800,
          medical_doctor: '宋医生',
          description: '一些介绍吧，显的界面丰满一点',
          medical_doctor_id: ''
        }, {
          name: '心电图',
          price: 900,
          medical_doctor: '何医生',
          description: '一些介绍吧，显的界面丰满一点',
          medical_doctor_id: ''
        }
      ]
    }
  },
  methods: {
    onSelectChange (selection) {
      // selection is all the selected list， should dispatch it to parent view
      this.$emit('onSelectChange', selection)
    }
  }
}
</script>

<style scoped>
</style>
