<template>
  <div>
    <el-card>
      <el-form ref="form" :model="form" :inline="true">
        <el-form-item label="计划名称：" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="项目单位：" prop="project">
          <el-input v-model="form.project"></el-input>
        </el-form-item>
        <el-form-item label="受理状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option v-for="item in status_options" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="tr" style="padding: 20px 10px;">
      <el-button type="primary"  @click="exportFunc">导出</el-button>
    </div>
    <el-card>
      <el-table :data="table.data" :border="true" max-height="400">
        <el-table-column align="center" v-for="item in table.columns" :key="item.index" v-bind="item"></el-table-column>
      </el-table>
    </el-card>
    <div class="hello">
      <vPagination :total="total" :current-page='current' :pagegroup="pagegroup" @pagechange="pagechange" v-if="isShowPagination"></vPagination>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        total: 100,
        current: 1,
        pagegroup: 10,
        isShowPagination: true,
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
        //表单数据
        form: {
          name: '',
          project: '',
          status: '',
        },
        //列表数据
        table: {
          //列元素
          columns: [
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
          //数据
          data: []
        }
      }
    },
    methods: {
      pagechange(currentPage) {
        console.log('currentPage=',currentPage);
      },
      search() {
        //获取列表信息
        this.axios.post(this.appConfig.api('testDylyList'),this.form)
          .then((response) => {
            console.log(response);
            this.table.data = response;
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //导出
      exportFunc(){

      }
    }
  }
</script>
