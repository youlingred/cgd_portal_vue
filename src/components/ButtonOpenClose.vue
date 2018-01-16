<template>
  <el-button type="text" @click="toggle">{{label}}<i :class="iClass"></i></el-button>
</template>
<script>
  export default {
    props:['hideElement'],
    data(){
      return {
        open:false
      }
    },
    computed:{
      label(){
        if(this.open){
          return '收起'
        }else{
          return '展开'
        }
      },
      iClass(){
        if(this.open){
          return 'el-icon-caret-top'
        }else{
          return 'el-icon-caret-bottom'
        }
      }
    },
    methods:{
      toggle(){
        this.open=!this.open;
        if(this.open){
          this.$emit('change','open');
          if(this.hideElement){
            this.hideElement.style.display='block';
          }
        }else{
          this.$emit('change','close');
          if(this.hideElement) {
            this.hideElement.style.display = 'none';
          }
        }

      }
    }
  }
</script>
