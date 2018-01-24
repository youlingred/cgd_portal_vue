<template>
  <div>
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="收到的澄清" name="receive">
          <detail ref="form_receive" v-bind="formInit.receive" noborder>
            <buttons-operator type="top"
                              algin="left"
                              :buttons="[{label:'搜索',type:'primary',click:search},
                          {label:'重置',type:'info',click:reset}]"/>
          </detail>
        </el-tab-pane>
        <el-tab-pane label="已回复采购企业的澄清" name="reply">
          <detail ref="form_reply" v-bind="formInit.reply"></detail>

        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-header ></el-header>
    <buttons-operator type="top"
                      algin="right"
                      :buttons="[{label:'回复澄清',type:'primary',click:reply},{label:'导出',type:'primary',click:search}]"/>
    <cg-table v-show="activeName==='receive'" ref="table_receive" v-bind="table.receive" @cell-click="cellClickHandler"/>
    <cg-table v-show="activeName==='reply'" ref="table_reply" v-bind="table.reply" @cell-click="cellClickHandler"/>
  </div>
</template>

<script>
  import CgTable from '@/components/CgTable.vue'
  import detail from '@/components/Detail.vue'
  import buttonsOperator from '@/components/ButtonsOperator.vue'

  export default {
    components: {
      CgTable,
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
            planName: '',
            publishUser: '',
            project: '',
            status: '',
            publishDate1: '',
            publishDate2: ''
          },
          reply: {
            name: '',
            project: '',
            status: ''
          }
        },
        //table初始化数据
        table:{
          receive:{
            url: this.appConfig.api('testDylyListPage'),
            pageNo: 1,
            height: 400,
            queryParam: function (param) {
              console.log('queryParam:', param)
              return _.assign({test: 1}, param);
            },
            responseHandler: function (val) {
              console.log('responseHandler:', val)
              return val;
            },
            columns: [
              {
                type: 'selection',
              },
              {
                label: '序号',
                type: 'index',
                width: 60
              },
              {
                label: '询价单名称',
                prop: 'planName',
                width: '100',
                formatter: (row, column, value) => {
                  return value;
                }
              },
              {
                label: '澄清内容',
                prop: 'publishUser'
              },
              {
                label: '澄清附件数量',
                prop: 'publishUser'
              },
              {
                label: '询价单节点状态',
                prop: 'publishUser',
                formatter: (row, column, value) => {
                  switch(value){
                    case 1:
                      return '';
                    default:
                      return ''
                  }
                }
              },
              {
                label: '回复内容',
                prop: 'publishUser'
              },
              {
                label: '回复时间',
                prop: 'publishDate',
                width: 180,
                formatter: (row, column, value) => {
                  return this.moment(value).format("YYYY-MM-DD HH:mm:ss");
                }
              },
              {
                label: '回复人',
                prop: 'publishUser'
              }
            ]
          },
          reply:{
            url: this.appConfig.api('testDylyListPage'),
            pageNo: 1,
            height: 400,
            queryParam: function (param) {
              console.log('queryParam:', param)
              return _.assign({test: 1}, param);
            },
            responseHandler: function (val) {
              console.log('responseHandler:', val)
              return val;
            },
            columns: [
              {
                type: 'selection',
              },
              {
                label: '序号',
                type: 'index',
                width: 60
              },
              {
                label: '询价单名称',
                prop: 'planName',
                formatter: (row, column, value) => {
                  return value;
                }
              },
              {
                label: '澄清内容',
                prop: 'publishUser'
              },
              {

                label: '澄清时间',
                prop: 'publishDate',
                width: 180,
                formatter: (row, column, value) => {
                  return this.moment(value).format("YYYY-MM-DD HH:mm:ss");
                }
              },
              {
                label: '澄清附件数量',
                prop: 'publishUser',
                width: 120
              },
              {
                label: '回复内容',
                prop: 'publishUser'
              },
              {
                label: '回复时间',
                prop: 'publishDate',
                width: 150,
                formatter: (row, column, value) => {
                  return this.moment(value).format("YYYY-MM-DD HH:mm:ss");
                }
              },
              {
                label: '回复人',
                prop: 'publishUser'
              },
            ],
          }
        }
      }
    },
    computed:{
      formInit(){
        return {
          //发出澄清表单初始化数据
          receive:{
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
                    prop: 'planName',
                  },
                  {
                    type: 'input',
                    label: '澄清内容',
                    placeholder: '模糊查询,可用个逗号隔开',
                    prop: 'publishUser',
                  },
                  {
                    type: 'dateTimePicker',
                    label: '澄清开始日期',
                    placeholder: '请输入开始时间',
                    prop: 'publishDate1',
                    extendParam: {
                      editable: false,
                      format: 'yyyy-mm-dd hh:mm:ss'
                    }
                  },
                  {
                    type: 'dateTimePicker',
                    label: '澄清结束日期',
                    placeholder: '请输入结束时间',
                    prop: 'publishDate2',
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
          reply:{
            contents: [
              {
                data: this.form.reply,
                labelWidth: '100px',
                inputWidth: '200px',
                inline: true,
                children: [
                  {
                    type: 'input',
                    label: '询价单名称',
                    placeholder: '模糊查询,可用个逗号隔开',
                    prop: 'planName',
                  },
                  {
                    type: 'input',
                    label: '澄清内容',
                    placeholder: '模糊查询,可用个逗号隔开',
                    prop: 'publishUser',
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
                    type: 'dateTimePicker',
                    label: '澄清开始日期',
                    placeholder: '请输入开始时间',
                    prop: 'publishDate1',
                    extendParam: {
                      editable: false,
                      format: 'yyyy-mm-dd hh:mm:ss'
                    }
                  },
                  {
                    type: 'dateTimePicker',
                    label: '澄清结束日期',
                    placeholder: '请输入结束时间',
                    prop: 'publishDate2',
                    extendParam: {
                      editable: false,
                      format: 'yyyy-mm-dd hh:mm:ss'
                    }
                  },
                  {
                    type: 'dateTimePicker',
                    label: '回复开始日期',
                    placeholder: '请输入开始时间',
                    prop: 'publishDate1',
                    switchFlag: this.flag,
                    extendParam: {
                      editable: false,
                      format: 'yyyy-mm-dd hh:mm:ss'
                    }
                  },
                  {
                    type: 'dateTimePicker',
                    label: '回复结束日期',
                    placeholder: '请输入结束时间',
                    prop: 'publishDate2',
                    switchFlag: this.flag,
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
    methods: {
      //搜索
      search() {
        this.$refs['table_'+this.activeName].query(this.form[this.activeName])
      },
      //重置
      reset() {
        //因为detail组件可以包含多个表单,所以返回的的是表单数组forms
        this.$refs['form_'+this.activeName].forms[0].resetFields();
      },
      //回复
      reply() {
        this.$router.push({name: 'clarifyOfferEdit'})
      },
      cellClickHandler(row, column, cell, event) {
        console.log(row, column, cell, event);
        console.log(this.activeName);
        if (this.activeName === 'receive') {
          this.$router.push({name: 'clarifyReviewDetailReceive'});
        } else {
          this.$router.push({name: 'clarifyReviewDetailreply'});
        }
      }
    }
  }
</script>

<style scoped>
  el-card{
    border:none;
  }
</style>

