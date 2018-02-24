<template>
  <div>
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="收到的澄清" name="receive">
          <detail ref="form_receive" v-bind="formInit.receive" noborder>
          </detail>
        </el-tab-pane>
        <el-tab-pane label="已回复采购企业的澄清" name="reply">
          <detail ref="form_reply" v-bind="formInit.reply" noborder>
          </detail>
        </el-tab-pane>
        <buttons-operator type="top"
                          algin="left"
                          :buttons="[{label:'搜索',type:'primary',click:search},
                          {label:'重置',type:'info',click:reset}]"/>
      </el-tabs>
    </el-card>
    <buttons-operator type="top"
                      algin="right"
                      :buttons="[{label:'回复澄清',type:'primary',click:reply},{label:'导出',type:'primary',click:search}]"/>
    <IvTable v-if="activeName==='receive'" :key="1" ref="table_receive" v-bind="table.receive"/>
    <IvTable v-if="activeName==='reply'" :key="2" ref="table_reply" v-bind="table.reply"/>
  </div>
</template>

<script>
  import IvTable from '@/components/IvTable.vue'
  import detail from '@/components/Detail.vue'
  import buttonsOperator from '@/components/ButtonsOperator.vue'

  export default {
    components: {
      IvTable,
      detail,
      buttonsOperator
    },
    data() {
      return {
        //当前激活的tab名称
        activeName: 'receive',
        //展开收起标志
        flag: false,
        //发出澄清搜索条件表单数据
        form: {
          receive: {
            inquiryName: '',
            clarificationContent: '',
            clarificationDateStart: '',
            clarificationDateEnd: ''
          },
          reply: {
            inquiryName: '',
            clarificationContent: '',
            replyContents: '',
            repliers: '',
            clarificationDateStart: '',
            clarificationDateEnd: ''

          }
        },
        //table初始化数据
        table: {
          receive: {
            url: this.appConfig.api('inquiry/others/clarification/searchSupReceiverPurClarificationReviewList'),
            pageNo: 1,
            height: 400,
            queryParam: function (param) {
              console.log('queryParam:', param)
              return _.assign({}, param);
            },
            responseHandler: function (val) {
              console.log('responseHandler:', val)
              return val;
            },
            columns: [
              {
                type: 'selection',
                align: 'center',
                width: 60

              },
              {
                title: '序号',
                type: 'index',
                align: 'center',
                width: 80
              },
              {
                title: '询价单名称',
                key: 'inquiryName',
                align: 'center',
                width: 120
              },
              {
                title: '澄清内容',
                key: 'clarificationContent',
                align: 'center',
                render: (h, {row, column}) => {
                  return h('a', {
                      on: {
                        click: () => {
                          this.gotoDetail(row.clarificationId)
                        }
                      }
                    },
                    row.clarificationContent);
                }
              },
              {
                title: '澄清时间',
                key: 'clarificationTime',
                align: 'center',
                width: 200,
                render: (h, {row, column}) => {
                  return this.moment(row.clarificationTime).format("YYYY-MM-DD HH:mm:ss");
                }
              },
              {
                title: '澄清附件数量',
                key: 'clarificationAttachNum',
                align: 'center',
                width: 140
              },
              {
                title: '询价单节点状态',
                align: 'center',
                width: 120
              }
            ]
          },
          reply: {
            url: this.appConfig.api('inquiry/others/clarification/searchSupReceiverPurClarificationReplyList'),
            pageNo: 1,
            height: 400,
            queryParam: function (param) {
              console.log('queryParam:', param)
              return _.assign({}, param);
            },
            responseHandler: function (val) {
              console.log('responseHandler:', val)
              return val;
            },
            columns: [
              {
                type: 'selection',
                align: 'center',
                width: 60
              },
              {
                align: 'center',
                title: '序号',
                type: 'index',
                width: 80
              },
              {
                title: '询价单名称',
                key: 'inquiryName',
                align: 'center',
                width: 120,
                render: (h, {row, column}) => {
                  return row.inquiryName;
                }
              },
              {
                title: '澄清内容',
                key: 'clarificationContent',
                align: 'center',
                width: 220,
                render: (h, {row, column}) => {
                  return h('a', {
                      on: {
                        click: () => {
                          this.gotoDetail(row.clarificationId)
                        }
                      }
                    },
                    row.clarificationContent);
                }
              },
              {

                title: '澄清时间',
                key: 'clarificationTime',
                align: 'center',
                width: 160,
                render: (h, {row, column}) => {
                  return this.moment(row.clarificationTime).format("YYYY-MM-DD HH:mm:ss");
                }
              },
              {
                title: '澄清附件数量',
                key: 'clarificationAttachNum',
                align: 'center',
                width: 120
              },
              {
                title: '回复内容',
                key: 'replyContent',
                align: 'center',
                width: 120
              },
              {
                title: '回复时间',
                key: 'replyTime',
                align: 'center',
                width: 160,
                render: (h, {row, column}) => {
                  return this.moment(row.replyTime).format("YYYY-MM-DD HH:mm:ss");
                }
              },
              {
                title: '回复人',
                key: 'replier',
                align: 'center',
                width: 80,
              },
            ],
          }
        }
      }
    },
    computed: {
      formInit() {
        return {
          //发出澄清表单初始化数据
          receive: {
            contents: [
              {
                data: this.form.receive,
                labelWidth: '100px',
                inputWidth: '200px',
                inline: true,
                children: [
                  {
                    type: 'input',
                    label: '询价单名称',
                    placeholder: '模糊查询,可用个逗号隔开',
                    prop: 'inquiryName',
                  },
                  {
                    type: 'input',
                    label: '澄清内容',
                    placeholder: '模糊查询,可用个逗号隔开',
                    prop: 'clarificationContent',
                  },
                  {
                    type: 'dateTimePicker',
                    label: '澄清开始日期',
                    placeholder: '请输入开始时间',
                    prop: 'clarificationDateStart',
                    extendParam: {
                      editable: false,
                      format: 'yyyy-mm-dd hh:mm:ss'
                    }
                  },
                  {
                    type: 'dateTimePicker',
                    label: '澄清结束日期',
                    placeholder: '请输入结束时间',
                    prop: 'clarificationDateEnd',
                    extendParam: {
                      editable: false,
                      format: 'yyyy-mm-dd hh:mm:ss'
                    }
                  },
                ]
              }
            ]
          },
          //收到澄清表单初始化数据
          reply: {
            contents: [
              {
                data: this.form.reply,
                labelWidth: '100px',
                titleWidth: '100px',
                inputWidth: '200px',
                inline: true,
                children: [
                  {
                    type: 'input',
                    label: '询价单名称',
                    placeholder: '模糊查询,可用个逗号隔开',
                    prop: 'inquiryName',
                  },
                  {
                    type: 'input',
                    label: '澄清内容',
                    placeholder: '模糊查询,可用个逗号隔开',
                    prop: 'clarificationContent',
                  },
                  {
                    type: 'input',
                    label: '回复内容',
                    placeholder: '模糊查询,可用个逗号隔开',
                    prop: 'replyContents',
                  },
                  {
                    type: 'input',
                    label: '回复人',
                    placeholder: '模糊查询,可用个逗号隔开',
                    prop: 'repliers'
                  },
                  {
                    type: 'dateTimePicker',
                    label: '澄清开始日期',
                    placeholder: '请输入开始时间',
                    prop: 'clarificationDateStart',
                    extendParam: {
                      editable: false,
                      format: 'yyyy-mm-dd hh:mm:ss'
                    }
                  },
                  {
                    type: 'dateTimePicker',
                    label: '澄清结束日期',
                    placeholder: '请输入结束时间',
                    prop: 'clarificationDateEnd',
                    extendParam: {
                      editable: false,
                      format: 'yyyy-mm-dd hh:mm:ss'
                    }
                  }
                ]
              }
            ]
          }
        }
      }
    },
    watch: {
      activeName(val, oldVal) {
        this.form[oldVal] = {}
      }
    },
    methods: {
      //搜索
      search() {
        let searchData = this.form[this.activeName];
        searchData.pageNo = 1;
        this.$refs['table_' + this.activeName].query(searchData);
      },
      //重置
      reset() {
        //因为detail组件可以包含多个表单,所以返回的的是表单数组forms
        this.$refs['form_' + this.activeName].forms[0].resetFields();
      },
      //回复
      reply() {
        this.$router.push({name: 'clarifyOfferEdit'})
      },
      gotoDetail(id) {
        if (this.activeName === 'receive') {
          this.$router.push({name: 'clarifyReviewDetailReceive', params: {id: id}});
        } else {
          this.$router.push({name: 'clarifyReviewDetailReply', params: {id: id}});
        }
      }
    }
  }
</script>

<style scoped>
  el-card {
    border: none;
  }
</style>

