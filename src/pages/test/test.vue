<template>
  <div>
    <el-card>
      <el-form ref="form" :model="form" :inline="true">
        <el-form-item label="计划名称：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="项目单位：">
          <el-input v-model="form.project"></el-input>
        </el-form-item>
        <el-form-item label="受理状态">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option v-for="item in form.status_options" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="tr" style="padding: 20px 10px;">
      <el-button type="primary">导出</el-button>
    </div>
    <el-card>
      <el-table :data="table.data" :border="true" max-height="400">
        <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
        <el-table-column align="center" v-for="item in table.columns" :key="item.prop" v-bind="item"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          project: '',
          status: '',
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
        },
        table: {
          columns: [
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
              formatter: (row, column, value)=>{
                return this.moment(value).format("YY-MM-DD HH:mm:ss");
              }
            },
            {
              label: '异议提出时间',
              prop: 'objectionDate',
              formatter: (row, column, value)=> {
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
          data: [
            {
              planName: '计划1',
              planName: '团建',
              publishUser: '老铁',
              publishDate: 1514192693000,
              objectionDate: 1514192693000,
              status: 1
            },
            {
              planName: '计划1',
              planName: '团建',
              publishUser: '老铁',
              publishDate: 1514192693000,
              objectionDate: 1514192693000,
              status: 1
            },
            {
              planName: '计划1',
              planName: '团建',
              publishUser: '老铁',
              publishDate: 1514192693000,
              objectionDate: 1514192693000,
              status: 1
            },
            {
              planName: '计划1',
              planName: '团建',
              publishUser: '老铁',
              publishDate: 1514192693000,
              objectionDate: 1514192693000,
              status: 1
            },
            {
              planName: '计划1',
              planName: '团建',
              publishUser: '老铁',
              publishDate: 1514192693000,
              objectionDate: 1514192693000,
              status: 1
            }
          ]
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>
<style>
  .el-card {
    box-shadow: none;
  }
</style>
