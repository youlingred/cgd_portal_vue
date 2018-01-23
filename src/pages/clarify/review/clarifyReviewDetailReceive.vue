<template>
  <div>
    <detail v-bind="detailData"></detail>
    <buttons-operator type="bottom"
                      fix="true"
                      :buttons="[{label:'回复采购企业澄清',type:'primary',click:reply},{label:'返回',type:'info',click:back}]"/>

      <cg-table v-show="table" ref="table" v-bind="table"/>
  </div>
</template>

<script>
  import detail from '@/components/Detail.vue'
  import buttonsOperator from '@/components/ButtonsOperator.vue'
  import CgTable from '@/components/CgTable.vue'

  export default {
    name: "clarify-review-detail-receive",
    components: {
      CgTable,
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
        },
        table:{
          header:'澄清短信'
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
                  label: '发送澄清单位',
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
                },
                {
                  type: 'label',
                  label: '回复状态',
                  prop: 'status',
                  formatter(value){
                    switch(value){
                      case 1:
                        return '状态1';
                      case 2:
                        return '状态2';
                      default:
                        return ''
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
      //回复
      reply(){

      },
      //返回上一页
      back(){
        this.$router.push({name:'clarifyReviewIndex'})
      }
    }
  }
</script>
<style scoped>

</style>
