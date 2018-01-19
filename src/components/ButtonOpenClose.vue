<template>
  <el-button type="text" @click="toggle">{{label}}<i :class="iClass"></i></el-button>
</template>
<script>
  export default {
    //el:要展开和隐藏的对象,open:初始是否打开状态
    props:{
      open:{
        default:false,
      },
      handler:{
        type:Function
      }
    },
    data(){
      return {
        openFlag:this.open||false
      }
    },
    computed:{
      //标签
      label(){
        if(this.openFlag){
          return '收起'
        }else{
          return '展开'
        }
      },
      //箭头class
      iClass(){
        if(this.openFlag){
          return 'el-icon-caret-top'
        }else{
          return 'el-icon-caret-bottom'
        }
      }
    },
    methods:{
      //切换展开收起
      toggle(){
        this.openFlag=!this.openFlag;
          console.log(this.openFlag)
          this.handler&&this.handler(this.openFlag)
          this.$emit('change',this.openFlag);
      }
    }
  }
</script>
