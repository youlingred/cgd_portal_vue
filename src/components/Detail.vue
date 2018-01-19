<template>
  <div>
    <el-card v-for="(item,index) in contents" :key="index" v-bind:style="{marginTop:(index>0&&'20px') }">
      <div class="el-card__header" v-show="item.header" :style="{marginBottom:'20px'}">
        <span>{{item.header}}</span>
      </div>
      <el-form v-bind="item" :model="item.data" :rules="item.rules" label-position="right">
        <el-form-item v-for="(child,index) in item.children"
                      :key="index"
                      :prop="child.prop"
                      :label="child.label+':'">
          <detail-item v-bind="child" :data="item.data" :style="{'width':item.inputWidth||'100%'}"/>
        </el-form-item>
      </el-form>
      <slot></slot>
    </el-card>
  </div>
</template>
<script>
  import detailItem from '@/components/detailItem.vue'

  export default {
    components:{detailItem},
    props:{
      contents:{
        type:Array,
        default(){
          return [
          ]
        }
      }
    },
    data(){
      return{

      }
    }
  }
</script>
<style scoped>
  .el-form-item{
    margin-bottom: 13px;
  }
</style>
