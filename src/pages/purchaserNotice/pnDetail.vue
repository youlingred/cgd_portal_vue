<template>
  <div>
    <detail v-bind="detailData"/>
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
    components:{
      detail,
      CgTable,
      buttonsOperator
    },
    data () {
      return {
        form:{},
        //列表数据
        table: {
          data: [],
          height: 400,
          columns: [],
          url: '',
          pageNo: 1,
        }
      };
    },
    computed:{
      detailData(){
        return {
          contents:[
            {
              data:this.form,
              header:'基本信息',
              labelWidth:'150px',
              inputWidth:'400px',
              children:[
                {
                  type:'label',
                  label:'采购单编号',
                  prop:'1'
                },
                {
                  type:'label',
                  label:'采购单名称',
                  prop:'2'
                },
                {
                  type:'label',
                  label:'配送中心',
                  prop:'6',
                },
                {
                  type:'label',
                  label:'配送中心-联系人',
                  prop:'7'
                },
                {
                  type:'label',
                  label:'配送中心-联系方式',
                  prop:'8'
                },
                {
                  type:'label',
                  label:'交货日期',
                  prop:'18',
                  formatter(value){
                    return this.moment(value).format("YYYY-MM-DD HH:mm:ss")
                  }
                },
                {
                  type:'label',
                  label:'报价截止日期',
                  prop:'18',
                  formatter(value){
                    return this.moment(value).format("YYYY-MM-DD HH:mm:ss")
                  }
                },
                {
                  type:'label',
                  label:'报价方式',
                  prop:'10'
                },
                {
                  type:'label',
                  label:'质保期（月）',
                  prop:'9'
                },
                {
                  type:'label',
                  label:'支付方式',
                  prop:'10'
                },
                {
                  type:'label',
                  label:'币种',
                  prop:'11'
                },
                {
                  type:'label',
                  label:'付款方式',
                  prop:'12'
                },
                {
                  type:'label',
                  label:'税率（%）',
                  prop:'13',
                },
                {
                  type:'label',
                  label:'成交服务费率',
                  prop:'13',
                },
                {
                  type:'label',
                  label:'物流配送方式',
                  prop:'14'
                },
                {
                  type:'label',
                  label:'采购类型',
                  prop:'15'
                },
                {
                  type:'label',
                  label:'供应商分类',
                  prop:'16'
                },

                {
                  type:'label',
                  label:'备注',
                  prop:'21'
                },
              ]
            }
          ]
        }
      }
    },
    methods:{
      backFunc () {
        this.$router.push({name:'purchaserNoticeIndex'});
      },
      initForm() {
        //基本信息
        this.axios.post(this.appConfig.api('testcommen'),{})
          .then((response) => {
            this.form=response;
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      initTable() {
        let {type,id}=this.$route.params;
        if(type==1){//物资类详情
          this.table.url = this.appConfig.api('Materials')//?type='+type+'&id='+id);
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
              label: '物资编码',
              prop: '3',
            },
            {
              label: '物资类别',
              prop: '2'
            },
            {
              label: '型号',
              prop: '6',
              width: 180,
            },
            {
              label: '规格',
              prop: '7'
            },
            {
              label: '采购数量',
              prop: '12',
            },
            {
              label: '计量单位',
              prop: '13',
              width: 120,
            },
            {
              label: '要求到货日期',
              prop: '5',
              width: 180,
              formatter: (row, column, value) => {
                return this.moment(value).format("YYYY-MM-DD HH:mm:ss");
              }
            }
          ];
        }else if(type==2){//施工类详情
          this.table.url = this.appConfig.api('construction')//?type='+type+'&id='+id);
          this.table.columns = [
            {
              fixed: 'left',
              label: '序号',
              type: 'index',
              width: 80
            },
            {
              label: '项目单位',
              prop: '1'
            },
            {
              label: '项目名称',
              prop: '2'
            },
            {
              label: '内容描述',
              prop: '3',
            },
            {
              label: '计量单位',
              prop: '4',
            },
            {
              label: '数量',
              prop: '5',
            },
            {
              label: '要求到货日期',
              prop: '5',
              width: 180,
              formatter: (row, column, value) => {
                return this.moment(value).format("YYYY-MM-DD HH:mm:ss");
              }
            }
          ];
        }else if(type==3){//服务类详情
          this.table.url = this.appConfig.api('serviceclass')//?type='+type+'&id='+id);
          this.table.columns = [
            {
              fixed: 'left',
              label: '序号',
              type: 'index',
              width: 80
            },
            {
              label: '项目单位',
              prop: '1'
            },
            {
              label: '项目名称',
              prop: '2'
            },
            {
              label: '内容描述',
              prop: '3',
            },
            {
              label: '计量单位',
              prop: '4',
            },
            {
              label: '数量',
              prop: '5',
            },
            {
              label: '要求到货日期',
              prop: '5',
              width: 180,
              formatter: (row, column, value) => {
                return this.moment(value).format("YYYY-MM-DD HH:mm:ss");
              }
            }
          ];
        }
        this.$refs.table.query({url:this.table.url});
      },

    },
    mounted () {
      this.initForm();
      this.initTable();
    }

  };
</script>

<style scoped>
  .footerdiv {
    height: 45px;
    line-height:42px;
    margin:10px 0 30px 0;
    text-align: center;
    border-top: 3px solid #acacac;
    background-color: #e5e5e5;
  }
</style>
