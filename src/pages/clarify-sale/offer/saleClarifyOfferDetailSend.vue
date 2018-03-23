<template>
  <div>
    <detail v-bind="detailData"></detail>
    <buttons-operator type="bottom"
                      fix="true"
                      :buttons="[{label:'返回',type:'info',click:back}]"/>

  </div>
</template>

<script>
  import detail from '@/components/Detail.vue'
  import buttonsOperator from '@/components/ButtonsOperator.vue'

  export default {
    name: "clarify-priceManage-detail",
    components: {
      detail,
      buttonsOperator
    },
    data() {
      return {
        form: {
        }
      };
    },
    computed: {
      detailData() {
        return {
          contents: [
            {
              data: this.form,
              labelWidth: '150px',
              inputWidth: '400px',
              children: [
                {
                  type: 'label',
                  label: '发送澄清单位',
                  prop: 'questionSubmitOrgName',
                },
                {
                  type: 'label',
                  label: '询价单名称',
                  prop: 'inquiryName',
                },
                {
                  type: 'label',
                  label: '询价单编号',
                  prop: 'inquiryCode',
                },
                {
                  type: 'label',
                  label: '澄清内容',
                  prop: 'questionContent',
                  extendParam: {
                    autosize: {minRows: 2, maxRows: 4}
                  }
                },
                {
                  type: 'file',
                  label: '澄清附件',
                  prop: 'iqrAttachmentBOS'
                },
                {
                  type: 'label',
                  label: '接受澄清单位',
                  prop: 'questionReceiverName',
                },
                {
                  type: 'label',
                  label: '澄清时间',
                  prop: '',
                  formatter: (value) => {
                    return this.moment(value).format('YYYY-MM-DD HH:mm:ss');
                  }
                },
                {
                  type: 'label',
                  label: '澄清属性',
                  prop: 'questionStageName',
                },
                {
                  type: 'label',
                  label: '制单人',
                  prop: 'createUser',
                }
              ]
            },
          ]
        }
      }
    },
    methods: {
      back() {
        this.$router.back();
      }
    },
    created() {
      this.axios.post(this.appConfig.api('inquiry/others/clarification/searchMyPublishQuestionInfo'),{questionId:this.$route.params.id})
        .then((data) => {
          this.form=this.util.dataAdapter(data,['attachmentName','attachmentUrl'],['name','url']);
      })
    }
  }
</script>
<style scoped>

</style>
