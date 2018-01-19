<template>
  <!--底部操作按钮模板-->
  <div>
    <div v-if="type==='bottom'" class="bottom-operation">
      <div class="background mt10 "
           :class="[{'fixed-bottom':fix},_algin]">
        <el-button v-for="(btn,index) in buttons"
                   :key="index"
                   @click="btn.click"
                   v-bind="btn" >{{btn.label}}</el-button>
      </div>
    </div>
    <div v-else-if="type==='top'" if="type==='top'" class="top-operation" :class="_algin">
      <el-button v-for="(btn,index) in buttons"
                 :key="index"
                 v-bind="btn">{{btn.label}}</el-button>
      <button-open-close v-if="switchBtn" v-bind="switchBtn"/>

    </div>
  </div>
</template>
<script>
  import ButtonOpenClose from '@/components/ButtonOpenClose.vue'

  export default {
    components:{
      ButtonOpenClose
    },
    props: {
      type: {
        default: 'bottom'
      },
      algin: {
        default: 'center'
      },
      switchBtn:{
        type:Object
      },
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
