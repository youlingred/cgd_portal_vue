<template>
  <div>
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="待处理" name="doing">
          <detail ref="form_doing" v-bind="formInit.doing" noborder>
            <buttons-operator type="top"
                              algin="left"
                              :switchFlag.sync="flag"
                              :buttons="[{label:'搜索',type:'primary',click:search},
                          {label:'重置',type:'info',click:reset},{type:'switch'},]"/>
          </detail>
        </el-tab-pane>
        <el-tab-pane label="已处理" name="done">
          <detail ref="form_done" v-bind="formInit.done" noborder>
            <buttons-operator type="top"
                              algin="left"
                              :switchFlag.sync="flagtwo"
                              :buttons="[{label:'搜索',type:'primary',click:search},
                          {label:'重置',type:'info',click:reset},
                          {type:'switch'},]"/>
          </detail>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <buttons-operator v-if="activeName==='doing'" type="top"
                      algin="right"
                      :buttons="[{label:'确认',type:'primary',click:confirm},
                      {label:'拒绝成交',type:'primary',click:refuse},
                      {label:'生成文档',type:'primary',click:buttonFunc}]"/>
    <IvTable v-if="activeName==='doing'" key="1" ref="table_doing" v-bind="table.doing"
             @selectionChange="checkSelectionChange"/>
    <IvTable v-if="activeName==='done'" key="2" ref="table_done" v-bind="table.done"
             @selectionChange="checkSelectionChange"/>
  </div>
