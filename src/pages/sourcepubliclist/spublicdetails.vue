<template>
  <div>
    <detail v-bind="detailData"></detail>
    <div>
      <el-button @click="backFunc">返回</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import detail from '@/components/Detail.vue'

  export default {
    data () {
      return {
        detailData:{
          contents:[
            {
              header:'公示信息',
              children:[
                {
                  type:'label',
                  label:'计划名称',
                  value:'',
                  keyv:'1'
                },
                {
                  type:'label',
                  label:'项目单位',
                  value:'',
                  keyv:'2'
                },
                {
                  type:'label',
                  label:'拟采供应商',
                  value:'',
                  keyv:'3'
                },
                {
                  type:'label',
                  label:'采购内容及范围',
                  value:'',
                  keyv:'4'
                },
                {
                  type:'label',
                  label:'单一来源采购理由',
                  value:'',
                  keyv:'5'
                },
                {
                  type:'label',
                  label:'公示起止时间',
                  value:'',
                  keyv:'6'
                },
                {
                  type:'label',
                  label:'项目单位',
                  value:'',
                  keyv:'7'
                },
                {
                  type:'label',
                  label:'联系人',
                  value:'',
                  keyv:'8'
                },
                {
                  type:'label',
                  label:'联系电话',
                  value:'',
                  keyv:'9'
                },
                {
                  type:'label',
                  label:'采购管理机构',
                  value:'',
                  keyv:'10'
                },
                {
                  type:'label',
                  label:'联系人',
                  value:'',
                  keyv:'11'
                },
                {
                  type:'label',
                  label:'联系电话',
                  value:'',
                  keyv:'12'
                }
              ]
            },
            {
              header:'异常信息',
              children:[
                {
                  type:'label',
                  label:'异议理由',
                  value:'',
                  keyv:''
                },
                {
                  type:'label',
                  label:'异议提出时间',
                  value:'',
                  keyv:''
                },
                {
                  type:'file',
                  label:'书面异议函',
                  value:'fileName',
                  url:'fileUrl',
                  keyv:''
                },
                {
                  type:'file',
                  label:'相关依据及证明材料',
                  value:'fileName',
                  url:'fileUrl',
                  keyv:''
                },
                {
                  type:'file',
                  label:'身份证',
                  value:'fileName',
                  url:'fileUrl',
                  keyv:''
                },
                {
                  type:'file',
                  label:'授权委托书',
                  value:'fileName',
                  url:'fileUrl',
                  keyv:''
                }
              ]
            }
          ]
        }
      };
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
            for(let i=0; i<this.detailData.contents[0].children.length; i++){
              if(this.detailData.contents[0].children[i].keyv==='6'){
                let datatime = datas[this.detailData.contents[0].children[i].keyv];
                this.detailData.contents[0].children[i].value = this.moment(datatime).format("YY-MM-DD HH:mm:ss");
              }else{
                this.detailData.contents[0].children[i].value = datas[this.detailData.contents[0].children[i].keyv];
              }
            }
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


</style>
