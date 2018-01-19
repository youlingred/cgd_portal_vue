<template>
  <!--展示组件-->
  <label v-if="type === 'label'">{{value}}</label>
  <div v-else-if="type === 'file'">
    <div v-for="(fileItem,index) in value" :key="index">
      <span style="display:inline-block;min-width:200px">{{fileItem.name}}</span>
      <a :href="fileItem.url"
         target="_blank" class="downloadMessage"><span class="">下载</span>
      </a>
    </div>
  </div>
  <!--编辑组件-->
  <el-input v-else-if="type === 'input'" v-model="data[prop]" :placeholder="placeholder"></el-input>
  <el-date-picker v-else-if="type === 'datePicker'"
                  type="date" v-model="data[prop]"
                  :placeholder="placeholder"
                  v-bind="extendParam"></el-date-picker>
  <el-date-picker v-else-if="type === 'dateTimePicker'"
                  type="datetime"
                  v-model="data[prop]"
                  :placeholder="placeholder"
                  v-bind="extendParam"></el-date-picker>
  <el-select v-else-if="type === 'select'"
             v-model="data[prop]"
             :placeholder="placeholder"
             v-bind="extendParam">
    <el-option v-for="opt in extendParam.options"
               :key="opt.key"
               :label="opt.label"
               :value="opt.value"></el-option>
  </el-select>
  <el-upload v-else-if="type === 'upload'"
             :fileList="data[prop]"
             :on-success="fileUploadSuccess"
             v-bind="extendParam">
    <el-button size="small" type="primary">点击上传</el-button>
    <div v-show="extendParam.tip" slot="tip" class="el-upload__tip">{{extendParam.tip}}</div>
  </el-upload>
</template>
<script>
  export default {
    props: {
      data: {
        default() {
          return {};
        }
      },
      //类型: 默认为label,可设置为 file,其他类型正在添加中
      type: {
        default: 'label'
      },
      //默认文本
      placeholder:{
        default:''
      },
      //参数名定义
      prop: {
        default: ''
      },
      //当类型为文件时作为下载地址参数的参数名定义
      prop_url: {
        default: ''
      },
      //格式化显示函数
      formatter:{
        type:Function,
      },
      //在编辑页面时针对不同组件的传参
      extendParam:{
        type:Object,
        default(){
          return {};
        }
      },
    },
    data() {
      return {}
    },
    computed: {
      value: {
        get() {
          if (this.formatter) {
            return this.formatter(this.data[this.prop])
          }
          return this.data[this.prop]
        }
      }
    },
    methods:{
      fileUploadSuccess(response, file, fileList){
        this.data[this.prop]=[];
        _.forEach(fileList,(val)=>{
          this.data[this.prop].push(_.pick(val,['name','url']));
        })
      }
    }
  }
</script>
