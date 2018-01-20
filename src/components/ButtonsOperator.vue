<template>
  <!--底部操作按钮模板-->
  <div>
    <div v-if="type==='bottom'" class="bottom-operation">
      <div class="background mt10 "
           :class="[{'fixed-bottom':_fix},_algin]">
        <el-button v-for="(btn,index) in buttons"
                   :key="index"
                   @click="btn.click"
                   v-bind="btn" >{{btn.label}}</el-button>
      </div>
    </div>
    <div v-else-if="type==='top'" if="type==='top'" class="top-operation" :class="_algin">
      <template v-for="(btn) in buttons">
        <button-open-close v-if="btn.type==='switch'" :flag.sync="_switchFlag" @change="btn.change||null" v-bind="btn"/>
        <el-button v-else @click="btn.click" v-bind="btn">{{btn.label}}</el-button>
      </template>
    </div>
  </div>
</template>
<script>
  import ButtonOpenClose from '@/components/ButtonOpenClose.vue'

  export default {
    name:'buttons-operator',
    components:{
      ButtonOpenClose
    },
    props: {
      //类型,top为中上部,table列表上面的操作按钮组,
      //     bottom为底部操作按钮组
      type: {
        default: 'bottom'
      },
      //对齐方式 left center right三种,默认为center
      algin: {
        default: 'center'
      },
      //是否有展开收齐功能以及当前显示状态的标志
      switchFlag:{
        type:Boolean
      },
      //按钮数据集合,里面包含各个按钮自己的参数
      buttons:{
        default(){
          return [];
        }
      },
      fix: {}
    },
    data() {
      return {
      }
    },
    computed:{
      //开关标志计算属性
      _switchFlag:{
        get(){
          return this.switchFlag;
        },
        set(val){
          this.$emit('update:switchFlag',val);
        }
      },
      _fix(){
        switch(typeof(this.fix)){
          case 'string':
            return this.fix==='true'
          case 'boolean':
            return this.fix;
          default:
            return false;
        }
      },
      //对戏方式class名称计算属性,直接添加到class中
      _algin() {
        switch (this.algin) {
          case 'center':
            return 'tc';
            break;
          case 'left':
            return 'tl';
            break;
          case 'left':
            return 'tr';
            break;
          default:
            return 'tr';
        }
      }
    }
  }
</script>
