<template>
  <div>
    <detail ref="send" v-bind="formInitDataSend">
      <buttons-operator type="top"
                        algin="left"
                        :buttons="[{label:'搜索',type:'primary',click:search},
                          {label:'重置',type:'info',click:resetForm}]"/>
    </detail>
    <buttons-operator type="top"
                      algin="right"
                      :buttons="[{label:'导出',type:'primary',click:exportFunc}]"/>
<!--    <el-card>
      <el-form ref="formel" :inline="true" :model="formtable">
        <el-form-item label="计划名称" prop="name">
          <el-input v-model="formtable.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="项目单位" prop="project">
          <el-input v-model="formtable.project" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="受理状态" prop="status">
          <el-select v-model="formtable.status" prop="status" placeholder="请选择">
            <el-option
              v-for="item in status_options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="resetForm('formel')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="tr" style="padding:20px 10px">
      <el-button type="primary" @click="exportFunc">导出</el-button>
    </div>-->
    <cg-table ref="test" v-bind="table" @cell-click="cellClickHandler"></cg-table>
  </div>
</template>

<script>
  import detail from '@/components/Detail.vue'
  import buttonsOperator from '@/components/ButtonsOperator.vue'
  import CgTable from '@/components/CgTable.vue'

  export default {
    data () {
      return {
        formtable: {
          name: '',
          project: '',
          status: ''
        },
        //列表数据
/*        table: {
          data: [],
          height: 400,
          columns: [
            {
              type: 'selection',
              width: 50
            },
            {
              label: '序号',
              type: 'index',
              width: 80
            },
            {
              label: '计划名称',
              prop: 'planName'
            },
            {
              label: '发布人',
              prop: 'publishUser'
            },
            {
              label: '公告发布时间',
              prop: 'publishDate',
              formatter: (row, column, value) => {
                return this.moment(value).format("YYYY-MM-DD HH:mm:ss");
              }
            },
            {
              label: '异议提出时间',
              prop: 'objectionDate',
              formatter: (row, column, value) => {
                return this.moment(value).format('YY-MM-DD HH:mm:ss');
              }
            },
            {
              label: '受理状态',
              prop: 'status',
              formatter: function (row, column, value) {
                switch (value) {
                  case 1:
                    return '处理中';
                    break;
                  case 2:
                    return '已受理';
                    break;
                  case 3:
                    return '驳回';
                    break;
                }
              }
            }
          ],
          url: this.appConfig.api('testDylyListPage'),
          pageNo: 1,
        }*/
      }
    },
    created(){

    },
    computed: {
      //发出澄清表单初始化数据
      formInitDataSend() {
        return {
          contents: [
            {
              data: this.formtable,
              labelWidth: '100px',
              inputWidth: '200px',
              inline: true,
              children: [
                {
                  type: 'input',
                  label: '计划名称',
                  placeholder: '请输入',
                  prop: 'name',
                },
                {
                  type: 'input',
                  label: '项目单位',
                  placeholder: '请输入',
                  prop: 'project',
                },
                {
                  type: 'select',
                  label: '受理状态',
                  placeholder: '请选择',
                  prop: 'status',
                  extendParam: {
                    options : [
                      {
                        label: '受理中',
                        value: 1
                      },
                      {
                        label: '已处理',
                        value: 2
                      },
                      {
                        label: '驳回',
                        value: 3
                      },
                    ]
                  }
                }
              ]
            }
          ]
        }
      },
      //table初始化数据
      table() {
        return {
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
              width: 50
            },
            {
              label: '序号',
              type: 'index',
              width: 80
            },
            {
              label: '计划名称',
              prop: 'planName'
            },
            {
              label: '发布人',
              prop: 'publishUser'
            },
            {
              label: '公告发布时间',
              prop: 'publishDate',
              formatter: (row, column, value) => {
                return this.moment(value).format("YYYY-MM-DD HH:mm:ss");
              }
            },
            {
              label: '异议提出时间',
              prop: 'objectionDate',
              formatter: (row, column, value) => {
                return this.moment(value).format('YY-MM-DD HH:mm:ss');
              }
            },
            {
              label: '受理状态',
              prop: 'status',
              formatter: function (row, column, value) {
                switch (value) {
                  case 1:
                    return '处理中';
                    break;
                  case 2:
                    return '已受理';
                    break;
                  case 3:
                    return '驳回';
                    break;
                }
              }
            }
          ],
        }
      }
    },

    methods: {
      cellClickHandler(row, column, cell, event){
        console.log(row,column, cell, event)
        this.$router.push({name:'spublicdetails'})
      },
      search () {
        this.$refs.test.query(this.formtable);
      },
      resetForm () {
        this.$refs['send'].forms[0].resetFields();
      },
      exportFunc () {
        console.log(this.$refs.test.m_selection);
      }
    },
    components: {
      CgTable,
      detail,
      buttonsOperator
    }
  }

</script>

<style>


</style>
