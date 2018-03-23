<template>
  <div>
    <detail v-bind="detailData"></detail>
    <buttons-operator v-if="showButton==='show'" type="bottom"
                      fix="true"
                      :buttons="[{label:'回复采购企业澄清',type:'primary',click:reply},{label:'返回',type:'info',click:back}]"/>
    <buttons-operator v-if="showButton==='disabled'" type="bottom"
                      fix="true"
                      :buttons="[{label:'回复采购企业澄清',type:'primary',click:'',disabled: true},{label:'返回',type:'info',click:back}]"/>
  </div>
</template>
<script>
  import detail from '@/components/Detail.vue'
  import buttonsOperator from '@/components/ButtonsOperator.vue'

  export default {
    name: "clarify-review-detail-receive",
    components: {
      detail,
      buttonsOperator
    },
    data() {
      return {
        form: {},
        showButton: '',
        clarificationId: ''
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
                  label: '发送澄清单位',
                  prop: 'receiverOrgName',
                },
                {
                  type: 'label',
                  label: '澄清内容',
                  prop: 'clarificationContent',
                },
                {
                  type: 'file',
                  label: '澄清附件',
                  prop: 'replyAttachmentBOs'
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
                },
                {
                  type: 'label',
                  label: '回复状态',
                  prop: 'isReplay',
                  formatter(value) {
                    switch (value) {
                      case 1:
                        return '已回复';
                      case 0:
                        return '未回复';
                    }
                  }
                }
              ]
            }
          ]
        }
      }
    },
    methods: {
      query(query) {
        if (!query) {
          query = ''
        }
        //澄清详情
        this.axios.post(this.appConfig.api('inquiry/others/clarification/searchMyReceiverReviewClarificationInfo'), {clarificationId: this.$route.params.id})
          .then((data) => {
            this.clarificationId = data.clarificationId;

            //评审中发布澄清时校验询价单状态
            this.axios.post(this.appConfig.api('inquiry/others/clarification/beforeReviewCheckInquiry'), {
              inquiryId: data.inquiryId,
              iqrSeq: data.iqrSeq,
              purchaseCatagory: data.purchaseCategory
            })
              .then((data) => {
                if (data.isReview == 1) {
                  this.showButton = 'show';
                }
              });
            this.form = this.util.dataAdapter(data, ['attachmentName', 'attachmentUrl'], ['name', 'url']);
          });
      },
      //回复
      reply() {
        this.$router.push({name: 'clarifyReviewEdit', params: {id: this.clarificationId}});
      },
      //返回上一页
      back() {
        this.$router.back()
      }
    },
    created() {
      this.query();
    }
  }
</script>
<style scoped>

</style>
