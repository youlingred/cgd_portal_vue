<template>
  <div>
    <detail ref="form" v-bind="formInit">
      <buttons-operator type="top"
                        algin="left"
                        :buttons="[{label:'搜索',type:'primary',click:search},
                      {label:'重置',type:'info',click:reset}]"/>
    </detail>
    <buttons-operator type="top"
                      algin="right"
                      :buttons="[{label:'导出',type:'primary',click:exports}]"/>
    <IvTable ref="table" v-bind="table" @on-row-click="cellClickHandler"/>
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
        options: [],
        //搜索条件表单数据
        form: {
          createCompanyName: '',
          subjectName: '',
          deliveryAddress:'',
          createTimeStart: '',
          createTimeEnd: ''
        },
        table:{
          url: this.appConfig.api('inquiry/others/queryIqrIdleGoodsIntentForSupplyMember'),
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
              width:60,
            },
            {
              title: '序号',
              type: 'index',
              width: 80
            },
            {
              title: '标的物名称',
              key: 'subjectName',
              width: 150,
              render: (h, {row, column}) => {
                return h('a', {
                    on: {
                      click: () => {
                        this.gotoDetail(2,row.idleGoodsId)
                      }
                    }
                  },
                  row.inquiryName,
                );
              }
            },
            {
              title: '处置单位',
              key: 'purchaseAccountName',
              width: 150,
            },
            {
              title: '处置单位联系人',
              key: 'dealOrgContactName',
              width: 150,
            },
            {
              title: '处置单位联系电话',
              key: 'dealOrgContactTele',
              width: 150,
            },
            {
              title: '提货地点',
              key: 'deliverAddresss',
              width: 150,
            },
            {
              title: '采购方联系人',
              key: 'contactName',
              width: 150,
            },
            {
              title: '采购方联系电话',
              key: 'contactPhone',
              width: 150,
            },
            {
              title: '下达意向时间',
              key: 'createTimeStr',
              width: 180,
              // render: (h, { row, column }) => {
              //   return h('div',row.publishDate===(null||'')?'-':this.moment(row.publishDate).format("YYYY-MM-DD HH:mm:ss"));
              // }
              render: (h, {row, column}) => {
                return h('a', {
                    on: {
                      click: () => {
                        this.gotoDetail(1,row.idleGoodsIntentId)
                      }
                    }
                  },
                  row.inquiryName,
                );
              }
            },
            {
              title: '公告名称',
              key: 'noticeName',
              width: 120,
              render: (h, {row, column}) => {
                return h('a', {
                    on: {
                      click: () => {
                        //TODO 跳转公告红色
                      }
                    }
                  },
                  row.inquiryName,
                );
              }
            }
          ]
        },
      }
    },
    computed: {
      formInit() {
        return {
          contents: [
            {
              data: this.form,
              labelWidth: '150px',
              inputWidth: '200px',
              inline: true,
              children: [
                {
                  type: 'input',
                  label: '采购方',
                  placeholder: '请输入采购单名称',
                  prop: 'createCompanyName',
                },
                {
                  type: 'input',
                  label: '标的物名称',
                  placeholder: '请输入标的物名称',
                  prop: 'subjectName',
                },
                {
                  type: 'input',
                  label: '提货地点',
                  placeholder: '请输入提货地点',
                  prop: 'deliveryAddress',
                },
                {
                  type: 'dateTimePicker',
                  label: '下达意向开始日期',
                  placeholder: '请输入开始时间',
                  prop: 'createTimeStart',
                  extendParam: {
                    editable: false,
                    valueFormat:'yyyy-MM-dd HH:mm:ss',
                    format: 'yyyy-MM-dd HH:mm:ss'
                  },
                },
                {
                  type: 'dateTimePicker',
                  label: '下达意向结束日期',
                  placeholder: '请输入结束时间',
                  prop: 'createTimeEnd',
                  extendParam: {
                    editable: false,
                    valueFormat:'yyyy-MM-dd HH:mm:ss',
                    format: 'yyyy-MM-dd HH:mm:ss'
                  }
                }
              ]
            }
          ]
        }
      },
    },
    watch:{
      //监听tabs切换
      activeName:function(){
        this.search();
      }
    },
    methods: {
      //FIXME 搜索
      search() {
        this.$refs.table.query(this.form)
      },
      //FIXME 重置
      reset() {
        //因为detail组件可以包含多个表单,所以返回的的是表单数组forms
        this.$refs.form.forms[0].resetFields();
      },
      //FIXME 详情跳转
      gotoDetail(type,id) {
        console.log(row);
        this.$router.push({
          name: 'purchaserNoticeDetail',
          params: {type: type, id:id}
        });
      },
      //FIXME 导出
      exports(){

      },
      cellClickHandler(row) {
        console.log(row);
        this.$router.push({name: 'idleMaterialsDetail',params:{type:1,id:11}});
      }
    },
  }
</script>

<style scoped>

</style>

