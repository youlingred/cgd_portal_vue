<template>
  <el-button type="text" v-bind="$props" @click="toggle">{{label}}<i :class="iClass"></i></el-button>
</template>
<script>
  export default {
    //el:要展开和隐藏的对象,flag:初始是否打开状态
    props:{
      //显示隐藏标志
      flag:{
        default:false,
      },
      openLabel:{
        type:String,
        default:'展开'
      },
      closeLabel:{
        type:String,
        default:'收起'
      },
      //状态变化回调函数,入参是flag值
      change:{
        type:Function,
      }
    },
    data(){
      return {
      }
    },
    computed:{
      _flag:{
        get(){
          return this.flag;
        },
        set(val){
          this.$emit('update:flag',val);
          this.change&&this.change(val)
        }
      },
      //标签
      label(){
        if(this._flag){
          return this.closeLabel
        }else{
          return this.openLabel
        }
      },
      //箭头class
      iClass(){
        if(this._flag){
          return 'el-icon-caret-top'
        }else{
          return 'el-icon-caret-bottom'
        }
      }
    },
    methods:{
      //切换展开收起
      toggle(){
        this._flag=!this._flag;
      }
    }
  }
</script>
