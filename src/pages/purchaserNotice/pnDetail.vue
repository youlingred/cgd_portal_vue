<template>
  <div>
    <detail v-bind="detailData"/>
    <div class="tl" style="padding: 10px 20px">明细信息</div>
    <IvTable ref="table" v-bind="table"/>
    <buttons-operator type="bottom"
                      fix="true"
                      :buttons="[{label:'我要参与',type:'primary',click:join},{label:'返回',type:'info',click:backFunc}]"/>

  </div>
</template>

<script>
  import detail from '@/components/Detail.vue'
  import IvTable from '@/components/IvTable.vue'
  import buttonsOperator from '@/components/ButtonsOperator.vue'

  export default {
    components: {
      detail,
      IvTable,
      buttonsOperator
    },
    data() {
      return {
        form: {},
        //列表数据
        table: {
          autoLoad: false,
          height: 400,
        }
      };
    },
    computed: {
      detailData() {
        return {
          contents: [
            {
              data: this.form,
              header: '基本信息',
              labelWidth: '150px',
              inputWidth: '400px',
              children: [
                {
                  type: 'label',
                  label: '采购单编号',
                  prop: 'inquiryCode'
                },
                {
                  type: 'label',
                  label: '采购单名称',
                  prop: 'inquiryName'
                },
                {
                  type: 'label',
                  label: '配送中心',
                  prop: 'professionalOrgName',
                },
                {
                  type: 'label',
                  label: '配送中心-联系人',
                  prop: 'purchaserName'
                },
                {
                  type: 'label',
                  label: '配送中心-联系方式',
                  prop: 'purchaserTele'
                },
                {
                  type: 'label',
                  label: '交货日期',
                  prop: 'reqArrivalDate',
                  formatter(value) {
                    return value === (null || '') ? '-' : this.moment(value).format("YYYY-MM-DD HH:mm:ss")
                  }
                },
                {
                  type: 'label',
                  label: '报价截止日期',
                  prop: 'quoteEndDate',
                  formatter(value) {
                    return value === (null || '') ? '-' : this.moment(value).format("YYYY-MM-DD HH:mm:ss")
                  }
                },
                {
                  type: 'label',
                  label: '报价方式',
                  prop: 'quoteMethodName'
                },
                {
                  type: 'label',
                  label: '质保期（月）',
                  prop: 'guaranteePeriod'
                },
                {
                  type: 'label',
                  label: '支付方式',
                  prop: 'payTypeName'
                },
                {
                  type: 'label',
                  label: '币种',
                  prop: 'currencyName'
                },
                {
                  type: 'label',
                  label: '付款方式',
                  prop: '12',
                  formatter: (value, data) => {
                    let result = "";
                    if (data.prePay != 0) {
                      result += '预付款:' + data.prePay + '% ';
                    }
                    if (data.matPay != 0) {
                      result += '投料款:' + data.matPay + '% ';
                    }
                    if (data.proPay != 0) {
                      result += '进度款:' + data.proPay + '% ';
                    }
                    if (data.verPay != 0) {
                      result += '到货验收款:' + data.verPay + '% ';
                    }
                    if (data.pilPay != 0) {
                      result += '试运验收款:' + data.pilPay + '% ';
                    }
                    if (data.quaPay != 0) {
                      result += '质保金:' + data.quaPay + '% ';
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
                  label: '成交服务费率',
                  prop: 'serviceChargeRateName',
                },
                {
                  type: 'label',
                  label: '物流配送方式',
                  prop: 'logisticsDistrWayName'
                },
                {
                  type: 'label',
                  label: '采购类型',
                  prop: 'purchaseTypeName'
                },
                {
                  type: 'label',
                  label: '供应商分类',
                  prop: 'supplierClassNames'
                },

                {
                  type: 'label',
                  label: '备注',
                  prop: 'remarks'
                },
              ]
            }
          ]
        }
      }
    },
    methods: {
      join() {
        this.axios.post(this.appConfig.api('inquiry/quote/addQuotationBill'),
          {
            inquiryId: this.$route.params.id,
            iqrSeq: this.$route.params.seq,
            purchaseCategory: this.$route.params.type
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
              query: {backPage: 'purchaserNoticeIndex'},
              params: {status: 0, type: this.$route.params.type, id: response.quotationId}
            });
          }, 2000)
        }).catch(function (error) {
          console.log(error);
        });
      },
      backFunc() {
        this.$router.push({name: 'purchaserNoticeIndex'});
      },
      initForm() {
        //基本信息
        this.axios.post(this.appConfig.api('inquiry/quote/iqrPurchaseNoticeDetail'), {
          inquiryId: this.$route.params.id,
          iqrSeq: this.$route.params.seq,
          purchaseCategory: this.$route.params.type
        })
          .then((response) => {
            this.form = response;
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      initTable() {
        let {type, id, seq} = this.$route.params;
        if (type == 1) {//物资类详情
          this.table.url = this.appConfig.api('inquiry/quote/iqrPurchaseNoticeDetailMaterail')//?type='+type+'&id='+id);
          this.table.columns = [
            {
              fixed: 'left',
              title: '序号',
              type: 'index',
              align: 'center',
              width: 80,
            },
            {
              title: '项目单位',
              key: 'purchaseAccountName',
              align: 'center',
              width: 180,
            },
            {
              title: '物料名称',
              key: 'materialName',
              align: 'center',
              width: 120,
            },
            {
              title: '物资编码',
              key: 'materialId',
              align: 'center',
              width: 120,
            },
            {
              title: '物资类别',
              key: 'materialClassName',
              align: 'center',
              width: 120,
            },
            {
              title: '型号',
              key: 'model',
              align: 'center',
              width: 180,
            },
            {
              title: '规格',
              key: 'spec',
              align: 'center',
              width: 120,
            },
            {
              title: '采购数量',
              key: 'requireNumber',
              align: 'center',
              width: 120,
            },
            {
              title: '计量单位',
              key: 'unitName',
              align: 'center',
              width: 120,
            },
            {
              title: '要求到货日期',
              key: 'reqArrivalDate',
              align: 'center',
              width: 180,
              render: (h, {row, column}) => {
                return h('div', this.moment(row['5']).format("YYYY-MM-DD HH:mm:ss"));
              }
            }
          ];
        } else if (type == 2) {//施工类详情
          this.table.url = this.appConfig.api('inquiry/quote/iqrPurchaseNoticeDetailConstruction')//?type='+type+'&id='+id);
          this.table.columns = [
            {
              fixed: 'left',
              title: '序号',
              type: 'index',
              align: 'center',
              width: 80
            },
            {
              title: '项目单位',
              key: 'purchaseAccountName',
              align: 'center',
              width: 120
            },
            {
              title: '项目名称',
              key: 'projectName',
              align: 'center',
              width: 120
            },
            {
              title: '内容描述',
              key: 'docDesc',
              align: 'center',
              width: 120
            },
            {
              title: '计量单位',
              key: 'unitName',
              align: 'center',
              width: 80
            },
            {
              title: '数量',
              key: 'requireNumber',
              align: 'center',
              width: 80
            },
            {
              title: '要求到货日期',
              key: 'reqArrivalDate',
              align: 'center',
              width: 180,
              render: (h, {row, column}) => {
                return h('div', this.moment(row['5']).format("YYYY-MM-DD HH:mm:ss"));
              }
            }
          ];
        } else if (type == 3) {//服务类详情
          this.table.url = this.appConfig.api('inquiry/quote/iqrPurchaseNoticeDetailSev')//?type='+type+'&id='+id);
          this.table.columns = [
            {
              fixed: 'left',
              title: '序号',
              type: 'index',
              align: 'center',
              width: 80
            },
            {
              title: '项目单位',
              key: 'purchaseAccountName',
              align: 'center',
              width: 120,
            },
            {
              title: '项目名称',
              key: 'projectName',
              align: 'center',
              width: 120,
            },
            {
              title: '内容描述',
              key: 'docDesc',
              align: 'center',
              width: 120,
            },
            {
              title: '计量单位',
              key: 'unitName',
              align: 'center',
              width: 80,
            },
            {
              title: '数量',
              key: 'requireNumber',
              align: 'center',
              width: 80,
            },
            {
              title: '要求到货日期',
              key: 'reqArrivalDate',
              align: 'center',
              width: 180,
              render: (h, {row, column}) => {
                return h('div', this.moment(row['5']).format("YYYY-MM-DD HH:mm:ss"));
              }
            }
          ];
        }
        this.$refs.table.query({
          url: this.table.url,
          inquiryId: id,
          iqrSeq: seq
        });
      },

    },
    mounted() {
      this.initForm();
      this.initTable();
    }

  };
</script>

<style scoped>
  .footerdiv {
    height: 45px;
    line-height: 42px;
    margin: 10px 0 30px 0;
    text-align: center;
    border-top: 3px solid #acacac;
    background-color: #e5e5e5;
  }
</style>
