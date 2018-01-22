<template>
  <div>
    <detail v-bind="detailData"></detail>
    <div class="tl" style="padding: 10px 20px">明细信息</div>
    <cg-table ref="test" v-bind="$data.table"></cg-table>
    <buttons-operator type="bottom"
                      fix="true"
                      :buttons="[{label:'返回',type:'info',click:backFunc}]"/>

  </div>
</template>

<script type="text/ecmascript-6">
  import detail from '@/components/Detail.vue'
  import CgTable from '@/components/CgTable.vue'
  import buttonsOperator from '@/components/ButtonsOperator.vue'

  export default {
    data () {
      return {
        data1:{},
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
              data:this.data1,
              header:'基本信息',
              labelWidth:'150px',
              inputWidth:'400px',
              children:[
                {
                  type:'label',
                  label:'成交通知书编号',
                  prop:'1'
                },
                {
                  type:'label',
                  label:'成交通知书名称',
                  prop:'2'
                },
                {
                  type:'label',
                  label:'供应商',
                  prop:'3'
                },
                {
                  type:'label',
                  label:'供应商联系人',
                  prop:'4'
                },
                {
                  type:'label',
                  label:'供应商联系电话',
                  prop:'5'
                },
                {
                  type:'label',
                  label:'配送中心',
                  prop:'6',
                },
                {
                  type:'label',
                  label:'配送中心联系人',
                  prop:'7'
                },
                {
                  type:'label',
                  label:'配送中心联系方式',
                  prop:'8'
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
                  label:'是否生成合同',
                  prop:'14'
                },
                {
                  type:'label',
                  label:'是否配送',
                  prop:'15'
                },
                {
                  type:'label',
                  label:'订单类型',
                  prop:'16'
                },
                {
                  type:'label',
                  label:'采购订单金额',
                  prop:'17'
                },
                {
                  type:'label',
                  label:'制单时间',
                  prop:'18',
                  formatter(value){
                    if(!!value) {
                      return this.moment(value).format("YY-MM-DD HH:mm:ss")
                    }else{
                     return;
                    }
                  }
                },
                {
                  type:'label',
                  label:'制单人',
                  prop:'19'
                },
                {
                  type:'label',
                  label:'合同签订单位',
                  prop:'20'
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
    created () {
      this._initdata();
    },
    methods:{
      backFunc () {
        this.$router.push({name:'dealnoticeprocurement'});
      },
      _initdata() {
        //基本信息
        this.axios.post(this.appConfig.api('testcommen'),{})
          .then((response) => {
            this.data1=response.data.data;
            this.$nextTick(() => {
              this._initTable();
            })
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      _initTable() {
        if(this.$route.params.id==='1'){//物资类详情
          this.$refs.test.m_url = this.appConfig.api('Materials');
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
              label: '物资类别',
              prop: '2'
            },
            {
              label: '物料编码',
              prop: '3',
            },
            {
              label: '物料名称',
              prop: '4',
            },
            {
              label: '承诺交货日期',
              prop: '5',
              formatter: (row, column, value) => {
                if(!!value){
                  return this.moment(value).format("YY-MM-DD HH:mm:ss");
                }else{
                  return;
                }
              }
            },
            {
              label: '型号',
              prop: '6'
            },
            {
              label: '规格',
              prop: '7'
            },
            {
              label: '图号',
              prop: '8',
            },
            {
              label: '材质',
              prop: '9',
            },
            {
              label: '推荐品牌',
              prop: '10'
            },
            {
              label: '生产厂家',
              prop: '11'
            },
            {
              label: '采购数量',
              prop: '12',
            },
            {
              label: '计量单位',
              prop: '13',
            },
            {
              label: '预算单价（元）',
              prop: '14'
            },
            {
              label: '询价总价（元）',
              prop: '15'
            },
            {
              label: '采购总价（元）',
              prop: '16',
            },
            {
              label: '要求到货日期',
              prop: '17',
            },
            {
              label: '项目单位联系人',
              prop: '18'
            },
            {
              label: '项目单位联系电话',
              prop: '19'
            },
            {
              label: '项目单位联系地址',
              prop: '20',
            },
            {
              label: '业务流程状态',
              prop: '21',
            },
            {
              label: '节点状态',
              prop: '22',
            }
          ];
        }else if(this.$route.params.id==='2'){//施工类详情
          this.$refs.test.m_url = this.appConfig.api('construction');
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
              label: '需求数量（预估）',
              prop: '5',
            },
            {
              label: '预算单价（元）',
              prop: '6'
            },
            {
              label: '询价单价（元）',
              prop: '7'
            },
            {
              label: '采购总价（元）',
              prop: '8',
            },
            {
              label: '项目完成日期',
              prop: '9',
            },
            {
              label: '项目单位联系人',
              prop: '10'
            },
            {
              label: '项目单位联系电话',
              prop: '11'
            },
            {
              label: '项目单位联系地址',
              prop: '12',
            },
            {
              label: '业务流程状态',
              prop: '13',
            },
            {
              label: '节点状态',
              prop: '14'
            }
          ];
        }else if(this.$route.params.id==='3'){//服务类详情
          this.$refs.test.m_url = this.appConfig.api('serviceclass');
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
              label: '需求数量（预估）',
              prop: '5',
            },
            {
              label: '预算单价（元）',
              prop: '6'
            },
            {
              label: '询价单价（元）',
              prop: '7'
            },
            {
              label: '采购总价（元）',
              prop: '8',
            },
            {
              label: '项目完成日期',
              prop: '9',
            },
            {
              label: '项目单位联系人',
              prop: '10'
            },
            {
              label: '项目单位联系电话',
              prop: '11'
            },
            {
              label: '项目单位联系地址',
              prop: '12',
            },
            {
              label: '业务流程状态',
              prop: '13',
            },
            {
              label: '节点状态',
              prop: '14'
            }
          ];
        }
        this.$refs.test.query();
      },

    },
    components:{
      detail,
      CgTable,
      buttonsOperator
    },

  };
</script>

<style lang="css" rel="stylesheet/css">
  .footerdiv {
    height: 45px;
    line-height:42px;
    margin:10px 0 30px 0;
    text-align: center;
    border-top: 3px solid #acacac;
    background-color: #e5e5e5;
  }
</style>
