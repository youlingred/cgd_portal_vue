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
                          :switchFlag.sync="flag"
                          :buttons="[{label:'查询',type:'primary',click:search},
                          {label:'重置',type:'info',click:reset},{type:'switch'}]"/>
      </detail>


    </el-card>
    <buttons-operator v-if="activeName==='offering'" type="top"
                      algin="right"
                      :buttons="[{label:'发起澄清',type:'primary',click:createClarify},{label:'导出',type:'primary',click:exportDoc}]"/>
    <buttons-operator v-if="activeName==='offeried'" type="top"
                      algin="right"
                      :buttons="[{label:'发起澄清',type:'primary',click:createClarify},{label:'撤回',type:'primary',click:reject},{label:'导出',type:'primary',click:exportDoc}]"/>

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
        flag: false,
        //当前激活的tab名称
        activeName:'offering',
        options: [],
        //搜索条件表单数据
        form: {
          inquiryName:'',
          inquiryCode:'',
          professionalOrgId:'',
          purchaseCategory:'',
          quoteEndDateStart:'',
          quoteEndDateEnd:'',
          publishTimeStart:'',
          publishTimeEnd:''
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
                  label: '询价单名称',
                  placeholder: '请输入询价单名称',
                  prop: 'inquiryName',
                },
                {
                  type: 'input',
                  label: '采购编号',
                  placeholder: '请输入销售编号',
                  prop: 'inquiryCode',
                },
                {
                  type: 'select',
                  label: '采购机构',
                  placeholder: '请选择',
                  prop: 'professionalOrgId',
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
                  prop: 'purchaseCategory',
                  extendParam: {
                    options: [
                      {label: '物资类', value:1 },
                      {label: '施工类', value:2 },
                      {label: '服务类', value:3 }
                    ]
                  }
                },
                {
                  type: 'dateTimePicker',
                  label: '报价开始日期',
                  placeholder: '请输入开始时间',
                  prop: 'quoteEndDateStart',
                  extendParam: {
                    editable: false,
                    format: 'yyyy-mm-dd hh:mm:ss'
                  }
                },
                {
                  type: 'dateTimePicker',
                  label: '报价结束日期',
                  placeholder: '请输入结束时间',
                  prop: 'quoteEndDateEnd',
                  extendParam: {
                    editable: false,
                    format: 'yyyy-mm-dd hh:mm:ss'
                  }
                },
                {
                  type: 'dateTimePicker',
                  label: '发布开始日期',
                  placeholder: '请输入开始时间',
                  prop: 'publishTimeStart',
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
                  prop: 'publishTimeEnd',
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
      table() {
        return {
          url: this.appConfig.api('inquiry/quote/qryIqrQuoteList'),
          pageNo: 1,
          height: 400,
          queryParam: (param)=>{
            console.log('queryParam:', param)
            console.log('this.activeName',this.activeName)
            return _.assign({status: this.activeName === 'offering' ? 0 : 1}, param);
          },
          responseHandler:(val)=>{
            console.log('responseHandler:', val)
            return val;
          },
          columns: [
            {
              type: 'selection',
              width: 60
            },
            {
              title: '序号',
              type: 'index',
              align: 'center',
              width: 80
            },
            {
              title: '询价单名称',
              key: 'inquiryName',
              align: 'center',
              width: 100,
              render: (h, {row, column}) => {
                return row.planName;
              }
            },
            {
              title: '采购编号',
              key: 'inquiryCode',
              align: 'center',
            },
            {
              title: '发布日期',
              key: 'publishTime',
              align: 'center',
              width: 180,
              render: (h, {row, column}) => {
                return this.moment(row.publishDate).format("YYYY-MM-DD HH:mm:ss");
              }
            },
            {
              title: '报价截止日期',
              key: 'quoteEndDate',
              align: 'center',
              width: 180,
              render: (h, {row, column}) => {
                return this.moment(row.publishDate).format("YYYY-MM-DD HH:mm:ss");
              }
            },
            {
              title: '采购机构',
              key: 'professionalOrgName',
              align: 'center',
            },
            {
              title: '采购类别',
              key: 'purchaseCategoryName'
            },
            {
              title: '状态',
              key: 'status',
              render: (h, {row, column}) => {
                return this.activeName==='offering'?'待报价':'已报价'
              }
            },
          ]
        }
      },
    },
    watch: {
      //监听tabs切换
      activeName: function (newVal, oldVal) {
        this.$refs.form.forms[0].resetFields();
        this.$nextTick(this.search)
      }
    },
    methods: {
      //搜索
      search() {
        this.$refs.table.query();
      },
      //重置
      reset() {
        //因为detail组件可以包含多个表单,所以返回的的是表单数组forms
        this.$refs.form.forms[0].resetFields();
        this.search();
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
      //发起澄清
      createClarify() {
        //this.$router.push({name: 'clarifyOfferEdit'})
      },
      //撤回
      reject() {

      },
      //导出
      exportDoc() {
        window.open('', '_blank')
      },
      cellClickHandler(row) {
        console.log(row);
        console.log(this.activeName);
        this.$router.push({name: 'priceOfferEdit',param:{type:row.purchaseCategory,id:row.quotationId}});
      }
    },
  }
</script>

<style scoped>

</style>

