<template>
  <div>
    <detail v-bind="detailData"></detail>
    <div class="footerdiv">
      <el-button @click="backFunc" class="footerbutton">返回</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import detail from '@/components/Detail.vue'

  export default {
    data () {
      return {
        data1:{},
        data2:{}
      };
    },
    computed:{
      detailData(){
        return {
          contents:[
            {
              data:this.data1,
              header:'公示信息',
              children:[
                {
                  type:'label',
                  label:'计划名称',
                  prop:'1'
                },
                {
                  type:'label',
                  label:'项目单位',
                  prop:'2'
                },
                {
                  type:'label',
                  label:'拟采供应商',
                  prop:'3'
                },
                {
                  type:'label',
                  label:'采购内容及范围',
                  prop:'4'
                },
                {
                  type:'label',
                  label:'单一来源采购理由',
                  prop:'5'
                },
                {
                  type:'label',
                  label:'公示起止时间',
                  prop:'6',
                  formatter(value){
                    return this.moment(value).format("YY-MM-DD HH:mm:ss")
                  }
                },
                {
                  type:'label',
                  label:'项目单位',
                  prop:'7'
                },
                {
                  type:'label',
                  label:'联系人',
                  prop:'8'
                },
                {
                  type:'label',
                  label:'联系电话',
                  prop:'9'
                },
                {
                  type:'label',
                  label:'采购管理机构',
                  prop:'10'
                },
                {
                  type:'label',
                  label:'联系人',
                  prop:'11'
                },
                {
                  type:'label',
                  label:'联系电话',
                  prop:'12'
                }
              ]
            },
            {
              data:this.data2,
              header:'异常信息',
              children:[
                {
                  type:'label',
                  label:'异议理由',
                  prop:''
                },
                {
                  type:'label',
                  label:'异议提出时间',
                  prop:''
                },
                {
                  type:'file',
                  label:'书面异议函',
                  prop:'fileName',
                  prop_url:'fileUrl'
                },
                {
                  type:'file',
                  label:'相关依据及证明材料',
                  prop:'fileName',
                  prop_url:'fileUrl'
                },
                {
                  type:'file',
                  label:'身份证',
                  prop:'fileName',
                  prop_url:'fileUrl'
                },
                {
                  type:'file',
                  label:'授权委托书',
                  prop:'fileName',
                  prop_url:'fileUrl'
                }
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

      },
      _initdata() {
        //获取公示信息
        this.axios.post(this.appConfig.api('testcommen'),{})
          .then((response) => {
            let datas = response.data.data;
            this.data1=datas;
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    components:{
      detail
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
