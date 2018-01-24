<template>
  <div>
    <detail v-bind="detailData"/>
<!--    <div class="footerdiv">
      <el-button @click="backFunc" class="footerbutton">返回</el-button>
    </div>-->
    <buttons-operator type="bottom"
                      fix="true"
                      :buttons="[{label:'返回',type:'info',click:backFunc}]"/>
  </div>
</template>

<script>
  import detail from '@/components/Detail.vue'
  import buttonsOperator from '@/components/ButtonsOperator.vue'

  export default {
    data () {
      return {
        data1:{},
        data2:{
          '1': '*****',
          '2': 'XXXXXXXX',
          files:[{name:'文件测试',url:'test'}]
        }
      };
    },
    computed:{
      detailData(){
        return {
          contents:[
            {
              data:this.data1,
              header:'公示信息',
              labelWidth:'150px',
              inputWidth:'400px',
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
                    return this.moment(value).format("YYYY-MM-DD HH:mm:ss")
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
              labelWidth:'150px',
              inputWidth:'400px',
              header:'异常信息',
              children:[
                {
                  type:'label',
                  label:'异议理由',
                  prop:'1'
                },
                {
                  type:'label',
                  label:'异议提出时间',
                  prop:'2'
                },
                {
                  type:'file',
                  label:'书面异议函',
                  prop:'files'
                },
                {
                  type:'file',
                  label:'相关依据及证明材料',
                  prop:'files'
                },
                {
                  type:'file',
                  label:'身份证',
                  prop:'files'
                },
                {
                  type:'file',
                  label:'授权委托书',
                  prop:'files'
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
        this.$router.push({name:'spubliclist'})
      },
      _initdata() {
        //获取公示信息
        this.axios.post(this.appConfig.api('testcommenNotice'),{})
          .then((response) => {
            this.data1=response;
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    components:{
      detail,
      buttonsOperator
    },

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
