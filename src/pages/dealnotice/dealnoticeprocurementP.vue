<template>
  <div>
    <el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="待处理" name="1">
          <detail ref="send" v-bind="formInitDataSend" noborder/>
          <buttons-operator type="top"
                            algin="left"
                            :switchFlag.sync="flag"
                            :buttons="[{label:'搜索',type:'primary',click:search},
                          {label:'重置',type:'info',click:resetform},{type:'switch'},]"/>
        </el-tab-pane>
        <el-tab-pane label="已处理" name="2">
          <detail ref="receive" v-bind="formInitDataReceive"/>
          <buttons-operator type="top"
                            algin="left"
                            :switchFlag.sync="flagtwo"
                            :buttons="[{label:'确认',type:'primary',click:search},
                          {label:'重置',type:'info',click:resetform},
                          {type:'switch'},]"/>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <buttons-operator type="top"
                      algin="right"
                      :buttons="[{label:'确认',type:'primary',click:buttonFunc},
                      {label:'拒绝成交',type:'primary',click:buttonFunc},
                      {label:'生产文档',type:'primary',click:buttonFunc},
                      {label:'导出',type:'primary',click:buttonFunc}]"/>
    <IvTable ref="table" v-bind="table" @on-row-click="cellClickHandler"/>
  </div>
