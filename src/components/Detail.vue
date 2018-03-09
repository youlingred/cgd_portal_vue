<template>
  <div>
    <el-card v-for="(item,index) in contents" :key="index" v-bind:class="{noborder:noborder}" v-bind:style="{marginTop:(index>0&&'20px') }">
      <div class="el-card__header" v-show="item.header" :style="{marginBottom:'20px'}">
        <span>{{item.header}}</span>
      </div>
      <el-form ref="form" status-icon v-bind="item" :model="item.data" :rules="item.rules" label-position="right">
        <el-form-item v-for="(child,index) in item.children"
                      v-show="child.switchFlag!==false"
                      :key="index"
                      :prop="child.prop"
                      :label="child.label+':'">
          <detail-item v-bind="child" :data="item.data" :style="{'width':item.inputWidth||'100%'}"
                       @file-upload-success="fileChange"
                       @file-remove="fileChange"/>
        </el-form-item>
      </el-form>
      <slot></slot>
    </el-card>
  </div>
</template>
<script>
  import detailItem from '@/components/DetailItem.vue'

  export default {
    name:'detail',
    components:{detailItem},
    props:{
      noborder:{
        type:Boolean,
        default:false
      },
      contents:{
        type:Array,
        default(){
          return [
          ]
        },
      }
    },
    data(){
      return{

      }
    },
    computed:{
      forms(){
        return this.$refs.form;
      }
    },
    methods:{
      fileChange(){
        _.forEach(this.forms,form=>form.validate());
      }
    }
  }
</script>
<style scoped>
  .noborder{
    border:none;
  }
  .el-form-item{
    margin-bottom: 13px;
  }
</style>
