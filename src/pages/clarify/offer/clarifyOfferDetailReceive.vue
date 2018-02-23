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
    name: "clarify-priceManage-detail-receive",
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
              labelWidth:'150px',
              inputWidth:'400px',
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
                  prop: 'clarificationOrgName',
                },
                {
                  type: 'label',
                  label: '澄清内容',
                  prop: 'clarificationContent',
                  extendParam:{œ
                    autosize:{ minRows: 2, maxRows: 4}
                  }
                },
                {
                  type: 'file',
                  label: '澄清附件',
                  prop: 'iqrAttachmentBOS'
                },
                {
                  type: 'label',
                  label: '澄清时间',
                  prop: 'clarificationTime',
                  formatter: (value) => {
                    return this.moment(value).format('YYYY-MM-DD HH:mm:ss');
                  }
                },
                {
                  type: 'label',
                  label: '澄清属性',
                  prop: 'clarificationStage',
                  formatter: (value) => {
                    switch (value){
                      case 1:
                        return '报价前澄清';
                      case 2:
                        return '评审中澄清';
                      default:
                        return '';
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
      back(){
        this.$router.back();
      }
    },
    created() {
      this.axios.post(this.appConfig.api('inquiry/others/clarification/searchMyReceiverBeforeQuoteClarificationInfo'),{clarificationId:this.$route.params.id})
        .then((data) => {
          this.util.dataAdapter(data,['attachmentName','attachmentUrl'],['name','path'],false)
          this.form=data;
        })
    }
  }
</script>
<style scoped>

</style>
