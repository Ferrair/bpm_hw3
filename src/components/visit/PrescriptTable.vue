<template>
    <div>
      <Table border stripe class="table"
             :columns="prescript_columns"
             @on-selection-change="onSelectChange"
             :data="prescript_data">
      </Table>
    </div>
</template>

<script>
export default {
  name: 'PrescriptTable',
  data () {
    return {
      prescript_columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '药品名称',
          width: 150,
          key: 'name'
        },
        {
          title: '单价 ¥',
          width: 100,
          align: 'right',
          key: 'price'
        },
        {
          title: '数量 (盒/支)',
          width: 150,
          key: 'defaultNumber',
          render: (createElement, params) => {
            /**
             * dom DOM元素
             * params: index, row, column的数据
             */
            return createElement('div', [
              createElement('InputNumber', {
                props: {
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  input: (event) => {
                    this.prescript_data[params.index].number = event
                  }
                }
              })
            ])
          }
        },
        {
          title: '地址',
          width: 150,
          key: 'pharmacy'
        },
        {
          title: '描述',
          key: 'description'
        }
      ],
      prescript_data: [
        {
          name: '阿莫西林',
          price: 30,
          defaultNumber: 1, // default value
          description: '一天两次，早晚饭前使用',
          pharmacy: '药房1',
          pharmacy_id: 1542701091197
        },
        {
          name: '头孢拉定',
          price: 50,
          defaultNumber: 1, // default value
          description: '一天一次，睡前使用',
          pharmacy: '药房1',
          pharmacy_id: 1542701091197
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
