<template>
  <div>
    <el-card>
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
    </div>
    <cg-table ref="test" v-bind="$data.table"></cg-table>
  </div>
</template>

<script type="text/ecmascript-6">
  import CgTable from '@/components/CgTable.vue'

  export default {
    data () {
      return {
        //受理状态
        status_options: [
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
        ],
        formtable: {
          name: '',
          project: '',
          status: ''
        },
        //列表数据
        table: {
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
                return this.moment(value).format("YY-MM-DD HH:mm:ss");
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
        }
      }
    },
    created(){

    },
    methods: {
      search () {
        this.$refs.test.query(this.formtable);
      },
      resetForm (name) {
        this.$refs[name].resetFields();
      },
      exportFunc () {
        console.log(this.$refs.test.m_selection);
      }
    },
    components: {CgTable}
  }

</script>

<style lang="css" rel="stylesheet/css">


</style>
