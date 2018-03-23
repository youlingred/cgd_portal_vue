<template>
  <div>
    <detail v-bind="detailData"/>
    <buttons-operator type="top"
                      algin="center"
                      :switchFlag.sync="flag"
                      :buttons="[{type:'switch',openLabel:'查看全部'}]"/>
    <div class="tl" style="padding: 10px 20px">明细信息</div>
    <IvTable ref="table" v-bind="table"/>
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
        flag:false,
        form: {},
        //列表数据
        table: {
          autoLoad:false,
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
                  label: '询价单编号',
                  prop: 'inquiryCode'
                },
                {
                  type: 'label',
                  label: '询价单名称',
                  prop: 'inquiryName'
                },
                {
                  type: 'label',
                  label: '专业采购机构',
                  prop: 'professionalOrgName',
                },
                {
                  type: 'label',
                  label: '项目单位',
                  prop: 'purchaseAccountsNameJson'
                },
                {
                  type: 'label',
                  label: '计划类别',
                  prop: 'planCategoryName'
                },
                {
                  type: 'label',
                  label: '供应商分类',
                  prop: 'supplierClassNames'
                },
                {
                  type: '',
                  label: '供应商级别',
                  prop: 'supplierLevel	'
                },
                {
                  type: 'label',
                  label: '报价截止时间',
                  prop: 'quoteEndDate',
                  formatter(value) {
                    return this.moment(value).format("YYYY-MM-DD HH:mm:ss")
                  }
                },
                {
                  switchFlag: this.flag,
                  type: 'label',
                  label: '提货期要求方式',
                  prop: 'deliveryDateMethod'
                },
                {
                  switchFlag: this.flag,
                  type: 'label',
                  label: '提货日期',
                  prop: 'reqArrivalDate',
                  formatter(value) {
                    return this.moment(value).format("YYYY-MM-DD HH:mm:ss")
                  }
                },
                {
                  switchFlag: this.flag,
                  type: 'label',
                  label: '周期',
                  prop: 'reqArrivalPeriod'
                },
                {
                  switchFlag: this.flag,
                  type: 'label',
                  label: '质保期（月）',
                  prop: 'guaranteePeriod'
                },
                {
                  switchFlag: this.flag,
                  type: 'label',
                  label: '支付方式',
                  prop: 'payTypeName'
                },
                {
                  switchFlag: this.flag,
                  type: 'label',
                  label: '付款方式',
                  prop: '12',
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
                  switchFlag: this.flag,
                  type: 'label',
                  label: '税率（%）',
                  prop: 'taxRate',
                },
                {
                  switchFlag: this.flag,
                  type: 'label',
                  label: '币种',
                  prop: 'currencyName',
                },
                {
                  switchFlag: this.flag,
                  type: 'label',
                  label: '订单类型',
                  prop: 'orderTypeName'
                },
                {
                  switchFlag: this.flag,
                  type: 'file',
                  label: '审查纪要',
                  prop: 'attchmentInfo1'
                },
				{
                  switchFlag: this.flag,
                  type: 'file',
                  label: '商务文件',
                  prop: 'attchmentInfo2'
                },
				{
                  switchFlag: this.flag,
                  type: 'file',
                  label: '技术文件',
                  prop: 'attchmentInfo3'
                },
				{
                  switchFlag: this.flag,
                  type: 'file',
                  label: '附件',
                  prop: 'attchmentInfo4'
                }
              ]
            }
          ]
        }
      }
    },
    methods: {
      backFunc() {
        this.$router.push({name: 'saleNoticeIndex'});
      },
      initForm() {
        //基本信息
        this.axios.post(this.appConfig.api('inquiry/quote/iqrPurchaseNoticeDetail'), {
		      inquiryId: this.$route.params.id,
          iqrSeq: this.$route.params.seq,
          purchaseCategory: this.$route.params.type
        })
          .then((response) => {
            this.form = this.util.dataAdapter(response,['attachmentName','attachmentUrl'],['name','url'])
          })
      },
      initTable() {
        let id = this.$route.params.id;
		let seq = this.$route.params.seq;
		this.table.columns = [
          {
            fixed: 'left',
            title: '序号',
            type: 'index',
            width: 80
          },
          {
            title: '项目单位',
            key: 'purchaseAccountName',
            width: 180
          },
          {
            title: '物料名称',
            key: 'materialClassName',
          },
          {
            title: '规格',
            key: 'spec',
			 width: 200,
          },
          {
            title: '型号',
            key: 'model',
            width: 200,
          },
          {
            title: '计划名称',
			 width: 200,
            key: '3',
          },
          {
            title: '计划编号',
			 width: 200,
            key: '2'
          },
          {
            title: '计量单位',
            key: 'unitName',
            width: 120,
          },
          {
            title: '需求数量',
			 width: 200,
            key: 'requireNumber',
          },
          {
            title: '预算单价（元）',
            key: 'budgetPrice',
            width: 150,
          },
          {
            title: '预算金额（元）',
            key: 'budgetAmount',
            width: 150,
            render: (h, { row, column }) => {
             return h('div',this.accounting.formatMoney(row['12'],'￥',2));
            }
          },
          {
            title: '提货日期',
            key: 'reqArrivalDate',
            width: 180,
            render: (h, { row, column }) => {
              return h('div',this.moment(row['5']).format("YYYY-MM-DD HH:mm:ss"));
            }
          },
          {
            title: '周期',
            key: 'reqArrivalTimeInt',
          },
          {
            title: '材质',
			 width: 200,
            key: 'materialsQuality',
          },
          {
            title: '物资联系人',
            key: 'materialContactName',
            width: 150,
          },
          {
            title: '固定电话',
			 width: 200,
            key: 'materialContactTele',
          },
        ];
        this.$refs.table.query({
		url: this.appConfig.api('inquiry/quote/iqrPurchaseNoticeDetailMaterail'),
		inquiryId:id,
		iqrSeq:seq
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