</template>
<script>
  import detail from '@/components/Detail.vue'
  import buttonsOperator from '@/components/ButtonsOperator.vue'
  import IvTable from '@/components/IvTable.vue'

  export default {
    components: {
      detail,
      buttonsOperator,
      IvTable,
    },
    data() {
      return {
        //复选框选中的值
        selectDatas: [],
        //1采购,2销售
        type: 0,
        //当前激活的tab名称
        activeName: 'doing',
        //展开收起标志
        flag: false,
        //展开收起标志
        flagtwo: false,
        //发出澄清搜索条件表单数据
        //表单数据
        form: {
          doing: {
            status: '',
            dealNoticeCode: '',
            dealNoticeName: '',
            purchaseCategory: '',
            supplierName: '',
            paymentNoticeStatus: '',
            billCreateTimeStart: '',
            billCreateTimeEnd: ''
          },
          done: {
            status: '',
            dealNoticeCode: '',
            dealNoticeName: '',
            purchaseCategory: '',
            supplierName: '',
            paymentNoticeStatus: '',
            billCreateTimeStart: '',
            billCreateTimeEnd: ''
          },
        },
        table: {
          doing: {
            height: 400,
            url: this.appConfig.api('inquiry/exe/dealnote/querydealnoticelistforsupplier'),
            pageNo: 1,
            queryParam: function (param) {
              console.log('queryParam:', param)
              return _.assign({tabId: 1, isSale: 1}, param);
            },
            responseHandler: function (val) {
              console.log('responseHandler:', val)
              return val;
            },
            columns: [
              {
                type: 'selection',
                align: 'center',
                width: 80
              },
              {
                title: '序号',
                type: 'index',
                align: 'center',
                width: 80
              },
              {
                title: '状态',
                align: 'center',
                width: 150,
                key: 'statusName'
              },
              {
                title: '成交通知书名称',
                align: 'center',
                width: 200,
                key: 'dealNoticeName',
                render: (h, {row, column}) => {
                  return h('a', {
                      on: {
                        click: () => {
                          this.gotoDetail(row.dealNoticeId, row.purchaseCategory)
                        }
                      }
                    },
                    row.dealNoticeName);
                }
              },
              {
                title: '成交通知书编号',
                align: 'center',
                width: 200,
                key: 'dealNoticeCode'
              },
              {
                title: '采购金额',
                align: 'center',
                width: 120,
                key: 'purchaseAmount',
                render: (h, {row, column, index}) => {
                  return h('span', this.accounting.formatMoney(row.purchaseAmount, '', 2));
                }
              },
              {
                title: '缴费通知发送状态',
                align: 'center',
                width: 150,
                key: 'paymentNoticeSendStatusName'
              },
              {
                title: '供应商',
                align: 'center',
                width: 200,
                key: 'supplierName'
              },
              {
                title: '制单日期',
                align: 'center',
                width: 130,
                key: 'billCreateTime',
                render: (h, {row, column}) => {
                  return h('div',row.billCreateTime===(null||'')?'-':this.moment(row.billCreateTime).format("YYYY-MM-DD"));
                }
              },
              {
                title: '制单人',
                align: 'center',
                width: 130,
                key: 'billCreateUserName'
              }
            ]
          },
          done: {
            url: this.appConfig.api('inquiry/exe/dealnote/querydealnoticelistforsupplier'),
            height: 400,
            pageNo: 1,
            queryParam: function (param) {
              console.log('queryParam:', param)
              return _.assign({tabId: 2, isSale: 1}, param);
            },
            responseHandler: function (val) {
              console.log('responseHandler:', val)
              return val;
            },
            columns: [
              {
                type: 'selection',
                align: 'center',
                width: 80
              },
              {
                title: '序号',
                type: 'index',
                align: 'center',
                width: 80
              },
              {
                title: '状态',
                align: 'center',
                width: 150,
                key: 'statusName'
              },
              {
                title: '成交通知书名称',
                align: 'center',
                width: 160,
                key: 'dealNoticeName',
                render: (h, {row, column}) => {
                  return h('a', {
                      on: {
                        click: () => {
                          this.gotoDetail(row.dealNoticeId, row.purchaseCategory)
                        }
                      }
                    },
                    row.dealNoticeName);
                }
              },
              {
                title: '成交通知书编号',
                align: 'center',
                width: 150,
                key: 'dealNoticeCode'
              },
              {
                title: '采购金额',
                align: 'center',
                width: 120,
                key: 'purchaseAmount'
              },
              {
                title: '缴费通知发送状态',
                align: 'center',
                width: 150,
                key: 'paymentNoticeSendStatusName'
              },
              {
                title: '供应商',
                align: 'center',
                width: 150,
                key: 'supplierName'
              },
              {
                title: '制单日期',
                align: 'center',
                width: 130,
                key: 'billCreateTime',
                render: (h, {row, column}) => {
                  return h('div',row.billCreateTime===(null||'')?'-':this.moment(row.billCreateTime).format("YYYY-MM-DD"));
                }
              },
              {
                title: '制单人',
                align: 'center',
                width: 130,
                key: 'billCreateUserName'
              }
            ]
          }
        }
      };
    },
    computed: {
      formInit() {
        return {
          doing: {
            contents: [
              {
                data: this.form.doing,
                labelWidth: '150px',
                inputWidth: '200px',
                inline: true,
                children: [
                  {
                    type: 'select',
                    label: '状态',
                    placeholder: '请选择',
                    prop: 'status',
                    extendParam: {
                      options: [
                        {
                          label: '全部',
                          value: ''
                        },
                        {
                          label: '待发放成交通知',
                          value: 1
                        },
                        {
                          label: '供应商确认中',
                          value: 2
                        },
                        {
                          label: '拒绝成交',
                          value: 3
                        },
                        {
                          label: '采购完成',
                          value: 4
                        },
                      ]
                    }
                  },
                  {
                    type: 'input',
                    label: '成交通知书编号',
                    placeholder: '请输入',
                    prop: 'dealNoticeCode',
                  },
                  {
                    type: 'input',
                    label: '成交通知书名称',
                    placeholder: '请输入',
                    prop: 'dealNoticeName',
                  },
                  {
                    type: 'select',
                    label: '缴费通知发送状态',
                    placeholder: '请选择',
                    prop: 'paymentNoticeStatus',
                    extendParam: {
                      options: [
                        {
                          label: '全部',
                          value: ''
                        },
                        {
                          label: '未发送',
                          value: 1
                        },
                        {
                          label: '已发送',
                          value: 2
                        },
                        {
                          label: '已缴费',
                          value: 3
                        },
                        {
                          label: '已作废',
                          value: 4
                        }
                      ]
                    }
                  },
                  {
                    type: 'dateTimePicker',
                    label: '制单开始日期',
                    placeholder: '请输入开始时间',
                    prop: 'billCreateTimeStart',
                    switchFlag: this.flag,
                    extendParam: {
                      editable: false,
                      valueFormat: 'yyyy-MM-dd HH:mm:ss',
                      format: 'yyyy-MM-dd HH:mm:ss'
                    }
                  },
                  {
                    type: 'dateTimePicker',
                    label: '制单结束日期',
                    placeholder: '请输入结束时间',
                    prop: 'billCreateTimeEnd',
                    switchFlag: this.flag,
                    extendParam: {
                      editable: false,
                      valueFormat: 'yyyy-MM-dd HH:mm:ss',
                      format: 'yyyy-MM-dd HH:mm:ss',
                    }
                  },
                ]
              }
            ]
          },
          done: {
            contents: [
              {
                data: this.form.done,
                labelWidth: '150px',
                inputWidth: '200px',
                inline: true,
                children: [
                  {
                    type: 'select',
                    label: '状态',
                    placeholder: '请选择',
                    prop: 'status',
                    extendParam: {
                      options: [
                        {
                          label: '全部',
                          value: ''
                        },
                        {
                          label: '待发放成交通知',
                          value: 1
                        },
                        {
                          label: '供应商确认中',
                          value: 2
                        },
                        {
                          label: '拒绝成交',
                          value: 3
                        },
                        {
                          label: '采购完成',
                          value: 4
                        },
                      ]
                    }
                  },
                  {
                    type: 'input',
                    label: '成交通知书编号',
                    placeholder: '请输入',
                    prop: 'dealNoticeCode',
                  },
                  {
                    type: 'input',
                    label: '成交通知书名称',
                    placeholder: '请输入',
                    prop: 'dealNoticeName',
                  },
                  {
                    type: 'select',
                    label: '采购类别',
                    placeholder: '请选择',
                    prop: 'purchaseCategory',
                    extendParam: {
                      options: [
                        {
                          label: '全部',
                          value: ''
                        },
                        {
                          label: '物资类',
                          value: 1
                        },
                        {
                          label: '施工类',
                          value: 2
                        },
                        {
                          label: '服务类',
                          value: 3
                        }
                      ]
                    }
                  },
                  {
                    type: 'input',
                    label: '供应商',
                    placeholder: '请输入',
                    prop: 'supplierName',
                  },
                  {
                    type: 'select',
                    label: '缴费通知发送状态',
                    placeholder: '请选择',
                    prop: 'paymentNoticeStatus',
                    extendParam: {
                      options: [
                        {
                          label: '全部',
                          value: ''
                        },
                        {
                          label: '未发送',
                          value: 1
                        },
                        {
                          label: '已发送',
                          value: 2
                        },
                        {
                          label: '已缴费',
                          value: 3
                        },
                        {
                          label: '已作废',
                          value: 4
                        }
                      ]
                    }
                  },
                  {
                    type: 'dateTimePicker',
                    label: '制单开始日期',
                    placeholder: '请输入开始时间',
                    prop: 'billCreateTimeStart',
                    switchFlag: this.flagtwo,
                    extendParam: {
                      editable: false,
                      valueFormat: 'yyyy-MM-dd HH:mm:ss',
                      format: 'yyyy-MM-dd HH:mm:ss'
                    }
                  },
                  {
                    type: 'dateTimePicker',
                    label: '制单结束日期',
                    placeholder: '请输入结束时间',
                    prop: 'billCreateTimeEnd',
                    switchFlag: this.flagtwo,
                    extendParam: {
                      editable: false,
                      valueFormat: 'yyyy-MM-dd HH:mm:ss',
                      format: 'yyyy-MM-dd HH:mm:ss',
                    }
                  },
                ]
              }
            ]
          }
        }
      }
    },
    methods: {
      search() {
        this.$refs['table_' + this.activeName].query(this.form[this.activeName]);
      },
      reset() {
        this.$refs['form_' + this.activeName].forms[0].resetFields();
      },
      buttonFunc(type) {

      },
      confirm() {
        if (this.selectDatas.length == 1) {
          this.axios.post(this.appConfig.api('inquiry/exe/dealnote/confirmDealNoticeListForSupplier'), {dealNoticeId: this.selectDatas[0].dealNoticeId})
            .then((data) => {
              this.$message.success("成交通知书确认成功！");
              this.search();
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          this.$message.error("请选择一条成交通知书");
        }
      },
      refuse() {
        if (this.selectDatas.length == 1) {
          this.$confirm('请确认是否拒绝成交？', '提示', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.axios.post(this.appConfig.api('inquiry/exe/dealnote/refuseDealNoticeListForSupplier'), {dealNoticeId: this.selectDatas[0].dealNoticeId})
              .then((data) => {
                this.search();
              })
              .catch(function (error) {
                console.log(error);
              });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });
        } else {
          this.$message.error("请选择一条成交通知书");
        }
      },
      gotoDetail(id) {
        this.$router.push({name: 'saleDealnoticeDetails', params: {id: id}});
      },
      checkSelectionChange(val) {
        this.selectDatas = val;
      }
    }
  };
</script>
