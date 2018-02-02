<template>
  <div>
    <detail-comp v-bind="detailData"></detail-comp>
    <buttons-operator type="bottom"
                      fix="true"
                      :buttons="[{label:'返回',type:'info',click:back}]"/>

  </div>
</template>

<script>
  import detailComp from '@/components/Detail.vue'
  import buttonsOperator from '@/components/ButtonsOperator.vue'

  export default {
    name: "detail",
    components: {
      detailComp,
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
                  label: '发送澄清单位',
                  prop: 'planName',
                },
                {
                  type: 'label',
                  label: '询价单名称',
                  prop: 'status',
                  formatter: (value) => {
                    switch(value){
                      case 1:
                        return '处理中'
                      case 2:
                        return '已受理'
                      case 3:
                        return '驳回'
                      default:
                        return ''
                    }
                  }
                },
                {
                  type: 'label',
                  label: '询价单编号',
                  placeholder: '请输入发布人',
                  prop: 'publishUser',
                },
                {
                  type: 'label',
                  label: '澄清内容',
                  placeholder: '请输入',
                  prop: 'clarifyContent',
                  extendParam:{
                    autosize:{ minRows: 2, maxRows: 4}
                  }
                },
                {
                  type: 'file',
                  label: '澄清附件',
                  prop: 'fileList'
                },
                {
                  type: 'label',
                  label: '接受澄清单位',
                  prop: 'publishUser',
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
                  label: '制单人',
                  prop: 'publishUser',
                }
              ],
              rules:{
                planName:[
                  { required: true, message: '请选择询价单名称', trigger: 'blur' },
                ],
                clarifyContent:[
                  { required: true, message: '请输入澄清内容', trigger: 'blur' },
                ]
              }
            },
          ]
        }
      }
    },
    methods: {
      back(){
        this.$router.push({name:'list'})
      }
    }
  }
</script>
<style scoped>

</style>
