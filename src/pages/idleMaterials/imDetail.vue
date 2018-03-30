<template>
  <div>
    <detail v-bind="detailData"/>
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
          autoLoad:false,
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
              header:'采购意向信息',
              labelWidth:'150px',
              inputWidth:'400px',
              children:[
                {
                  type:'label',
                  label:'采购方',
                  prop:'createCompanyName'
                },
                {
                  type:'label',
                  label:'采购方联系人',
                  prop:'contactName'
                },
                {
                  type:'label',
                  label:'采购方联系电话',
                  prop:'contactPhone',
                },
                {
                  type:'label',
                  label:'业务状态',
                  prop:'docStatus',
                  formatter(value){
                    switch(value){
                      case 1:
                        return '';
                      case 2:
                        return '';
                      default:
                        return ''
                    }
                  }
                },
                {
                  type:'label',
                  label:'创建时间',
                  prop:'18',
                  formatter(value){
                    return value===(null||'')?'-':this.moment(value).format("YYYY-MM-DD HH:mm:ss");
                  }
                },
                {
                  type:'label',
                  label:'创建人',
                  prop:'21'
                },
              ]
            },
            {
              data:this.form,
              header:'闲置物资处置信息',
              labelWidth:'150px',
              inputWidth:'400px',
              children:[
                {
                  type:'label',
                  label:'项目单位',
                  prop:'1'
                },
                {
                  type:'label',
                  label:'标的物名称',
                  prop:'2'
                },
                {
                  type:'label',
                  label:'处置单位联系人',
                  prop:'6',
                },
                {
                  type:'label',
                  label:'处置单位联系单位',
                  prop:'7'
                },
                {
                  type:'label',
                  label:'提货地点',
                  prop:'8'
                },
                {
                  type:'file',
                  label:'附件',
                  prop:'fileList'
                },
                {
                  type:'label',
                  label:'备注',
                  prop:'21'
                },
              ]
            },
          ]
        }
      }
    },
    methods:{
      backFunc () {
        this.$router.push({name:'idleMaterialsIndex'});
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
        if(type==1){//采购意向详情
          this.table.url = this.appConfig.api('Materials')//?type='+type+'&id='+id);
          this.table.columns = [
            {
              fixed: 'left',
              title: '序号',
              type: 'index',
              width: 80
            },
            {
              title: '物料编码',
              key: '1',
              width: 150,
            },
            {
              title: '物料名称',
              key: '2',
              width: 150,
            },
            {
              title: '物资分类',
              key: '3',
              width: 100,
            },
            {
              title: '规格',
              key: '4',
              width: 100,
            },
            {
              title: '型号',
              key: '5',
              width: 100,
            },
            {
              title: '图号',
              key: '6',
              width: 100,
            },
            {
              title: '材质',
              key: '7',
              width: 100,
            },
            {
              title: '品牌',
              key: '8',
              width: 100,
            },
            {
              title: '生产厂家',
              key: '9',
              width: 150,
            },
            {
              title: '计量单位',
              key: '10',
              width: 100,
            },
            {
              title: '处置数量',
              align:'right',
              key: '14',
              width: 150,
            },
            {
              title: '销售单价（元）',
              key: '1',
              width: 180
            },
            {
              title: '采购意向数量',
              key: '4',
              width: 150
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
