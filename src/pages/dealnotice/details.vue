<template>
  <div>
    <detail v-bind="detailData"></detail>
    <div class="tl" style="padding: 10px 20px">明细信息</div>
    <IvTable v-if="typeName==='wuzi'" :key="1" ref="table_wuzi" v-bind="table.wuzi"/>
    <IvTable v-if="typeName==='shigong'" :key="2" ref="table_shigong" v-bind="table.shigong"/>
    <IvTable v-if="typeName==='fuwu'" :key="3" ref="table_fuwu" v-bind="table.fuwu"/>
    <buttons-operator type="bottom"
                      fix="true"
                      :buttons="[{label:'返回',type:'info',click:backFunc}]"/>

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
        typeName: '',

        //table初始化数据
        table: {
          wuzi: {
            url: this.appConfig.api('inquiry/querydealnoticeDetailListBydealnoticeId'),
            pageNo: 1,
            height: 400,
            queryParam: function (param) {
              console.log('queryParam:', param)
              return _.assign({dealNoticeId: this.$route.params.id}, param);
            },
            responseHandler: function (val) {
              console.log('responseHandler:', val)
              return val;
            },
            columns: [
              {
                title: '序号',
                type: 'index',
                align: 'center',
                width: 80
              },
              {
                title: '项目单位',
                key: 'purchaseAccountName',
                align: 'center',
                width: 200
              },
              {
                title: '物资分类',
                key: 'materialClassName',
                align: 'center',
                width: 120
              },
              {
                title: '物料编码',
                key: 'materialId',
                align: 'center',
                width: 120
              },
              {
                title: '物料名称',
                key: 'materialName',
                align: 'center',
                width: 120
              },
              {
                title: '承诺交货日期',
                key: 'deliveryDatePromise',
                width: 180,
                render: (h, {row, column}) => {
                  return h('div',row.deliveryDatePromise===(null||'')?'-':this.moment(row.deliveryDatePromise).format("YYYY-MM-DD HH:mm:ss"));
                }
              },
              {
                title: '型号',
                key: 'model',
                align: 'center',
                width: 120
              },
              {
                title: '规格',
                key: 'spec',
                align: 'center',
                width: 120
              },
              {
                title: '图号',
                key: 'figureNo',
                align: 'center',
                width: 120
              },
              {
                title: '材质',
                key: 'materialsQuality',
                align: 'center',
                width: 120
              },
              {
                title: '推荐品牌',
                key: 'brand',
                align: 'center',
                width: 120
              },
              {
                title: '生产厂家',
                key: 'manufacturer',
                align: 'center',
                width: 120
              },
              {
                title: '采购数量',
                key: 'purchaseNum',
                align: 'center',
                width: 120
              },
              {
                title: '计量单位',
                key: 'unitName',
                align: 'center',
                width: 120
              },
              {
                title: '预算单价（元）',
                key: 'budgetAmount',
                align: 'center',
                width: 120
              },
              {
                title: '询价单价（元）',
                key: 'inquiryAmount',
                align: 'center',
                width: 120
              },
              {
                title: '采购总价（元）',
                key: 'amountDeal',
                align: 'center',
                width: 120
              },
              {
                title: '项目单位联系人',
                key: 'purchaseAccountContactName',
                align: 'center',
                width: 120
              },
              {
                title: '项目单位联系电话',
                key: 'purchaseAccountContactTele',
                align: 'center',
                width: 120
              },
              {
                title: '项目单位联系地址',
                key: 'purchaseAccountContactAddr',
                align: 'center',
                width: 200
              },
              {
                title: '业务流程状态',
                key: 'busiStatus',
                align: 'center',
                width: 120
              },
              {
                title: '状态',
                key: 'nodeStatusName',
                align: 'center',
                width: 120
              }
            ]
          },
          shigong: {
            url: this.appConfig.api('inquiry/querydealnoticeDetailListBydealnoticeId'),
            pageNo: 1,
            height: 400,
            queryParam: function (param) {
              console.log('queryParam:', param)
              return _.assign({dealNoticeId: this.$route.params.id}, param);
            },
            responseHandler: function (val) {
              console.log('responseHandler:', val)
              return val;
            },
            columns: [
              {
                title: '序号',
                type: 'index',
                align: 'center',
                width: 80
              },
              {
                title: '项目单位',
                key: 'purchaseAccountName',
                align: 'center',
                width: 200
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
                width: 120
              },
              {
                title: '需求数量（预估）',
                key: 'purchaseNum',
                align: 'center',
                width: 120
              },
              {
                title: '预算单价（元）',
                key: 'budgetAmount',
                align: 'center',
                width: 120
              },
              {
                title: '询价单价（元）',
                key: 'inquiryAmount',
                align: 'center',
                width: 120
              },
              {
                title: '采购总价（元）',
                key: 'amountDeal',
                align: 'center',
                width: 120
              },
              {
                title: '项目完成日期',
                key: 'deliveryDatePromise',
                width: 180,
                render: (h, {row, column}) => {
                  return h('div',row.deliveryDatePromise===(null||'')?'-':this.moment(row.deliveryDatePromise).format("YYYY-MM-DD HH:mm:ss"));
                }
              },
              {
                title: '项目单位联系人',
                key: 'purchaseAccountContactName',
                align: 'center',
                width: 120
              },
              {
                title: '项目单位联系电话',
                key: 'purchaseAccountContactTele',
                align: 'center',
                width: 120
              },
              {
                title: '项目单位联系地址',
                key: 'purchaseAccountContactAddr',
                align: 'center',
                width: 200
              },
              {
                title: '业务流程状态',
                key: 'busiStatusName',
                align: 'center',
                width: 120
              },
              {
                title: '状态',
                key: 'nodeStatusName',
                align: 'center',
                width: 120
              }
            ],
          },
          fuwu: {
            url: this.appConfig.api('inquiry/querydealnoticeDetailListBydealnoticeId'),
            pageNo: 1,
            height: 400,
            queryParam: function (param) {
              console.log('queryParam:', param)
              return _.assign({dealNoticeId: this.$route.params.id}, param);
            },
            responseHandler: function (val) {
              console.log('responseHandler:', val)
              return val;
            },
            columns: [
              {
                title: '序号',
                type: 'index',
                align: 'center',
                width: 80
              },
              {
                title: '项目单位',
                key: 'purchaseAccountName',
                align: 'center',
                width: 200
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
                width: 120
              },
              {
                title: '需求数量（预估）',
                key: 'purchaseNum',
                align: 'center',
                width: 120
              },
              {
                title: '预算单价（元）',
                key: 'budgetAmount',
                align: 'center',
                width: 120
              },
              {
                title: '询价单价（元）',
                key: 'inquiryAmount',
                align: 'center',
                width: 120
              },
              {
                title: '采购总价（元）',
                key: 'amountDeal',
                align: 'center',
                width: 120
              },
              {
                title: '项目完成日期',
                key: 'deliveryDatePromise',
                width: 180,
                render: (h, {row, column}) => {
                  return h('div',row.deliveryDatePromise===(null||'')?'-':this.moment(row.deliveryDatePromise).format("YYYY-MM-DD HH:mm:ss"));
                }
              },
              {
                title: '项目单位联系人',
                key: 'purchaseAccountContactName',
                align: 'center',
                width: 120
              },
              {
                title: '项目单位联系电话',
                key: 'purchaseAccountContactTele',
                align: 'center',
                width: 120
              },
              {
                title: '项目单位联系地址',
                key: 'purchaseAccountContactAddr',
                align: 'center',
                width: 200
              },
              {
                title: '业务流程状态',
                key: 'busiStatusName',
                align: 'center',
                width: 120
              },
              {
                title: '状态',
                key: 'nodeStatusName',
                align: 'center',
                width: 120
              }
            ]
          }
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
                  label: '成交通知书编号',
                  prop: 'dealNoticeCode'
                },
                {
                  type: 'label',
                  label: '成交通知书名称',
                  prop: 'dealNoticeName'
                },
                {
                  type: 'label',
                  label: '供应商',
                  prop: 'supplierName'
                },
                {
                  type: 'label',
                  label: '供应商联系人',
                  prop: 'supplierContactName'
                },
                {
                  type: 'label',
                  label: '供应商联系电话',
                  prop: 'supplierContactTele'
                },
                {
                  type: 'label',
                  label: '配送中心',
                  prop: 'professionalOrgName',
                },
                {
                  type: 'label',
                  label: '配送中心联系人',
                  prop: 'billCreateUserName'
                },
                {
                  type: 'label',
                  label: '配送中心联系方式',
                  prop: 'userContactTele'
                },
                {
                  type: 'label',
                  label: '质保期（月）',
                  prop: 'guaranteePeriod'
                },
                {
                  type: 'label',
                  label: '支付方式',
                  prop: 'payTypeNames'
                },
                {
                  type: 'label',
                  label: '币种',
                  prop: 'currencyName'
                },
                {
                  type: 'label',
                  label: '付款方式',
                  prop: 'payTypeName'
                },
                {
                  type: 'label',
                  label: '税率（%）',
                  prop: 'taxRate',
                },
                {
                  type: 'label',
                  label: '是否生成合同',
                  prop: 'isContract',
                  formatter(value) {
                    if (value == 1) {
                      return '是';
                    } else {
                      return '否';
                    }
                  }
                },
                {
                  type: 'label',
                  label: '是否配送',
                  prop: 'isDispatch'
                },
                {
                  type: 'label',
                  label: '订单类型',
                  prop: 'orderTypeName'
                },
                {
                  type: 'label',
                  label: '采购订单金额',
                  prop: 'purchaseAmount'
                },
                {
                  type: 'label',
                  label: '制单时间',
                  prop: 'un',
                  formatter(value) {
                    return value===(null||'')?'-':this.moment(value).format("YYYY-MM-DD HH:mm:ss")
                  }
                },
                {
                  type: 'label',
                  label: '制单人',
                  prop: 'billCreateUserName'
                },
                {
                  type: 'label',
                  label: '合同签订单位',
                  prop: 'signUnit'
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
      backFunc() {
        this.$router.push({name: 'dealnoticeprocurement'});
      },
      initForm() {
        //基本信息
        this.axios.post(this.appConfig.api('inquiry/exe/dealnote/querydealnoticedetailinfo'), {dealNoticeId: this.$route.params.id})
          .then((response) => {
            this.form = response;
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      initTable() {
        let {type, id} = this.$route.params;
        if (type == 1) {
          this.typeName = 'wuzi';
        } else if (type == 2) {
          this.typeName = 'shigong';
        } else if (type == 3) {
          this.typeName = 'fuwu';
        }
      }
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
