<template>
  <div>
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="待报价" name="offering">
        </el-tab-pane>
        <el-tab-pane label="已报价" name="offeried">

        </el-tab-pane>
      </el-tabs>
      <detail ref="form" v-bind="formInit" noborder>
        <buttons-operator type="top"
                          algin="left"
                          :switchFlag.sync="flag"
                          :buttons="[{label:'查询',type:'primary',click:search},
                          {label:'重置',type:'info',click:reset},{type:'switch'}]"/>
      </detail>


    </el-card>
    <buttons-operator v-if="activeName==='offering'" type="top"
                      algin="right"
                      :buttons="[{label:'发起澄清',type:'primary',click:createClarify},{label:'导出',type:'primary',click:exportDoc}]"/>
    <buttons-operator v-if="activeName==='offeried'" type="top"
                      algin="right"
                      :buttons="[{label:'发起澄清',type:'primary',click:createClarify},{label:'撤回',type:'primary',click:revoke},{label:'导出',type:'primary',click:exportDoc}]"/>

    <IvTable ref="table" v-bind="table" @selectionChange="selectionChange" @pageChange="pageChange"/>
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
        flag: false,
        //table选中项集合
        selections: [],
        //当前激活的tab名称
        activeName: this.$route.query.tab == 2 ? 'offeried' : 'offering',
        options: [],
        //搜索条件表单数据
        form: {
          inquiryName: '',
          inquiryCode: '',
          professionalOrgId: '',
          quoteEndDateStart: '',
          quoteEndDateEnd: '',
          publishTimeStart: '',
          publishTimeEnd: ''
        },
      }
    },
    computed: {
      status() {
        return this.activeName === 'offering' ? 0 : 1
      },
      pageSize() {
        return this.$refs.table.m_pageSize;
      },
      pageNo() {
        return this.$refs.table.m_pageNo;
      },
      formInit() {
        return {
          contents: [
            {
              data: this.form,
              labelWidth: '100px',
              inputWidth: '200px',
              inline: true,
              children: [
                {
                  type: 'input',
                  label: '询价单名称',
                  placeholder: '请输入询价单名称',
                  prop: 'inquiryName',
                },
                {
                  type: 'input',
                  label: '销售编号',
                  placeholder: '请输入销售编号',
                  prop: 'inquiryCode',
                },
                {
                  type: 'select',
                  label: '采购机构',
                  placeholder: '请选择',
                  prop: 'professionalOrgId',
                  extendParam: {
                    remote: true,
                    filterable: true,
                    remoteMethod: this.queryProfessionalOrg,
                    options: this.options
                  }
                },
                {
                  type: 'dateTimePicker',
                  label: '报价开始日期',
                  placeholder: '请输入开始时间',
                  prop: 'quoteEndDateStart',
                  extendParam: {
                    editable: false,
                    format: 'yyyy-MM-dd HH:mm:ss'
                  }
                },
                {
                  type: 'dateTimePicker',
                  label: '报价结束日期',
                  placeholder: '请输入结束时间',
                  prop: 'quoteEndDateEnd',
                  extendParam: {
                    editable: false,
                    format: 'yyyy-MM-dd HH:mm:ss'
                  }
                },
                {
                  type: 'dateTimePicker',
                  label: '发布开始日期',
                  placeholder: '请输入开始时间',
                  prop: 'publishTimeStart',
                  switchFlag: this.flag,
                  extendParam: {
                    editable: false,
                    format: 'yyyy-MM-dd HH:mm:ss'
                  }
                },
                {
                  type: 'dateTimePicker',
                  label: '发布结束日期',
                  placeholder: '请输入结束时间',
                  prop: 'publishTimeEnd',
                  switchFlag: this.flag,
                  extendParam: {
                    editable: false,
                    format: 'yyyy-MM-dd HH:mm:ss'
                  }
                },
              ]
            }
          ]
        }
      },
      table() {
        return {
          url: this.appConfig.api('inquiry/quote/qryIqrBiddingList'),
          pageNo: 1,
          height: 400,
          queryParam: (param) => {
            console.log('queryParam:', param)
            console.log('this.activeName', this.activeName)
            return _.assign({status: this.status}, param);
          },
          responseHandler: (val) => {
            console.log('responseHandler:', val)
            return val;
          },
          columns: [
            {
              type: 'selection',
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
              width: 100,
              render: (h, {row, column}) => {
                return h('a', {
                    on: {
                      click: () => {
                        this.gotoDetail(row)
                      }
                    }
                  },
                  row.inquiryName,
                );
              }
            },
            {
              title: '销售编号',
              key: 'inquiryCode',
              align: 'center',
            },
            {
              title: '发布日期',
              key: 'inquiryPublishDate',
              align: 'center',
              width: 180,
              render: (h, {row, column}) => {
                return h('div', row.inquiryPublishDate === (null || '') ? '-' : this.moment(row.inquiryPublishDate).format("YYYY-MM-DD HH:mm:ss"));
              }
            },
            {
              title: '报价截止日期',
              key: 'quoteEndDate',
              align: 'center',
              width: 180,
              render: (h, {row, column}) => {
                return h('div', row.quoteEndDate === (null || '') ? '-' : this.moment(row.quoteEndDate).format("YYYY-MM-DD HH:mm:ss"));
              }
            },
            {
              title: '采购机构',
              key: 'professionalOrgName',
              align: 'center',
            },
            {
              title: '采购类别',
              key: 'purchaseCategoryName'
            },
            {
              title: '状态',
              key: 'statusName',
            },
          ]
        }
      },
    },
    watch: {
      //监听tabs切换
      activeName: function (newVal, oldVal) {
        this.$refs.form.forms[0].resetFields();
        this.$nextTick(this.search)
      }
    },
    methods: {
      selectionChange(val) {
        this.selections = val;
      },
      pageChange(pageNo, pageSize) {
        this.pageNo = pageNo;
        this.pageSize = pageSize;
      },
      //FIXME 搜索
      search() {
        this.$refs.table.query(this.form);
      },
      refresh() {
        this.$refs.table.query();
      },
      //FIXME 重置
      reset() {
        //因为detail组件可以包含多个表单,所以返回的的是表单数组forms
        this.$refs.form.forms[0].resetFields();
        this.search();
      },
      //FIXME 远程请求采购机构select数据
      queryProfessionalOrg(param) {
        if (!param) {
          param = ''
        }
        this.axios.post(this.appConfig.api('testQuerySelect'), this.form)
          .then((response) => {
            console.log(response);
            let list = response;

            this.options = list.filter(item => {
              return item.label.toLowerCase()
                .indexOf(param.toLowerCase()) > -1;
            });
          })
      },
      //FIXME 发起澄清
      createClarify() {
        if (this.selections.length === 0) {
          this.$alert(this.util.lang.alertSelectionNeed, '提示');
          return;
        }
        ;
        if (this.selections.length > 1) {
          this.$alert(this.util.lang.alertSelectionOnlyOne, '提示');
          return;
        }
        ;
        this.$router.push({
          name: 'clarifyOfferEdit',
          query: {
            inquiryId: this.selections[0].inquiryId,
            inquiryName: this.selections[0].inquiryName,
            iqrSeq: this.selections[0].iqrSeq,
            purchaseCategory: this.selections[0].purchaseCategory
          }
        });
      },
      //FIXME 撤回
      revoke() {
        if (this.selections.length === 0) {
          this.$alert(this.util.lang.alertSelectionNeed, '提示');
          return;
        }
        ;
        if (this.selections.length > 1) {
          this.$alert(this.util.lang.alertSelectionOnlyOne, '提示');
          return;
        }
        ;
        this.axios.post(this.appConfig.api('inquiry/quote/iqrQuoteWithdraw'), {quotationId: this.selections[0].quotationId})
          .then((response) => {
            this.refresh();
          })
      },
      //FIXME 导出
      exportDoc() {
        //合并入参
        let assign = _.assign({pageNo: this.pageNo, pageSize: this.pageSize, status: this.status}, this.form)
        //转换参数对象为&连接字符串
        let params = this.util.parseToGet(assign);
        window.open(this.appConfig.api(`inquiry/quote/qryIqrQuoteListExport?${params}`), '_blank')
      },
      //FIXME 详情跳转
      gotoDetail(row) {
        this.$router.push({
          name: 'priceOfferDetail',
          query: {backPage: 'priceBindIndex',sumbitPage:'priceBindIndex',tab:this.activeName==='offeried'?2:1},
          params: {status: this.status, type: row.purchaseCategory, id: row.quotationId}
        });
      }
    },
  }
</script>

<style scoped>

</style>

