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
         /* '1': '*****',
          '2': 'XXXXXXXX',
          files:[{name:'文件测试',url:'test'}]
        */}
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
                  prop:'planName'
                },
                {
                  type:'label',
                  label:'项目单位',
                  prop:'purchaseAccountName'
                },
                {
                  type:'label',
                  label:'拟采供应商',
                  prop:'supplierName'
                },
                {
                  type:'label',
                  label:'采购内容及范围',
                  prop:'content'
                },
                {
                  type:'label',
                  label:'单一来源采购理由',
                  prop:'purchaseMethodReasonName'
                },
                {
                  type:'label',
                  label:'公示起止时间',
                  prop:'publicityStartDate',
                  formatter(value){
                    return this.moment(value).format("YYYY-MM-DD HH:mm:ss")
                  }
                },
                {
                  type:'label',
                  label:'项目单位',
                  prop:'purchaseAccountName'
                },
                {
                  type:'label',
                  label:'联系人',
                  prop:'contactName'
                },
                {
                  type:'label',
                  label:'联系电话',
                  prop:'contactMobile'
                },
                {
                  type:'label',
                  label:'采购管理机构',
                  prop:'professionalOrgName'
                },
                {
                  type:'label',
                  label:'联系人',
                  prop:'proContactName'
                },
                {
                  type:'label',
                  label:'联系电话',
                  prop:'proContactMobile'
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
                  prop:'objectionReason'
                },
                {
                  type:'label',
                  label:'异议提出时间',
                  prop:'objectionDate'
                },
                {
                  type:'file',
                  label:'书面异议函',
                  prop:'attachments'
                },
                {
                  type:'file',
                  label:'相关依据及证明材料',
                  prop:'attachments'
                },
                {
                  type:'file',
                  label:'身份证',
                  prop:'attachments'
                },
                {
                  type:'file',
                  label:'授权委托书',
                  prop:'attachments'
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
        this.axios.post(this.appConfig.api('plan/qrySingleSourcePublicMsg'),{
          publicityId:this.$route.params.publicityId
        })
          .then((response) => {
            console.log(response);
            this.data1=response;
          })
          .catch(function (error) {
            console.log(error);
          });
        //获取异常信息
        this.axios.post(this.appConfig.api('plan/qryVendorSingleSourcePublicObjectionDetailMsg'),{
          publicityObjectionId:this.$route.params.publicityObjectionId
        })
          .then((response) => {
            console.log(response);
            this.data2=response;
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
