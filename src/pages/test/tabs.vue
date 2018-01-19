<template>
  <el-card>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="待处理" name="1">
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
          <div v-show="displaySearch" ref="hideSearch">
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
          </div>
          <el-form-item>
            <el-button type="primary" @click="search">搜索</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
            <!--第一种展开收齐方式:监听事件-->
            <button-open-close @change="toggle" :open="displaySearch"></button-open-close>
            <!--第二种展开收齐方式:传参-->
            <button-open-close :el="$refs.hideSearch" :open="displaySearch"></button-open-close>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="已处理" name="2">已处理</el-tab-pane>
    </el-tabs>
  </el-card>
</template>
<script>
  import ButtonOpenClose from '@/components/ButtonOpenClose.vue'

  export default {
    components:{
      ButtonOpenClose
    },
    data() {
      return {
        displaySearch:true,
        activeName: '1',
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
      };
    },
    methods: {
      search() {
      },
      //重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleClick(tab) {
        console.log(tab);
      },
      toggle(open){
        this.displaySearch=open;
      }
    }
  };
</script>
