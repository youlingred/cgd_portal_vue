<template>
  <div>
    <detail v-bind="confirmData"></detail>
    <detail v-bind="detailData"></detail>
    <buttons-operator type="bottom"
                      fix="true"
                      :buttons="[{label:'确定',type:'primary',click:sumbit},{label:'取消',type:'info',click:back}]"/>

  </div>
</template>

<script>
  import detail from '@/components/Detail.vue'
  import buttonsOperator from '@/components/ButtonsOperator.vue'

  export default {
    name: "clarify-review-edit",
    components: {
      detail,
      buttonsOperator
    },
    data() {
      return {
        // fileList: [{name: '文件测试', path: 'test'}, {name: '文件测试', path: 'test'}],
        fileList: [],
        // fileList: [
        //   {
        //     attachmentName: '文件测试1',
        //     attachmentUrl: 'test1',
        //     ossPath: 'oss1'
        //   },
        //   {
        //     attachmentName: '文件测试2',
        //     attachmentUrl: 'test2',
        //     ossPath: 'oss2'
        //   }],

        confirmForm: {},
        form: {
          attachments: {},
          clarificationId: '',
          clarificationRecId: '',
          receiverOrgName: '',
          replyTime: '',
          replier: ''
        },
        options: [],
      };
    },
    computed: {
      confirmData() {
        return {
          contents: [
            {
              data: this.confirmForm,
              labelWidth: '150px',
              inputWidth: '450px',
              children: [
                {
                  type: 'label',
                  label: '询价单名称',
                  prop: 'inquiryName',
                },
                {
                  type: 'label',
                  label: '采购单编号',
                  prop: 'inquiryCode',
                },
                {
                  type: 'label',
                  label: '澄清内容',
                  prop: 'clarificationContent',
                },
                {
                  type: 'file',
                  label: '澄清附件',
                  prop: '',
                  extendParam: {
                    action: 'https://jsonplaceholder.typicode.com/posts/',
                    tip: '支持类型为常用办公类型（txt,doc,xls,docx,xlsx,ppt,pptx,pdf,zip,rar,wps,dps,et,jpg,jpeg等）文件格式，大小不超过60MB',
                    // listType:"picture"
                  }
                },
                {
                  type: 'label',
                  label: '澄清时间',
                  prop: 'clarificationTime',
                  formatter: (clarificationTime) => {
                    return this.moment(clarificationTime).format('YYYY-MM-DD HH:mm:ss');
                  }
                },
                {
                  type: 'label',
                  label: '澄清属性',
                  prop: 'clarificationStage',
                  formatter(value) {
                    switch (value) {
                      case 1:
                        return '报价前澄清';
                      case 2:
                        return '评审中澄清';
                    }
                  }
                }
              ]
            }
          ]
        }
      },
      detailData() {
        return {
          contents: [
            {
              header: '回复内容',
              data: this.form,
              labelWidth: '150px',
              inputWidth: '400px',
              children: [
                {
                  type: 'textarea',
                  label: '回复内容',
                  placeholder: '请输入',
                  prop: 'replyContent',
                  extendParam: {
                    autosize: {minRows: 2, maxRows: 4}
                  }
                },
                {
                  type: 'upload',
                  label: '澄清附件',
                  prop: '',
                  extendParam: {
                    beforeRemove: this.beforeRemove,
                    onSuccess: this.onSuccess,
                    onRemove: this.onRemove,
                    onError: this.onError,
                    action: this.appConfig.api('', 'upload'),
                    tip: '支持类型为常用办公类型（txt,doc,xls,docx,xlsx,ppt,pptx,pdf,zip,rar,wps,dps,et,jpg,jpeg等）文件格式，大小不超过60MB',
                    // listType:"picture"
                  }
                },
                {
                  type: 'label',
                  label: '回复单位',
                  prop: 'receiverOrgName',
                },
                {
                  type: 'label',
                  label: '回复时间',
                  prop: 'replyTime',
                  formatter: (value) => {
                    return this.moment(value).format('YYYY-MM-DD HH:mm:ss');
                  }
                },
                {
                  type: 'label',
                  label: '回复人',
                  prop: 'replier',
                }
              ],
              rules: {
                replyContent: [
                  {required: true, message: '请输入回复内容', trigger: 'blur'},
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

        //澄清详情
        this.axios.post(this.appConfig.api('inquiry/others/clarification/searchMyReceiverReviewClarificationInfo'), {clarificationId: this.$route.params.id})
          .then((data) => {
            this.form.clarificationId = data.clarificationId;
            this.form.clarificationRecId = data.clarificationRecId;
            this.form.receiverOrgName = data.receiverOrgName;
            this.form.replyTime = data.replyTime;
            this.form.replier = data.replier;
            var test = this.util.dataAdapter(data, ['attachmentName', 'attachmentUrl'], ['name', 'path'], false)
            this.confirmForm = data;
          });

        // this.confirmForm = {
        //   inquiryName: '测试询价单001',
        //   inquiryCode: 1234,
        //   clarificationContent: '由于技术升级，询价的规格为老规格，若部分单位已不生产。则各供方供给等同或高于此规格的产品即可具体技术参数，详见附件',
        //   fileList: [{name: '文件测试', path: 'test'}, {name: '文件测试', path: 'test'}],
        // };
      },
      onSuccess(file) {
        this.$message.success('文件上传成功');
        this.fileList.push({attachmentName: file.filePath, attachmentUrl: file.newFileName});
      },
      onRemove(file) {
        this.fileList = _.filter(this.fileList, function (item) {
          return item.attachmentUrl != file.response.newFileName
        });
        ;
      },
      onError() {
        this.$message.error('文件上传失败');
      },
      beforeRemove(file) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      //FIXME 提交
      sumbit() {
        // console.log("-------------------------" + JSON.stringify(this.form));
        console.log("-------------------------" + JSON.stringify(this.fileList));
        // this.util.dataAdapter(this.fileList, ['name', 'url'], ['attachmentName', 'attachmentUrl'])
        // this.form.attachments = JSON.stringify(this.fileList);
        this.axios.post(this.appConfig.api('inquiry/others/clarification/replyMyReceiverClarificationInfo'), this.form)
          .then((response) => {
            console.log("--------------sucess" + response);
          })
          .catch(function (error) {
            console.log("--------------error" + error);
          });
      },
      back() {
        this.$router.push({name: 'clarifyOfferIndex'})
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
