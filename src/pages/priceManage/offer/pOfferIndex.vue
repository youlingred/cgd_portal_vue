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
    <buttons-operator type="top"
                      algin="right"
                      :buttons="[{label:'通过',type:'primary',click:pass},{label:'驳回',type:'primary',click:reject}]"/>
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
        flag:false,
        //当前激活的tab名称
        activeName: 'offering',
        options: [],
        //搜索条件表单数据
        form: {
          planName: '',
          publishUser: '',
          project: '',
          status: '',
          publishDate1: '',
          publishDate2: ''
        },
      }
    },
    computed: {
      status(){
          return this.activeName=="offering"?0:1
      },
      table(){
        return {
          url: this.appConfig.api('inquiry/quote/qryIqrQuoteList'),
          pageNo: 1,
          height: 400,
          queryParam: function (param) {
            console.log('queryParam:', param)
             console.log('this.activeName:', this.activeName)
            return _.assign({status:this.status}, param);
          },
          responseHandler: function (val) {
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
              align:'center',
              width: 80
            },
            {
              title: '询价单名称',
              key: 'inquiryName',
              align:'center',
              width: 100,
              render: (h, { row, column }) => {
                return row.planName;
              }
            },
            {
              title: '销售编号',
              key: 'inquiryCode',
              align:'center',
            },
            {
              title: '发布日期',
              key: 'publishTime',
              align:'center',
              width: 180,
              render: (h, { row, column }) => {
                return this.moment(row.publishDate).format("YYYY-MM-DD HH:mm:ss");
              }
            },
            {
              title: '报价截止',
              key: 'quoteEndDate',
              align:'center',
              width: 180,
              render: (h, { row, column }) => {
                return this.moment(row.publishDate).format("YYYY-MM-DD HH:mm:ss");
              }
            },
            {
              title: '采购机构',
              key: 'professionalOrgName',
              align:'center',
            },
            {
              title: '采购类别',
              key: 'purchaseCategoryName',
              render: (h, { row, column }) => {
                switch(row.status){
                  case 1:
                    return '已完成';
                  default:
                    return ''
                }
              }
            },
          ]
        }
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
                  label: '销售编号',
                  placeholder: '请输入销售编号',
                  prop: 'inquiryCode',
                },
                {
                  type: 'select',
                  label: '采购机构',
                  placeholder: '请选择',
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
                  type: 'select',
                  label: '采购类别',
                  placeholder: '请选择',
                  prop: 'status',
                  extendParam: {
					          options: [
				  	          {name:1,value:'物资类'},
					            {name:2,value:'施工类'},
					            {name:3,value:'服务类'}
					        ]
                  }
                },
                {
                  type: 'input',
                  label: '澄清内容',
                  placeholder: '模糊查询,可用个逗号隔开',
                  prop: 'publishUser',
                },
                {
                  type: 'dateTimePicker',
                  label: '报价开始日期',
                  placeholder: '请输入开始时间',
                  prop: 'quoteEndDateStart',
                  extendParam: {
                    editable: false,
                    format: 'yyyy-mm-dd hh:mm:ss'
                  }
                },
                {
                  type: 'dateTimePicker',
                  label: '报价结束日期',
                  placeholder: '请输入结束时间',
                  prop: 'quoteEndDateEnd',
                  extendParam: {
                    editable: false,
                    format: 'yyyy-mm-dd hh:mm:ss'
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
                    format: 'yyyy-mm-dd hh:mm:ss'
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
                    format: 'yyyy-mm-dd hh:mm:ss'
                  }
                },
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
      //搜索
      search() {
        this.$refs.table.query(this.form)
      },
      //重置
      reset() {
        //因为detail组件可以包含多个表单,所以返回的的是表单数组forms
        this.$refs.form.forms[0].resetFields();
      },
      //FIXME 远程请求select数据
      query(query) {
        if (!query) {
          query = ''
        }
        this.axios.post(this.appConfig.api('testQuerySelect'), this.form)
          .then((response) => {
            console.log(response);
            let list = response;

            this.options = list.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //通过
      pass() {
        this.$router.push({name: 'clarifyOfferEdit'})
      },
      //驳回
      reject(){

      },
      cellClickHandler(row) {
        console.log(row);
        console.log(this.activeName);
        if (this.activeName === 'offering') {
          this.$router.push({name: 'priceOfferEdit'});
        }
      }
    },
  }
</script>

<style scoped>

</style>

