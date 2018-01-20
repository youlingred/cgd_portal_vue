<template>
  <div>
    <detail v-bind="detailData"></detail>
    <buttons-operator type="bottom"
                      fix="true"
                      :buttons="[{label:'提交',type:'primary',click:sumbit},{label:'返回',type:'info',click:back}]"/>

  </div>
</template>

<script>
  import detail from '@/components/Detail.vue'
  import buttonsOperator from '@/components/ButtonsOperator.vue'

  export default {
      name: "clarify-offer-edit",
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
            clarifyContent:'哈哈哈哈哈',
            status: 1,
            prop4: '艳照门',
            fileList: []
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
                    type: 'select',
                    label: '询价单名称',
                    placeholder: '请选择处理状态',
                    prop: 'status',
                    extendParam: {
                      options: [
                        {
                          value: 1,
                          label: '处理中'
                        },
                        {
                          value: 2,
                          label: '已受理'
                        },
                        {
                          value: 3,
                          label: '驳回'
                        }
                      ]
                    }
                  },
                  {
                    type: 'label',
                    label: '询价单编号',
                    placeholder: '请输入发布人',
                    prop: 'publishUser',
                  },
                  {
                    type: 'textarea',
                    label: '澄清内容',
                    placeholder: '请输入',
                    prop: 'clarifyContent',
                    extendParam:{
                      autosize:{ minRows: 2, maxRows: 4}
                    }
                  },
                  {
                    type: 'upload',
                    label: '澄清附件',
                    prop: 'fileList',
                    extendParam:{
                      action:'https://jsonplaceholder.typicode.com/posts/',
                      tip:'支持类型为常用办公类型（txt,doc,xls,docx,xlsx,ppt,pptx,pdf,zip,rar,wps,dps,et,jpg,jpeg等）文件格式，大小不超过60MB',
                      // listType:"picture"
                    }
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
        sumbit() {
          this.axios.post(this.appConfig.api('testDylyList'),this.form)
            .then((response) => {
              console.log(response.data.data);
            })
            .catch(function (error) {
              console.log(error);
            });
        },
        back(){
          this.$router.push({name:'clarifyOfferIndex'})
        }
      }
    }
</script>
<style scoped>

</style>
