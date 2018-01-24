<template>
  <div>
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="待报价" name="offering">
        </el-tab-pane>
        <el-tab-pane label="已报价" name="offeried">

        </el-tab-pane>
      </el-tabs>
      <detail ref="form" v-bind="formInit" noborder>
        <buttons-operator type="top"
                          algin="left"
                          :buttons="[{label:'查询',type:'primary',click:search},
                          {label:'重置',type:'info',click:reset},]"/>
      </detail>


    </el-card>
    <buttons-operator type="top"
                      algin="right"
                      :buttons="[{label:'通过',type:'primary',click:pass},{label:'驳回',type:'primary',click:reject}]"/>
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
        //当前激活的tab名称
        activeName: 'offering',
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
              width: '100',
              formatter: (row, column, value) => {
                return value;
              }
            },
            {
              label: '销售编号',
              prop: 'publishUser'
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
              label: '报价截止',
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
              }
            },
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
                  label: '销售编号',
                  placeholder: '请输入销售编号',
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
                  type: 'input',
                  label: '澄清内容',
                  placeholder: '模糊查询,可用个逗号隔开',
                  prop: 'publishUser',
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
            console.log(response);
            let list = response;

            this.options = list.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //通过
      pass() {
        this.$router.push({name: 'clarifyOfferEdit'})
      },
      //驳回
      reject(){

      },
      cellClickHandler(row, column, cell, event) {
        console.log(row, column, cell, event);
        console.log(this.activeName);
        if (this.activeName === 'offeried') {
          this.$router.push({name: 'priceOfferDetail'});
        }
      }
    },
  }
</script>

<style scoped>

</style>

