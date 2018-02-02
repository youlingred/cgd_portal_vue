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
          planName: '团建',
          publishUser: '老铁',
          publishDate: 1514192693000,
          objectionDate: 1514192693000,
          status: 1,
          clarifyContent:'哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
          prop4: '艳照门',
          fileList:[{name:'文件测试',path:'test'},{name:'文件测试',path:'test'}],
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
                  prop: '',
                },
                {
                  type: 'label',
                  label: '澄清内容',
                  prop: 'clarificationContent',
                  extendParam:{
                    autosize:{ minRows: 2, maxRows: 4}
                  }
                },
                {
                  type: 'file',
                  label: '澄清附件',
                  prop: ''
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
                  prop: '',
                }
              ]
            }
          ]
        }
      }
    },
    methods: {
      back(){
        this.$router.push({name:'clarifyOfferIndex'})
      }
    }
  }
</script>
<style scoped>

</style>
