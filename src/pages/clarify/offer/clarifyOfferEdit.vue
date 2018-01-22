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
        detail: {
          planName: '团建',
          publishUser: '老铁',
          publishDate: 1514192693000,
          objectionDate: 1514192693000,
          clarifyContent: '哈哈哈哈哈',
          status: '',
          prop4: '艳照门',
          fileList: []
        },
        options: [],
      };
    },
    computed: {
      detailData() {
        return {
          contents: [
            {
              data: this.detail,
              labelWidth: '150px',
              inputWidth: '400px',
              children: [
                {
                  type: 'label',
                  label: '发送澄清单位',
                  prop: 'planName',
                },
                {
                  type: 'select',
                  label: '询价单名称',
                  placeholder: '输入关键字查询',
                  prop: 'status',
                  extendParam: {
                    remote: true,
                    filterable: true,
                    remote: true,
                    remoteMethod: this.query,
                    options: this.options
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
                  extendParam: {
                    autosize: {minRows: 2, maxRows: 4}
                  }
                },
                {
                  type: 'upload',
                  label: '澄清附件',
                  prop: 'fileList',
                  extendParam: {
                    action: 'https://jsonplaceholder.typicode.com/posts/',
                    tip: '支持类型为常用办公类型（txt,doc,xls,docx,xlsx,ppt,pptx,pdf,zip,rar,wps,dps,et,jpg,jpeg等）文件格式，大小不超过60MB',
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
              rules: {
                planName: [
                  {required: true, message: '请选择询价单名称', trigger: 'blur'},
                ],
                clarifyContent: [
                  {required: true, message: '请输入澄清内容', trigger: 'blur'},
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
        if(!query){
          query=''
        }
        this.axios.post(this.appConfig.api('testQuerySelect'),this.form)
          .then((response) => {
            console.log(response.data.data);
            let list=response.data.data;

            this.options = list.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //FIXME 提交
      sumbit() {
        this.axios.post(this.appConfig.api('testDylyList'), this.form)
          .then((response) => {
            console.log(response.data.data);
          })
          .catch(function (error) {
            console.log(error);
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
