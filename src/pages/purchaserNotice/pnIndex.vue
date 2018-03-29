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
  import {MessageBox} from 'element-ui'

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
        selections: [],
        cgjg_options: [],
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
          url: this.appConfig.api('inquiry/quote/qryIqrPurchaseNoticeList'),
          pageNo: 1,
          // height: 400,
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
              align: 'center',
              width: 60
            },
            {
              title: '序号',
              type: 'index',
              align: 'center',
              width: 80
            },
            {
              title: '采购单名称',
              key: 'inquiryName',
              align: 'center',
              width: 150,
              render: (h, {row, column}) => {
                return h('a', {
                    on: {
                      click: () => {
                        this.gotoDetail(row)
                      }
                    }
                  },
                  row.inquiryName,
                );
              }
            },
            {
              title: '采购单编号',
              key: 'inquiryCode',
              align: 'center',
              width: 200,
            },
            {
              title: '要求到货日期/要求完工日期',
              key: 'reqArrivalDate',
              align: 'center',
              width: 200,
              render: (h, {row, column}) => {
                return h('div',
                  row.reqArrivalDate === (null || '') ? '-' : this.moment(row.reqArrivalDate).format("YYYY-MM-DD HH:mm:ss")
                );
              }
            },
            {
              title: '发布日期',
              key: 'publishTime',
              align: 'center',
              width: 180,
              render: (h, {row, column}) => {
                return h('div', row.publishTime === (null || '') ? '-' : this.moment(row.publishTime).format("YYYY-MM-DD HH:mm:ss"));
              }
            },
            {
              title: '报价截止日期',
              key: 'quoteEndDate',
              align: 'center',
              width: 180,
              render: (h, {row, column}) => {
                return h('div', row.quoteEndDate === (null || '') ? '-' : this.moment(row.quoteEndDate).format("YYYY-MM-DD HH:mm:ss"));
              }
            },
            {
              title: '采购机构',
              key: 'professionalOrgName',
              align: 'center',
              width: 180
            },
            {
              title: '采购类别',
              key: 'purchaseCategoryName',
              align: 'center',
              width: 180
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
                  label: '采购单名称',
                  placeholder: '请输入采购单名称',
                  prop: 'inquiryName',
                  render: (h, {row, column}) => {
                    return h('a', {
                        on: {
                          click: () => {
                            this.gotoDetail(row)
                          }
                        }
                      },
                      row.inquiryName,
                    );
                  }
                },
                {
                  type: 'input',
                  label: '采购单编号',
                  placeholder: '请输入采购单编号',
                  prop: 'inquiryCode',
                },
                {
                  type: 'select',
                  label: '采购机构',
                  placeholder: '请选择',
                  prop: 'professionalOrgId',
                  extendParam: {
                    filterable: true,
                    remote: true,
                    remoteMethod: this.query,
                    options: this.cgjg_options
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
                    valueFormat: 'yyyy-MM-dd HH:mm:ss',
                    format: 'yyyy-MM-dd HH:mm:ss',
                  }
                },
                {
                  type: 'dateTimePicker',
                  label: '报价结束日期',
                  placeholder: '请输入结束时间',
                  prop: 'quoteEndDateEnd',
                  extendParam: {
                    editable: false,
                    valueFormat: 'yyyy-MM-dd HH:mm:ss',
                    format: 'yyyy-MM-dd HH:mm:ss'
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
                    valueFormat: 'yyyy-MM-dd HH:mm:ss',
                    format: 'yyyy-MM-dd HH:mm:ss'
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
                    valueFormat: 'yyyy-MM-dd HH:mm:ss',
                    format: 'yyyy-MM-dd HH:mm:ss'
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
      selectionChange(val) {
        this.selections = val;
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
        if (this.selections.length === 0) {
          this.$alert(this.util.lang.alertSelectionNeed, '提示');
          return;
        }
        ;
        if (this.selections.length > 1) {
          this.$alert(this.util.lang.alertSelectionOnlyOne, '提示');
          return;
        }
        ;
        this.axios.post(this.appConfig.api('inquiry/quote/addQuotationBill'),
          {
            inquiryId: this.selections[0].inquiryId,
            iqrSeq: this.selections[0].iqrSeq,
            purchaseCategory: this.selections[0].purchaseCategory
          }).then((response) => {
          MessageBox.alert(`国电国际经贸有限公司:<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp我公司(<strong><font color="#F56C6C">${response.supplierName}</font></strong>)对贵公司询价单（编号：<strong><font color="#F56C6C">${response.inquiryCode}</font></strong>）中技术、商务要求的内容已经详细阅读并充分理解，保证所供货物、设备在质量，规格型号等方面满足询价单各项要求，并能够按照该报价执行合同。<br><p style="text-align: right">${this.moment().format("YYYY年MM月DD日")}`, '', {
            showConfirmButton: false,
            showClose: false,
            dangerouslyUseHTMLString: true,
          });
          setTimeout(() => {
            MessageBox.close();
            this.$router.push({
              name: 'priceOfferDetail',
              query: {backPage: 'purchaserNoticeIndex',sumbitPage:'priceOfferIndex'},
              params: {status: 0, type: this.selections[0].purchaseCategory, id: response.quotationId}
            });
          }, 10000)
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
        this.$router.push({
          name: 'purchaserNoticeDetail',
          params: {type: row.purchaseCategory, id: row.inquiryId, seq: row.iqrSeq}
        });
      }
    },
    mounted() {
      this.axios.post(this.appConfig.api('testQuerySelect'), {})
        .then((response) => {
          this.cgjg_options = this.util.dataAdapter(response, ['attachmentName', 'attachmentUrl'], ['name', 'url'])
        })
    }
  }
</script>

<style scoped>

</style>

