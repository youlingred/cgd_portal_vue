<template>
  <el-card>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="待处理" name="1">待处理</el-tab-pane>
      <el-tab-pane label="已处理" name="2">已处理</el-tab-pane>
    </el-tabs>
  </el-card>
</template>
<script>
  export default {
    data() {
      return {
        activeName: '2'
      };
    },
    methods: {
      handleClick(tab) {
        console.log(tab);
      }
    }
  };
</script>
