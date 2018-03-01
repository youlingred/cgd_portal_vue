<template>
  <div>
    <detail v-bind="detailData"></detail>
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
    components:{
      detail,
      IvTable,
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
                    return this.moment(value).format("YYYY-MM-DD HH:mm:ss")
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
    methods:{
      backFunc () {
        this.$router.push({name:'dealnoticeprocurement'});
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
              title: '序号',
              type: 'index',
              algin:'center',
              width: 80
            },
            {
              title: '项目单位',
              key: '1',
              width: 180
            },
            {
              title: '物资类别',
              key: '2'
            },
            {
              title: '物料编码',
              key: '3',
            },
            {
              title: '物料名称',
              key: '4',
            },
            {
              title: '承诺交货日期',
              key: '5',
              width: 180,
              render: (h, { row, column }) => {
                return this.moment(row['5']).format("YYYY-MM-DD HH:mm:ss");
              }
            },
            {
              title: '型号',
              key: '6',
              width: 180,
            },
            {
              title: '规格',
              key: '7'
            },
            {
              title: '图号',
              key: '8',
            },
            {
              title: '材质',
              key: '9',
            },
            {
              title: '推荐品牌',
              key: '10'
            },
            {
              title: '生产厂家',
              key: '11'
            },
            {
              title: '采购数量',
              key: '12',
            },
            {
              title: '计量单位',
              key: '13',
              width: 120,
            },
            {
              title: '预算单价（元）',
              key: '14',
              width: 120,
            },
            {
              title: '询价总价（元）',
              key: '15',
              width: 120,
            },
            {
              title: '采购总价（元）',
              key: '16',
              width: 120,
            },
            {
              title: '要求到货日期',
              key: '17',
              width: 120,
            },
            {
              title: '项目单位联系人',
              key: '18',
              width: 120,
            },
            {
              title: '项目单位联系电话',
              key: '19',
              width: 180,
            },
            {
              title: '项目单位联系地址',
              key: '20',
              width: 180,
            },
            {
              title: '业务流程状态',
              key: '21',
              width: 120,
            },
            {
              title: '节点状态',
              key: '22',
            }
          ];
        }else if(type==2){//施工类详情
          this.table.url = this.appConfig.api('construction')//?type='+type+'&id='+id);
          this.table.columns = [
            {
              fixed: 'left',
              title: '序号',
              type: 'index',
              width: 80
            },
            {
              title: '项目单位',
              key: '1'
            },
            {
              title: '项目名称',
              key: '2'
            },
            {
              title: '内容描述',
              key: '3',
            },
            {
              title: '计量单位',
              key: '4',
            },
            {
              title: '需求数量（预估）',
              key: '5',
            },
            {
              title: '预算单价（元）',
              key: '6'
            },
            {
              title: '询价单价（元）',
              key: '7'
            },
            {
              title: '采购总价（元）',
              key: '8',
            },
            {
              title: '项目完成日期',
              key: '9',
            },
            {
              title: '项目单位联系人',
              key: '10'
            },
            {
              title: '项目单位联系电话',
              key: '11'
            },
            {
              title: '项目单位联系地址',
              key: '12',
            },
            {
              title: '业务流程状态',
              key: '13',
            },
            {
              title: '节点状态',
              key: '14'
            }
          ];
        }else if(type==3){//服务类详情
          this.table.url = this.appConfig.api('serviceclass')//?type='+type+'&id='+id);
          this.table.columns = [
            {
              fixed: 'left',
              title: '序号',
              type: 'index',
              width: 80
            },
            {
              title: '项目单位',
              key: '1'
            },
            {
              title: '项目名称',
              key: '2'
            },
            {
              title: '内容描述',
              key: '3',
            },
            {
              title: '计量单位',
              key: '4',
            },
            {
              title: '需求数量（预估）',
              key: '5',
            },
            {
              title: '预算单价（元）',
              key: '6'
            },
            {
              title: '询价单价（元）',
              key: '7'
            },
            {
              title: '采购总价（元）',
              key: '8',
            },
            {
              title: '项目完成日期',
              key: '9',
            },
            {
              title: '项目单位联系人',
              key: '10'
            },
            {
              title: '项目单位联系电话',
              key: '11'
            },
            {
              title: '项目单位联系地址',
              key: '12',
            },
            {
              title: '业务流程状态',
              key: '13',
            },
            {
              title: '节点状态',
              key: '14'
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
