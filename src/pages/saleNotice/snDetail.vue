<template>
  <div>
    <detail v-bind="detailData"/>
    <buttons-operator type="top"
                      algin="center"
                      :switchFlag.sync="flag"
                      :buttons="[{type:'switch'}]"/>
    <div class="tl" style="padding: 10px 20px">明细信息</div>
    <cg-table ref="table" v-bind="table"/>
    <buttons-operator type="bottom"
                      fix="true"
                      :buttons="[{label:'返回',type:'info',click:backFunc}]"/>

  </div>
</template>

<script>
  import detail from '@/components/Detail.vue'
  import CgTable from '@/components/CgTable.vue'
  import buttonsOperator from '@/components/ButtonsOperator.vue'

  export default {
    components: {
      detail,
      CgTable,
      buttonsOperator
    },
    data() {
      return {
        flag:false,
        form: {},
        //列表数据
        table: {
          autoLoad:false,
          data: [],
          height: 400,
          columns: [],
          url: '',
          pageNo: 1,
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
                  prop: '1'
                },
                {
                  type: 'label',
                  label: '询价单名称',
                  prop: '2'
                },
                {
                  type: 'label',
                  label: '专业采购机构',
                  prop: '6',
                },
                {
                  type: 'label',
                  label: '项目单位',
                  prop: '7'
                },
                {
                  type: 'label',
                  label: '计划类别',
                  prop: '8'
                },
                {
                  type: 'label',
                  label: '供应商分类',
                  prop: '8'
                },
                {
                  type: '',
                  label: '供应商级别',
                  prop: '8'
                },
                {
                  type: 'label',
                  label: '报价截止时间',
                  prop: '18',
                  formatter(value) {
                    return this.moment(value).format("YYYY-MM-DD HH:mm:ss")
                  }
                },
                {
                  switchFlag: this.flag,
                  type: 'label',
                  label: '提货期要求方式',
                  prop: '10'
                },
                {
                  switchFlag: this.flag,
                  type: 'label',
                  label: '提货日期',
                  prop: '18',
                  formatter(value) {
                    return this.moment(value).format("YYYY-MM-DD HH:mm:ss")
                  }
                },
                {
                  switchFlag: this.flag,
                  type: 'label',
                  label: '周期',
                  prop: '9'
                },
                {
                  switchFlag: this.flag,
                  type: 'label',
                  label: '质保期（月）',
                  prop: '9'
                },
                {
                  switchFlag: this.flag,
                  type: 'label',
                  label: '支付方式',
                  prop: '10'
                },
                {
                  switchFlag: this.flag,
                  type: 'label',
                  label: '付款方式',
                  prop: '12'
                },
                {
                  switchFlag: this.flag,
                  type: 'label',
                  label: '税率（%）',
                  prop: '13',
                },
                {
                  switchFlag: this.flag,
                  type: 'label',
                  label: '币种',
                  prop: '13',
                },
                {
                  switchFlag: this.flag,
                  type: 'label',
                  label: '订单类型',
                  prop: '15'
                },

                {
                  switchFlag: this.flag,
                  type: 'file',
                  label: '附件',
                  prop: 'fileList'
                },
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
        this.axios.post(this.appConfig.api('testcommen'), {})
          .then((response) => {
            this.form = response.data.data;
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      initTable() {
        let id = this.$route.params.id;
        this.table.url = this.appConfig.api('Materials')//?id='+id);
        this.table.columns = [
          {
            fixed: 'left',
            label: '序号',
            type: 'index',
            width: 80
          },
          {
            label: '项目单位',
            prop: '1',
            width: 180
          },
          {
            label: '物料名称',
            prop: '4',
          },
          {
            label: '规格',
            prop: '7'
          },
          {
            label: '型号',
            prop: '6',
            width: 180,
          },
          {
            label: '计划名称',
            prop: '3',
          },
          {
            label: '计划编号',
            prop: '2'
          },
          {
            label: '计量单位',
            prop: '13',
            width: 120,
          },
          {
            label: '需求数量',
            prop: '12',
          },
          {
            label: '预算单价（元）',
            prop: '12',
            width: 150,
          },
          {
            label: '预算金额（元）',
            prop: '12',
            width: 150,
            formatter:(row,column,value)=>{
              console.log(value)
             return this.accounting.formatMoney(value,'￥',2);
            }
          },
          {
            label: '提货日期',
            prop: '5',
            width: 180,
            formatter: (row, column, value) => {
              return this.moment(value).format("YYYY-MM-DD HH:mm:ss");
            }
          },
          {
            label: '周期',
            prop: '12',
          },
          {
            label: '材质',
            prop: '12',
          },
          {
            label: '物资联系人',
            prop: '12',
            width: 150,
          },
          {
            label: '固定电话',
            prop: '12',
          },
        ];
        this.$refs.table.query({url: this.table.url});
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
