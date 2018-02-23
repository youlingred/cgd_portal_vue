<template>
  <div>
    <detail v-bind="detailData"/>
    <buttons-operator type="bottom"
                      fix="true"
                      :buttons="[{label:'提交',type:'primary',click:sumbit},{label:'返回',type:'info',click:back}]"/>

  </div>
</template>

<script>
  import detail from '@/components/Detail.vue'
  import buttonsOperator from '@/components/ButtonsOperator.vue'

  export default {
    name: "clarify-priceManage-edit",
    components: {
      detail,
      buttonsOperator
    },
    data() {
      return {
        form: {
          companyName:this.$store.getters.companyName,
          receiveUser:'',
          crateUser:this.$store.getters.userName,
          clarifyType:'报价前澄清',

          questionContent:'',
          inquiry:'',
          inquiryId:'',
          iqrSeq:'',
          purchaseCategory:'',
          attachments:[],
        },
        options: [],
        fileList:[],
      };
    },
    watch:{
      'form.inquiry':{
        handler(val){
          this.form.inquiryId=val.inquiryId;
          this.form.iqrSeq=val.iqrSeq;
          this.form.purchaseCategory=val.purchaseCategory;
        }
      },
      '$store.getters.userName':{
        handler(val){
         this.form.crateUser=val;
        }
      },
      '$store.getters.companyName':{
        handler(val){
          this.form.companyName=val;
        }
      }
    },
    computed: {
      detailData() {
        return {
          contents: [
            {
              data: this.form,
              labelWidth: '150px',
              inputWidth: '300px',
              children: [
                {
                  type: 'label',
                  label: '发送澄清单位',
                  prop: 'companyName',
                },
                {
                  type: 'select',
                  label: '询价单名称',
                  placeholder: '输入关键字查询',
                  prop: 'inquiry',
                  extendParam: {
                    valueKey:'inquiryId',
                    // remote: true,
                    filterable: true,
                    // remoteMethod: this.query,
                    options: this.options
                  }
                },
                {
                  type: 'label',
                  label: '询价单编号',
                  prop: 'inquiryId',
                },
                {
                  type: 'textarea',
                  label: '澄清内容',
                  placeholder: '请输入',
                  prop: 'questionContent',
                  extendParam: {
                    autosize: {minRows: 2, maxRows: 4}
                  }
                },
                {
                  type: 'upload',
                  label: '澄清附件',
                  prop:'fileList',
                  extendParam: {
                    beforeRemove:this.beforeRemove,
                    onSuccess:this.onSuccess,
                    onRemove:this.onRemove,
                    onError:this.onError,
                    action: this.appConfig.api('','upload'),
                    tip: '支持类型为常用办公类型（txt,doc,xls,docx,xlsx,ppt,pptx,pdf,zip,rar,wps,dps,et,jpg,jpeg等）文件格式，大小不超过60MB',
                    // listType:"picture"
                  }
                },
                {
                  type: 'label',
                  label: '接受澄清单位',
                  prop: 'receiveUser',
                },
                {
                  type: 'label',
                  label: '澄清时间',
                  formatter: (value) => {
                    return this.moment(value).format('YYYY-MM-DD HH:mm:ss');
                  }
                },
                {
                  type: 'label',
                  label: '澄清属性',
                  prop: 'clarifyType',
                },
                {
                  type: 'label',
                  label: '制单人',
                  prop: 'crateUser',
                }
              ],
              rules: {
                inquiry: [
                  {required: true, message: '请选择询价单名称', trigger: 'blur'},
                ],
                questionContent: [
                  {required: true, message: '请输入澄清内容', trigger: 'blur'},
                ]
              }
            },
          ]
        }
      }
    },
    methods: {
      //FIXME 远程请求select数据
      query(query) {
        if (!query) {
          query = ''
        }
        this.axios.post(this.appConfig.api('inquiry/others/clarification/selectWaitingInquiryList'))
        // this.axios.post(this.appConfig.api('testQuerySelect'))
          .then((response) => {
            console.log(response);
            let list = response;
            list.map(item=>{
              let val=_.assign({},item);
              item.label=val.inquiryName;
              item.value=val;
            });
            this.options=list;
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      onSuccess(file){
        this.$message.success('文件上传成功');
        this.fileList.push({attachmentName:file.filePath,attachmentUrl:file.newFileName});
      },
      onRemove(file){
        this.fileList=_.filter(this.fileList, function(item) { return item.attachmentUrl!=file.response.newFileName });;
      },
      onError(){
        this.$message.error('文件上传失败');
      },
      beforeRemove(file){
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      //FIXME 提交
      sumbit() {
        console.log(this.form);
        this.util.dataAdapter(this.fileList,['name','url'],['attachmentName','attachmentUrl'])
        this.form.attachments=JSON.stringify(this.fileList);
        this.axios.post(this.appConfig.api('inquiry/others/clarification/addMyQuestionInfo'), this.form)
          .then((response) => {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      back() {
        this.$router.back();
      }
    },
    //FIXME 组件创建,初始化数据
    created() {
      this.query();
    }
  }
</script>
<style scoped>

</style>
