<template>
  <div>
    <detail v-bind="confirmData"></detail>
    <detail ref="form_detail" v-bind="detailData"></detail>
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
        confirmForm: {},
        form: {
          clarificationId: '',
          clarificationRecId: '',
          replyContent: '',
          fileList: [],
          attachments: {}
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
                  prop: 'fileList',
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
                ],
                fileList: [
                  {required: true, message: '请上传澄清附件', trigger: 'blur'},
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
      },
      onSuccess(file) {
        this.$message.success('文件上传成功');
        this.form.fileList.push({name: file.filePath, path: file.newFileName});
      },
      onRemove(file, fileList) {
        this.form.fileList = fileList;
        this.form.fileList = _.filter(this.form.fileList, function (item) {
          return item.name != file.response.newFileName;
        });
      },
      onError() {
        this.$message.error('文件上传失败');
      },
      beforeRemove(file) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      //FIXME 提交
      sumbit() {
        this.util.dataAdapter(this.form, ['name', 'path'], ['attachmentName', 'attachmentUrl'], false);
        this.$refs['form_detail'].forms[0].validate((valid) => {
          if (valid) {
            this.form.attachments = JSON.stringify(this.form.fileList);
            this.axios.post(this.appConfig.api('inquiry/others/clarification/replyMyReceiverClarificationInfo'), this.form)
              .then((response) => {
                this.$router.push({name: 'clarifyReviewIndex'});
              })
              .catch(function (error) {
                console.log("--------------error---------" + error);
              });
          } else {
            return false;
          }
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
