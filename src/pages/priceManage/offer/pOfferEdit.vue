<template>
  <div>
    <detail v-bind="detailData"></detail>
    <IvTable ref="table" v-bind="table"/>
    <buttons-operator type="bottom"
                      fix="true"
                      :buttons="[{label:'提交',type:'primary',click:sumbit},{label:'发起澄清',type:'primary',click:fire},{label:'返回',type:'info',click:back}]"/>


  </div>
</template>

<script>
  import detail from '@/components/Detail.vue'
  import buttonsOperator from '@/components/ButtonsOperator.vue'
  import IvTable from '@/components/IvTable.vue'

  export default {
    name: "clarify-review-edit",
    components: {
      IvTable,
      detail,
      buttonsOperator
    },
    data() {
      return {
        form: {
          planName: '团建',
          publishUser: '老铁',
          publishDate: 1514192693000,
          objectionDate: 1514192693000,
          clarifyContent: '哈哈哈哈哈',
          status: '',
          prop4: '艳照门',
          fileList:[{name:'文件测试',path:'test'},{name:'文件测试',path:'test'}],
        },
        options: [],
        table:{
          header:'明细信息'
        }
      };
    },
    computed: {
      detailData() {
        return {
          contents: [
            {
              header:'基本信息',
              data: this.form,
              labelWidth: '200px',
              inputWidth: '400px',
              children: [
                {
                  type: 'label',
                  label: '采购编号',
                  prop: 'inquiryCode',
                },
                {
                  type: 'label',
                  label: '询价单名称',
                  prop: 'inquiryName',
                },
                {
                  type: 'label',
                  label: '供应商',
                  prop: 'supplierName',
                },
                {
                  type: 'input',
                  label: '供应商联系人',
                  placeholder: '请输入',
                  prop: 'supplierContactName',
                },
                {
                  type: 'input',
                  label: '供应商联系电话',
                  placeholder: '请输入',
                  prop: 'supplierContactTele',
                },
                {
                  type: 'label',
                  label: '配送中心',
                  prop: 'professionalOrgName',
                },
                {
                  type: 'label',
                  label: '配送中心-联系人',
                  prop: 'purchaserName',
                },
                {
                  type: 'label',
                  label: '配送中心-联系方式',
                  prop: 'purchaserTele',
                },
                {
                  type: 'label',
                  label: '交货日期',
                  prop: 'deliveryDate',
                  formatter: (value) => {
                    return this.moment(value).format('YYYY-MM-DD HH:mm:ss');
                  }
                },
                {
                  type: 'label',
                  label: '报价截止日期',
                  prop: 'quoteEndDate',
                  formatter: (value) => {
                    return this.moment(value).format('YYYY-MM-DD HH:mm:ss');
                  }
                },
                {
                  type: 'label',
                  label: '报价方式',
                  prop: 'quoteMethod',
                },
                {
                  type: 'dateTimePicker',
                  label: '承诺交货日期',
                  placeholder: '请选择开始时间',
                  prop: 'deliveryDatePromise',
                  extendParam: {
                    editable: false,
                    format: 'yyyy-mm-dd hh:mm:ss'
                  }
                },
                {
                  type: 'label',
                  label: '质保期（月）',
                  prop: 'guaranteePeriodName',
                },
                {
                  type: 'label',
                  label: '支付方式',
                  prop: 'payTypeName',
                },
                {
                  type: 'label',
                  label: '币种',
                  prop: 'currencyName',
                },
                {
                  type: 'label',
                  label: '付款方式',
                  prop: 'planName',
                  formatter:(value,data) => {
                  let result="";
                  if(data.prePay!=0){
                    result+='预付款:'+data.prePay+'% ';
                  }
                  if(data.matPay!=0){
                    result+='投料款:'+data.matPay+'% ';
                  }
                  if(data.proPay!=0){
                    result+='进度款:'+data.proPay+'% ';
                  }
                  if(data.verPay!=0){
                    result+='到货验收款:'+data.verPay+'% ';
                  }
                  if(data.pilPay!=0){
                    result+='试运验收款:'+data.pilPay+'% ';
                  }
                  if(data.quaPay!=0){
                    result+='质保金:'+data.quaPay+'% ';
                  }
                  return result;
                  }
                },
                {
                  type: 'label',
                  label: '税率（%）',
                  prop: 'taxRate',
                },
                {
                  type: 'label',
                  label: '报价总金额',
                  prop: 'amount',
                  formatter(value){
                    return this.accounting.formatMoney(value,'',2);
                  }
                },
                {
                  type: 'label',
                  label: '成交服务费率',
                  prop: 'serviceChargeRateName',
                },
                {
                  type: 'label',
                  label: '物流配送方式',
                  prop: 'logisticsDistrWayName',
                },
                {
                  type: 'label',
                  label: '采购类型',
                  prop: 'purchaseTypeName',
                },
                {
                  type: 'label',
                  label: '备注',
                  prop: 'remarks',
                },
                {
                  type: 'textarea',
                  label: '报价说明',
                  prop: 'quoteExplain',
                  extendParam: {
                    autosize: {minRows: 2, maxRows: 4}
                  }
                },
                {
                  type: 'file',
                  label: '技术文件',
                  prop: 'attchmentInfo3',
                },
                {
                  type: 'file',
                  label: '商务文件',
                  prop: 'attchmentInfo2',
                },
                {
                  type: 'file',
                  label: '其他附件',
                  prop: 'attchmentInfo4',
                }
              ],
              rules: {
                planName: [
                  {required: true, message: '请选择询价单名称', trigger: 'blur'},
                ],
                clarifyContent: [
                  {required: true, message: '请输入澄清内容', trigger: 'blur'},
                ]
              }
            },
            {
              header:'附件信息（上传文件格式为 txt,doc,xls,docx,xlsx,ppt,pptx,pdf,zip,rar,wps,dps,et,jpg,jpeg，大小不超过60MB)',
              data: this.form,
              labelWidth: '200px',
              inputWidth: '400px',
              children: [
                {
                  type: 'upload',
                  label: '商务文件',
                  prop: 'fileList',
                  extendParam: {
                    action: 'https://jsonplaceholder.typicode.com/posts/',
                  }
                },
                {
                  type: 'upload',
                  label: '技术文件',
                  prop: 'fileList',
                  extendParam: {
                    action: 'https://jsonplaceholder.typicode.com/posts/',
                  }
                },
                {
                  type: 'upload',
                  label: '其他文件',
                  prop: 'fileList',
                  extendParam: {
                    action: 'https://jsonplaceholder.typicode.com/posts/',
                  }
                }
              ],
              rules: {
                planName: [
                  {required: true, message: '请选择询价单名称', trigger: 'blur'},
                ],
                clarifyContent: [
                  {required: true, message: '请输入澄清内容', trigger: 'blur'},
                ]
              }
            },
          ]
        }
      }
    },
    methods: {
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
      //FIXME 提交
      sumbit() {
        console.log(this.form)
        this.axios.post(this.appConfig.api('testDylyList'), this.form)
          .then((response) => {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //发起澄清
      fire(){

      },
      back() {
        this.$router.push({name: 'clarifyOfferIndex'})
      }
    },
    //FIXME 组件创建,初始化数据
    created() {
      this.query();
    }
  }
</script>
<style scoped>

</style>
