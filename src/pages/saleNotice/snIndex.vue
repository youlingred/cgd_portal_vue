<template>
  <div>
    <detail ref="form" v-bind="formInit">
      <buttons-operator type="top"
                        algin="left"
                        :switchFlag.sync="flag"
                        :buttons="[{label:'搜索',type:'primary',click:search},
                      {label:'重置',type:'info',click:reset},
                      {type:'switch'}]"/>
    </detail>
    <buttons-operator type="top"
                      algin="right"
                      :buttons="[{label:'我要参与',type:'primary',click:join},
                      {label:'导出',type:'primary',click:exports}]"/>
    <cg-table ref="table" v-bind="table" @cell-click="cellClickHandler"/>
  </div>
</template>

<script>
  import CgTable from '@/components/CgTable.vue'
  import detail from '@/components/Detail.vue'
  import buttonsOperator from '@/components/ButtonsOperator.vue'

  export default {
    components: {
      CgTable,
      detail,
      buttonsOperator
    },
    data() {
      return {
        flag:false,
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
            },
            {
              label: '序号',
              type: 'index',
              width: 60
            },
            {
              label: '询价单名称',
              prop: 'planName',
              width: 150,
            },
            {
              label: '销售编号',
              prop: 'publishUser',
              width: 150,
            },
            {
              label: '要求到货日期',
              prop: 'publishDate',
              width: 180,
              formatter: (row, column, value) => {
                return this.moment(value).format("YYYY-MM-DD HH:mm:ss");
              }
            },
            {
              label: '发布日期',
              prop: 'publishDate',
              width: 180,
              formatter: (row, column, value) => {
                return this.moment(value).format("YYYY-MM-DD HH:mm:ss");
              }
            },
            {
              label: '报价截止日期',
              prop: 'publishDate',
              width: 180,
              formatter: (row, column, value) => {
                return this.moment(value).format("YYYY-MM-DD HH:mm:ss");
              }
            },
            {
              label: '采购机构',
              prop: 'publishUser'
            },
            {
              label: '采购类别',
              prop: 'publishUser',
              formatter: (row, column, value) => {
                switch(value){
                  case 1:
                    return '';
                  default:
                    return ''
                }
              },
            },
            {
              label: '采购员',
              prop: 'publishUser'
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
              labelWidth: '100px',
              inputWidth: '200px',
              inline: true,
              children: [
                {
                  type: 'input',
                  label: '询比单名称',
                  placeholder: '请输入采购单名称',
                  prop: 'planName',
                },
                {
                  type: 'input',
                  label: '销售单编号',
                  placeholder: '请输入采购单编号',
                  prop: 'planName',
                },
                {
                  type: 'select',
                  label: '采购机构',
                  placeholder: '请选择',
                  prop: 'status',
                  extendParam: {
                    remote: true,
                    filterable: true,
                    remote: true,
                    remoteMethod: this.query,
                    options: this.options
                  }
                },
                {
                  type: 'select',
                  label: '采购类别',
                  placeholder: '请选择',
                  prop: 'status',
                  extendParam: {
                    options: this.options
                  }
                },
                {
                  type: 'dateTimePicker',
                  label: '报价开始日期',
                  placeholder: '请输入开始时间',
                  prop: 'publishDate1',
                  extendParam: {
                    editable: false,
                    format: 'yyyy-mm-dd hh:mm:ss'
                  }
                },
                {
                  type: 'dateTimePicker',
                  label: '报价结束日期',
                  placeholder: '请输入结束时间',
                  prop: 'publishDate2',
                  extendParam: {
                    editable: false,
                    format: 'yyyy-mm-dd hh:mm:ss'
                  }
                },
                {
                  type: 'dateTimePicker',
                  label: '发布开始日期',
                  placeholder: '请输入开始时间',
                  prop: 'publishDate1',
                  switchFlag: this.flag,
                  extendParam: {
                    editable: false,
                    format: 'yyyy-mm-dd hh:mm:ss'
                  }
                },
                {
                  type: 'dateTimePicker',
                  label: '发布结束日期',
                  placeholder: '请输入结束时间',
                  prop: 'publishDate2',
                  switchFlag: this.flag,
                  extendParam: {
                    editable: false,
                    format: 'yyyy-mm-dd hh:mm:ss'
                  }
                },
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
      query(query) {
        if (!query) {
          query = ''
        }
        this.axios.post(this.appConfig.api('testQuerySelect'), this.form)
          .then((response) => {
            console.log(response.data.data);
            let list = response.data.data;

            this.options = list.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //参与
      join() {

      },
      //导出
      exports(){

      },
      cellClickHandler(row, column, cell, event) {
        console.log(row, column, cell, event);
        this.$router.push({name: 'saleNoticeDetail',params:{id:11}});
      }
    },
  }
</script>

<style scoped>

</style>

