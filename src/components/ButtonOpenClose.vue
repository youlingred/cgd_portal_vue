<template>
  <el-button type="text" @click="toggle">{{label}}<i :class="iClass"></i></el-button>
</template>
<script>
  export default {
    props:['el','open'],
    data(){
      return {
        openFlag:this.open||false
      }
    },
    computed:{
      label(){
        if(this.openFlag){
          return '收起'
        }else{
          return '展开'
        }
      },
      iClass(){
        if(this.openFlag){
          return 'el-icon-caret-top'
        }else{
          return 'el-icon-caret-bottom'
        }
      }
    },
    methods:{
      toggle(){
        this.openFlag=!this.openFlag;
        console.log(this.openFlag)
          this.$emit('change',this.openFlag);
          if(this.el){
            this.el.style.display=this.openFlag?'block':'none';
          }
      }
    }
  }
</script>
