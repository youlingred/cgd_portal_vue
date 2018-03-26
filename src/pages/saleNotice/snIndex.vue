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
    <IvTable ref="table" v-bind="table" @selectionChange="selectionChange"/>
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
        options: [],
        //搜索条件表单数据
        form: {
          inquiryName: '',
          inquiryCode: '',
          professionalOrgId: '',
          purchaseCategory: '',
          quoteEndDateStart: '',
          quoteEndDateEnd: '',
          publishTimeStart: '',
          publishTimeEnd: ''
        },
        table: {
          url: this.appConfig.api('inquiry/quote/qryIqrSaleNoticeList'),
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
              width: 60,
            },
            {
              title: '序号',
              type: 'index',
              width: 60
            },
            {
              title: '询价单名称',
              key: 'inquiryName',
              width: 150,
              render: (h, {row, column}) => {
                return h('a',{
                    on: {
                      click: ()=>{
                        this.gotoDetail(row)
                      }
                    }
                  },
                  row.inquiryName,
                );
              }
            },
            {
              title: '销售编号',
              key: 'inquiryCode',
              width: 150,
            },
            {
              title: '要求到货日期',
              key: 'reqArrivalDate',
              width: 180,
              render: (h, {row, column}) => {
                return h('div',this.moment(row.reqArrivalDate).format("YYYY-MM-DD HH:mm:ss"));
              }
            },
            {
              title: '发布日期',
              key: 'publishTime',
              width: 180,
              render: (h, {row, column}) => {
                return h('div',this.moment(row.publishTime).format("YYYY-MM-DD HH:mm:ss"));
              }
            },
            {
              title: '报价截止日期',
              key: 'quoteEndDate',
              width: 180,
              render: (h, {row, column}) => {
                return h('div',this.moment(row.quoteEndDate).format("YYYY-MM-DD HH:mm:ss"));
              }
            },
            {
              title: '采购机构',
              key: 'professionalOrgName',
              width: 180,
            },
            {
              title: '采购类别',
              key: 'purchaseCategoryName',
              width: 180
            },
            {
              title: '采购员',
              key: 'purchaserName',
              width: 180,
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
                  prop: 'inquiryName',
                },
                {
                  type: 'input',
                  label: '销售单编号',
                  placeholder: '请输入采购单编号',
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
                      {label: '物资类', value: 1},
                      {label: '施工类', value: 2},
                      {label: '服务类', value: 3}
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
                    format: 'yyyy-MM-dd hh:mm:ss'
                  }
                },
                {
                  type: 'dateTimePicker',
                  label: '报价结束日期',
                  placeholder: '请输入结束时间',
                  prop: 'quoteEndDateEnd',
                  extendParam: {
                    editable: false,
                    format: 'yyyy-MM-dd hh:mm:ss'
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
                    format: 'yyyy-MM-dd hh:mm:ss'
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
                    format: 'yyyy-MM-dd hh:mm:ss'
                  }
                },
              ]
            }
          ]
        }
      },
    },
    watch: {
      //监听tabs切换
      activeName: function () {
        this.search();
      }
    },
    methods: {
      selectionChange(val){
        this.selections=val;
      },
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
      //参与
      join() {
        if(this.selections.length===0){
          this.$alert(this.util.lang.alertSelectionNeed,'提示');
          return;
        };
        if(this.selections.length>1){
          this.$alert(this.util.lang.alertSelectionOnlyOne,'提示');
          return;
        };
        this.axios.post(this.appConfig.api('inquiry/quote/addQuotationBill'),
        {
          inquiryId:this.selections[0].inquiryId,
          iqrSeq:this.selections[0].iqrSeq,
          purchaseCategory:this.selections[0].purchaseCategory
        }).then((response) => {
              console.log(response);
                this.$router.push({name: 'priceOfferDetail',params:{status:0,type:this.selections[0].purchaseCategory,id:response.quotationId}});
            })
            .catch(function (error) {
              console.log(error);
            });
      },
      //导出
      exports() {

      },
      gotoDetail(row) {
        console.log(row);
        this.$router.push({name: 'saleNoticeDetail', params: {type: row.purchaseCategory,id: row.inquiryId, seq: row.iqrSeq}});
      }
    },
  }
</script>

<style scoped>

</style>

