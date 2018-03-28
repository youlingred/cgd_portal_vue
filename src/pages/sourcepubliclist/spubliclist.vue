<template>
  <div>
    <detail ref="send" v-bind="formInitDataSend">
      <buttons-operator type="top"
                        algin="left"
                        :buttons="[
                          {label:'搜索',type:'primary',click:search},
                          {label:'重置',type:'info',click:resetForm}
                          ]"/>
    </detail>
    <buttons-operator type="top"
                      algin="right"
                      :buttons="[{label:'导出',type:'primary',click:exportFunc}]"/>
    <IvTable ref="table" v-bind="table" @on-row-click="cellClickHandler"></IvTable>
  </div>
</template>

<script>
  import detail from '@/components/Detail.vue'
  import buttonsOperator from '@/components/ButtonsOperator.vue'
  import IvTable from '@/components/IvTable.vue'

  export default {
    data () {
      return {
        form: {
          name: '',
          project: '',
          status: ''
        },
      }
    },
    created(){
    },
    computed: {
      //发出澄清表单初始化数据
      formInitDataSend() {
        return {
          contents: [
            {
              data: this.form,
              labelWidth: '100px',
              inputWidth: '200px',
              inline: true,
              children: [
                {
                  type: 'input',
                  label: '计划名称',
                  placeholder: '请输入',
                  prop: 'name',
                },
                {
                  type: 'input',
                  label: '项目单位',
                  placeholder: '请输入',
                  prop: 'project',
                },
                {
                  type: 'select',
                  label: '受理状态',
                  placeholder: '请选择',
                  prop: 'status',
                  extendParam: {
                    options : [
                      {
                        label: '处理中',
                        value: 1
                      },
                      {
                        label: '已处理',
                        value: 2
                      },
                      {
                        label: '驳回',
                        value: 3
                      },
                    ]
                  }
                }
              ]
            }
          ]
        }
      },
      //table初始化数据
      table() {
        return {
          url: this.appConfig.api('plan/qryVendorSingleSourcePublicObjectionList'),
          pageNo: 1,
          height: 400,
          columns: [
            {
              type: 'selection',
              width: 60
            },
            {
              title: '序号',
              type: 'index',
              width: 80
            },
            {
              title: '计划名称',
              key: 'planName'
            },
            {
              title: '发布人',
              key: 'createUserName'
            },
            {
              title: '公告发布时间',
              key: 'publishDate',
              render: (h, { row, column }) => {
                return h('div',row.publishDate===(null||'')?'-':this.moment(row.publishDate).format("YYYY-MM-DD HH:mm:ss"));
              }
            },
            {
              title: '异议提出时间',
              key: 'objectionDate',
              render: (h, { row, column }) => {
                return h('div',row.objectionDate===(null||'')?'-':this.moment(row.objectionDate).format('YYYY-MM-DD HH:mm:ss'));
              }
            },
            {
              title: '受理状态',
              key: 'dealStatusName',
              formatter: function (row, column, value) {
                switch (value) {
                  case 1:
                    return '处理中';
                    break;
                  case 2:
                    return '已受理';
                    break;
                  case 3:
                    return '驳回';
                    break;
                }
              }
            }
          ],
        }
      }
    },

    methods: {
      cellClickHandler(row){
        this.$router.push({name:'spublicdetails',params:{
            publicityId:row.publicityId,
            publicityObjectionId:row.publicityObjectionId
          }})
      },
      search () {
        this.$refs.table.query(this.form);
      },
      resetForm () {
        this.$refs['send'].forms[0].resetFields();
      },
      exportFunc () {
        console.log(this.$refs.table.m_selection);
      },
    },
    components: {
      IvTable,
      detail,
      buttonsOperator
    }
  }

</script>

<style>


</style>