</template>
<script>
  import detail from '@/components/Detail.vue'
  import buttonsOperator from '@/components/ButtonsOperator.vue'
  import IvTable from '@/components/IvTable.vue'

  export default {
    components:{
      detail,
      buttonsOperator,
      IvTable,
    },
    computed: {
      //发出澄清表单初始化数据
      formInitDataSend() {
        return {
          contents: [
            {
              data: this.form['1'],
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
                    options : [
                      {
                        label: '全部',
                        value: 1
                      },
                      {
                        label: '待发送',
                        value: 2
                      },
                      {
                        label: '供应商确认中',
                        value: 3
                      },
                      {
                        label: '已确认',
                        value: 4
                      },
                      {
                        label: '拒绝成交',
                        value: 5
                      },
                    ]
                  }
                },
                {
                  type: 'input',
                  label: '成交通知书编号',
                  placeholder: '请输入',
                  prop: 'numbering',
                },
                {
                  type: 'input',
                  label: '成交通知书名称',
                  placeholder: '请输入',
                  prop: 'name',
                },
                {
                  type: 'select',
                  label: '采购类别',
                  placeholder: '请选择',
                  prop: 'ctype',
                  extendParam: {
                    options : [
                      {
                        label: '全部',
                        value: 1
                      },
                      {
                        label: '物资类',
                        value: 2
                      },
                      {
                        label: '施工类',
                        value: 3
                      },
                      {
                        label: '服务类',
                        value: 4
                      }
                    ]
                  }
                },
                {
                  type: 'input',
                  label: '供应商',
                  placeholder: '请输入',
                  prop: 'supplier',
                },
                {
                  type: 'select',
                  label: '缴费通知发送状态',
                  placeholder: '请选择',
                  prop: 'pstatus',
                  extendParam: {
                    options : [
                      {
                        label: '全部',
                        value: 1
                      },
                      {
                        label: '未发送',
                        value: 2
                      },
                      {
                        label: '已发送',
                        value: 3
                      },
                    ]
                  }
                },
                {
                  type: 'dateTimePicker',
                  label: '制单开始日期',
                  placeholder: '请输入开始时间',
                  prop: 'timesegmentstart',
                  switchFlag: this.flag,
                  extendParam: {
                    editable:false,
                    format: 'yyyy-mm-dd hh:mm:ss'
                  }
                },
                {
                  type: 'dateTimePicker',
                  label: '制单结束日期',
                  placeholder: '请输入结束时间',
                  prop: 'timesegmentend',
                  switchFlag: this.flag,
                  extendParam: {
                    editable:false,
                    format: 'yyyy-mm-dd hh:mm:ss',
                  }
                },
              ]
            }
          ]
        }
      },
      //收到澄清表单初始化数据
      formInitDataReceive() {
        return {
          contents: [
            {
              data: this.form['2'],
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
                    options : [
                      {
                        label: '全部',
                        value: 1
                      },
                      {
                        label: '待发送',
                        value: 2
                      },
                      {
                        label: '供应商确认中',
                        value: 3
                      },
                      {
                        label: '已确认',
                        value: 4
                      },
                      {
                        label: '拒绝成交',
                        value: 5
                      },
                    ]
                  }
                },
                {
                  type: 'input',
                  label: '成交通知书编号',
                  placeholder: '请输入',
                  prop: 'numbering',
                },
                {
                  type: 'input',
                  label: '成交通知书名称',
                  placeholder: '请输入',
                  prop: 'name',
                },
                {
                  type: 'select',
                  label: '采购类别',
                  placeholder: '请选择',
                  prop: 'ctype',
                  extendParam: {
                    options : [
                      {
                        label: '全部',
                        value: 1
                      },
                      {
                        label: '物资类',
                        value: 2
                      },
                      {
                        label: '施工类',
                        value: 3
                      },
                      {
                        label: '服务类',
                        value: 4
                      }
                    ]
                  }
                },
                {
                  type: 'input',
                  label: '供应商',
                  placeholder: '请输入',
                  prop: 'supplier',
                },
                {
                  type: 'select',
                  label: '缴费通知发送状态',
                  placeholder: '请选择',
                  prop: 'pstatus',
                  extendParam: {
                    options : [
                      {
                        label: '全部',
                        value: 1
                      },
                      {
                        label: '未发送',
                        value: 2
                      },
                      {
                        label: '已发送',
                        value: 3
                      },
                    ]
                  }
                },
                {
                  type: 'dateTimePicker',
                  label: '制单开始日期',
                  placeholder: '请输入开始时间',
                  prop: 'timesegmentstart',
                  switchFlag: this.flagtwo,
                  extendParam: {
                    editable:false,
                    format: 'yyyy-mm-dd hh:mm:ss'
                  }
                },
                {
                  type: 'dateTimePicker',
                  label: '制单结束日期',
                  placeholder: '请输入结束时间',
                  prop: 'timesegmentend',
                  switchFlag: this.flagtwo,
                  extendParam: {
                    editable:false,
                    format: 'yyyy-mm-dd hh:mm:ss',
                  }
                },
              ]
            }
          ]
        }
      },
      //table初始化数据
      table() {
        return {
          url: this.appConfig.api('testDealnoticeprocurement'),
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
              width: 60
            },
            {
              title: '序号',
              type: 'index',
              width: 80
            },
            {
              title: '状态',
              key: 'status',
              align:'center'
            },
            {
              title: '成交通知书名称',
              key: 'name',
              align:'center'
            },
            {
              title: '供应商',
              key: 'supplier',
              align:'center'
            },
            {
              title: '采购编号',
              key: 'cnumber',
              align:'center'
            },
            {
              title: '采购金额',
              key: 'money',
              align:'center',
            },
            {
              title: '采购类别',
              key: 'ctype',
              align:'center',
              render: (h, { row, column }) => {
                switch (row.ctype) {
                  case 1:
                    return '物资类';
                    break;
                  case 2:
                    return '施工类';
                    break;
                  case 3:
                    return '服务类';
                    break;
                }
              }
            },
          ],
        }
      }
    },
    data() {
      return {
        //1采购,2销售
        type:0,
        //当前激活的tab名称
        activeName: '1',
        //展开收起标志
        flag: false,
        //展开收起标志
        flagtwo: false,
        //发出澄清搜索条件表单数据
        //表单数据
        form:{
          '1':{
            status: '',
            numbering: '',
            name: '',
            ctype:'',
            supplier:'',
            pstatus:'',
            timesegmentstart:'',
            timesegmentend:''
          },
          '2':{
            status: '',
            numbering: '',
            name: '',
            ctype:'',
            supplier:'',
            pstatus:'',
            timesegmentstart:'',
            timesegmentend:''
          },
        }
      };
    },
    methods: {
      search(num) {
        this.$refs.table.query(this.form[this.activeName])
      },
      //重置
      resetform(form1Name) {
        this.$refs[this.activeName].forms[0].resetFields();
      },
      handleClick() {
        this.search(this.activeName);
      },
      buttonFunc(type){

      },
      cellClickHandler(row){
        this.$router.push({name:'details',params:{type:1,id:1}})
      },

    }

  };
</script>
