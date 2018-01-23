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
    name: "clarify-review-detail",
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
          fileList:[{name:'文件测试',url:'test'},{name:'文件测试',url:'test'}],
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
                  prop: 'planName',
                },
                {
                  type: 'label',
                  label: '采购单编号',
                  prop: 'planName',
                },
                {
                  type: 'label',
                  label: '澄清内容',
                  prop: 'clarifyContent',
                },
                {
                  type: 'file',
                  label: '澄清附件',
                  prop: 'fileList'
                },
                {
                  type: 'label',
                  label: '澄清时间',
                  prop: 'publishDate',
                  formatter: (value) => {
                    return this.moment(value).format('YYYY-MM-DD HH:mm:ss');
                  }
                },
                {
                  type: 'label',
                  label: '澄清属性',
                  prop: 'publishUser',
                }
              ]
            },
            {
              data: this.form,
              header:'回复情况',
              labelWidth:'150px',
              inputWidth:'400px',
              children: [
                {
                  type: 'label',
                  label: '询价单名称',
                  prop: 'planName',
                },
                {
                  type: 'label',
                  label: '采购单编号',
                  prop: 'planName',
                },
                {
                  type: 'label',
                  label: '回复内容',
                  prop: 'clarifyContent',
                },
                {
                  type: 'file',
                  label: '澄清附件',
                  prop: 'fileList'
                },
                {
                  type: 'label',
                  label: '回复询价单位',
                  prop: 'publishUser',
                },
                {
                  type: 'label',
                  label: '回复人',
                  prop: 'publishUser',
                },
                {
                  type: 'label',
                  label: '回复时间',
                  prop: 'publishDate',
                  formatter: (value) => {
                    return this.moment(value).format('YYYY-MM-DD HH:mm:ss');
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
        this.$router.push({name:'clarifyReviewIndex'})
      }
    }
  }
</script>
<style scoped>

</style>
