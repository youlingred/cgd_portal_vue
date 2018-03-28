<template>
  <div>
    <detail ref="form" v-bind="formInit">
      <buttons-operator type="top"
                        algin="left"
                        :buttons="[{label:'搜索',type:'primary',click:search},
                      {label:'重置',type:'info',click:reset}]"/>
    </detail>
    <buttons-operator type="top"
                      algin="right"
                      :buttons="[{label:'导出',type:'primary',click:exports}]"/>
    <IvTable ref="table" v-bind="table" @on-row-click="cellClickHandler"/>
  </div>
</template>

<script>
  import IvTable from '@/components/IvTable.vue'
  import detail from '@/components/Detail.vue'
  import buttonsOperator from '@/components/ButtonsOperator.vue'

  export default {
    components: {
      IvTable,
      detail,
      buttonsOperator
    },
    data() {
      return {
        options: [],
        //搜索条件表单数据
        form: {
          planName: '',
          publishUser: '',
          project: '',
          status: '',
          publishDate1: '',
          publishDate2: ''
        },
        table:{
          url: this.appConfig.api('testDylyListPage'),
          pageNo: 1,
          height: 400,
          queryParam: function (param) {
            console.log('queryParam:', param)
            return _.assign({test: 1}, param);
          },
          responseHandler: function (val) {
            console.log('responseHandler:', val)
            return val;
          },
          columns: [
            {
              type: 'selection',
              width:60,
            },
            {
              title: '序号',
              type: 'index',
              width: 80
            },
            {
              title: '标的物名称',
              key: 'planName',
              width: 150,
            },
            {
              title: '处置单位',
              key: 'publishUser',
              width: 150,
            },
            {
              title: '处置单位联系人',
              key: 'publishUser',
              width: 150,
            },
            {
              title: '处置单位联系电话',
              key: 'publishUser',
              width: 150,
            },
            {
              title: '提货地点',
              key: 'publishUser',
              width: 150,
            },
            {
              title: '采购方联系人',
              key: 'publishUser',
              width: 150,
            },
            {
              title: '采购方联系电话',
              key: 'publishUser',
              width: 150,
            },
            {
              title: '下达意向时间',
              key: 'publishDate',
              width: 180,
              render: (h, { row, column }) => {
                return h('div',row.publishDate===(null||'')?'-':this.moment(row.publishDate).format("YYYY-MM-DD HH:mm:ss"));
              }
            },
            {
              title: '公告名称',
              key: 'publishUser',
              width: 120,
            }
          ]
        },
      }
    },
    computed: {
      formInit() {
        return {
          contents: [
            {
              data: this.form,
              labelWidth: '150px',
              inputWidth: '200px',
              inline: true,
              children: [
                {
                  type: 'input',
                  label: '采购方',
                  placeholder: '请输入采购单名称',
                  prop: 'planName',
                },
                {
                  type: 'input',
                  label: '标的物名称',
                  placeholder: '请输入采购单编号',
                  prop: 'planName',
                },
                {
                  type: 'dateTimePicker',
                  label: '下达意向开始日期',
                  placeholder: '请输入开始时间',
                  prop: 'publishDate1',
                  extendParam: {
                    editable: false,
                    format: 'yyyy-MM-dd HH:mm:ss'
                  }
                },
                {
                  type: 'dateTimePicker',
                  label: '下达意向结束日期',
                  placeholder: '请输入结束时间',
                  prop: 'publishDate2',
                  extendParam: {
                    editable: false,
                    format: 'yyyy-MM-dd HH:mm:ss'
                  }
                }
              ]
            }
          ]
        }
      },
    },
    watch:{
      //监听tabs切换
      activeName:function(){
        this.search();
      }
    },
    methods: {
      //搜索
      search() {
        this.$refs.table.query(this.form)
      },
      //重置
      reset() {
        //因为detail组件可以包含多个表单,所以返回的的是表单数组forms
        this.$refs.form.forms[0].resetFields();
      },
      //FIXME 远程请求select数据
      // query(query) {
      //   if (!query) {
      //     query = ''
      //   }
      //   this.axios.post(this.appConfig.api('testQuerySelect'), this.form)
      //     .then((response) => {
      //       console.log(response);
      //       let list = response;
      //
      //       this.options = list.filter(item => {
      //         return item.label.toLowerCase()
      //           .indexOf(query.toLowerCase()) > -1;
      //       });
      //     })
      //     .catch(function (error) {
      //       console.log(error);
      //     });
      // },
      //导出
      exports(){

      },
      cellClickHandler(row) {
        console.log(row);
        this.$router.push({name: 'idleMaterialsDetail',params:{type:1,id:11}});
      }
    },
  }
</script>

<style scoped>

</style>

