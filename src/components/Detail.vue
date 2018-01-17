<template>
  <div>
    <el-card v-for="(item,index) in contents" :key="index" v-bind:style="{marginTop:(index>0&&'20px')}">
      <div class="el-card__header" v-show="item">
        <span>{{item.header}}</span>
      </div>
      <el-form label-position="right'" label-width="200px">
        <el-form-item v-for="(child,index) in item.children" :key="index" :label="child.label+':'">
          <detail-item v-bind="child" :data="item.data"></detail-item>
        </el-form-item>
      </el-form>
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
