<template>
  <div>
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="发出的澄清" name="send">
          <detail ref="form_send" v-bind="formInit.send" noborder>
            <buttons-operator type="top"
                              algin="left"
                              :buttons="[{label:'搜索',type:'primary',click:search},
                          {label:'重置',type:'info',click:reset}]"/>
          </detail>
        </el-tab-pane>
        <el-tab-pane label="收到的澄清" name="receive">
          <detail ref="form_receive" v-bind="formInit.receive" noborder>
            <buttons-operator type="top"
                              algin="left"
                              :switchFlag.sync="flag"
                              :buttons="[{label:'搜索',type:'primary',click:search},
                          {label:'重置',type:'info',click:reset},
                          {type:'switch'},]"/>
          </detail>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <buttons-operator v-if="activeName==='send'" type="top"
                      algin="right"
                      :buttons="[{label:'新增',type:'primary',click:add},{label:'导出',type:'primary',click:exportHandle}]"/>
    <IvTable v-if="activeName==='send'" ref="table_send" v-bind="table.send"/>

    <buttons-operator v-if="activeName==='receive'" type="top"
                      algin="right"
                      :buttons="[{label:'导出',type:'primary',click:exportHandle}]"/>
    <IvTable v-if="activeName==='receive'" ref="table_receive" v-bind="table.receive"/>
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
        activeName: 'send',
        //展开收起标志
        flag: false,
        //发出澄清搜索条件表单数据
        form: {
          send: {
            planName: '',
            publishUser: '',
            project: '',
            status: '',
            publishDate1: '',
            publishDate2: ''
          },
          receive: {
            name: '',
            project: '',
            status: ''
          }
        },
        //table初始化数据
        table: {
          send: {
            height:400,
            url: this.appConfig.api('inquiry/others/clarification/searchSupPublishPurQuestionList'),
            pageNo: 1,
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
                width: 80
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
                width: 120,
                render: (h, {row, column}) => {
                  return h('a', {
                      on: {
                        click: ()=>{
                          this.gotoDetail(row.questionId)
                        }
                      }
                    },
                    row.inquiryName);
                }
              },
              {
                title: '澄清内容',
                align: 'center',
                width: 160,
                key: 'questionContent',
                render: (h, {row, column}) => {
                  return h('a', {
                      on: {
                        click: ()=>{
                          this.gotoDetail(row.questionId)
                        }
                      }
                    },
                    row.questionContent);
                }
              },
              {
                align: 'center',
                width: 200,
                title: '澄清时间',
                key: 'questionTime',
                render: (h, {row, column}) => {
                  return this.moment(row.questionTime).format("YYYY-MM-DD HH:mm:ss");
                }
              },
              {
                title: '澄清附件数量',
                align: 'center',
                width: 120,
                key: 'questionAttachmentNum'
              },
              {
                title: '接受澄清单位',
                align: 'center',
                key: 'publishUser'
              },
            ],
          },
          receive: {
            url: this.appConfig.api('inquiry/others/clarification/searchSupReceiverPurClarificationBeforeQuoteList'),
            height: 400,
            pageNo: 1,
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
                width: 80
              },
              {
                align: 'center',
                title: '序号',
                type: 'index',
                width: 80
              },
              {
                align: 'center',
                title: '发起澄清的采购企业',
                key: 'planName',
                width: 180,
                render: (h, {row, column}) => {
                  return row.planName;
                }
              },
              {
                align: 'center',
                title: '澄清时间',
                key: 'clarificationTime',
                width: 180,
                render: (h, {row, column}) => {
                  return this.moment(row.publishDate).format("YYYY-MM-DD HH:mm:ss");
                }
              },
              {
                align: 'center',
                title: '询价单名称',
                key: 'inquiryName',
                width: 180,
                render: (h, {row, column}) => {
                  return h('a', {
                      on: {
                        click: ()=>{
                          this.gotoDetail(row.clarificationId)
                        }
                      }
                    },
                    row.inquiryName);
                }
              },
              {
                align: 'center',
                title: '澄清主题',
                width: 120,
                key: 'clarificationContent',
                render: (h, {row, column}) => {
                  return h('a', {
                      on: {
                        click: ()=>{
                          this.gotoDetail(row.clarificationId)
                        }
                      }
                    },
                    row.clarificationContent);
                }
              },
              {
                align: 'center',
                title: '澄清附件数量',
                key: 'clarificationAttachNum',
              }
            ],
          }
        }
      }
    },
    computed: {
      formInit() {
        return {
          //发出澄清表单初始化数据
          send: {
            contents: [
              {
                data: this.form.send,
                labelWidth: '150px',
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
                    type: 'datePicker',
                    label: '澄清开始日期',
                    placeholder: '请输入开始时间',
                    prop: 'clarificationDateStart',
                    extendParam: {
                      editable: false,
                      format: 'yyyy-MM-dd',
                      valueFormat: "yyyy-MM-dd"
                    }
                  },
                  {
                    type: 'datePicker',
                    label: '澄清结束日期',
                    placeholder: '请输入结束时间',
                    prop: 'clarificationDateEnd',
                    extendParam: {
                      editable: false,
                      format: 'yyyy-MM-dd',
                      valueFormat: "yyyy-MM-dd"
                    }
                  },
                ]
              }
            ]
          },
          //收到澄清表单初始化数据
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
                    type: 'input',
                    label: '回复内容',
                    placeholder: '模糊查询,可用个逗号隔开',
                    prop: 'publishUser',
                  },
                  {
                    type: 'input',
                    label: '回复人',
                    placeholder: '模糊查询,可用个逗号隔开',
                    prop: 'publishUser'
                  },
                  {
                    type: 'datePicker',
                    label: '澄清开始日期',
                    placeholder: '请输入开始时间',
                    prop: 'clarificationDateStart',
                    extendParam: {
                      editable: false,
                      format: 'yyyy-MM-dd',
                      valueFormat: "yyyy-MM-dd"
                    }
                  },
                  {
                    type: 'datePicker',
                    label: '澄清结束日期',
                    placeholder: '请输入结束时间',
                    prop: 'clarificationDateEnd',
                    extendParam: {
                      editable: false,
                      format: 'yyyy-MM-dd',
                      valueFormat: "yyyy-MM-dd"
                    }
                  },
                  {
                    type: 'datePicker',
                    label: '回复开始日期',
                    placeholder: '请输入开始时间',
                    prop: 'publishDate1',
                    switchFlag: this.flag,
                    extendParam: {
                      editable: false,
                      format: 'yyyy-MM-dd',
                      valueFormat: "yyyy-MM-dd"
                    }
                  },
                  {
                    type: 'datePicker',
                    label: '回复结束日期',
                    placeholder: '请输入结束时间',
                    prop: 'publishDate2',
                    switchFlag: this.flag,
                    extendParam: {
                      editable: false,
                      format: 'yyyy-MM-dd',
                      valueFormat: "yyyy-MM-dd"
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
      activeName() {
        this.search()
      }
    },
    methods: {
      //搜索
      search() {
        let searchData=this.form[this.activeName];
        searchData.pageNo=1;
        // this.$refs['table_' + this.activeName].query(searchData)
      },
      //重置
      reset() {
        //因为detail组件可以包含多个表单,所以返回的的是表单数组forms
        this.$refs['form_' + this.activeName].forms[0].resetFields();
      },
      //新增
      add() {
        this.$router.push({name: 'clarifyOfferEdit'})
      },
      exportHandle(){
        let selection=this.$refs['table_' + this.activeName].selection;
      },
      gotoDetail(id) {
        if (this.activeName === 'send') {
          this.$router.push({name: 'clarifyOfferDetailSend', params: {id: id}});
        } else {
          this.$router.push({name: 'clarifyOfferDetailReceive', params: {id: id}});
        }
      }
    }
  }
</script>

<style scoped>

</style>

