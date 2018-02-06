<template>
  <!--展示组件-->
  <label v-if="type === 'label'" style="display:inline-block;width:100%;line-height:20px;">{{value}}</label>
  <div v-else-if="type === 'file'">
    <div v-for="(fileItem,index) in value" :key="index">
      <span style="display:inline-block;min-width:200px">{{fileItem.name||file.attachmentName}}</span>
      <a :href="fileItem.url||fileItem.path||file.attachmentUrl"
         target="_blank" class="downloadMessage"><span class="">下载</span>
      </a>
    </div>
  </div>
  <!--编辑组件-->
  <el-input v-else-if="type === 'input'"
            v-model="data[prop]"
            :placeholder="placeholder"
            v-bind="extendParam"></el-input>
  <el-input v-else-if="type === 'textarea'"
            type="textarea"
            v-model="data[prop]"
            :placeholder="placeholder"
            v-bind="extendParam"></el-input>
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
    <el-option v-for="(opt,index) in extendParam.options"
               :key="index"
               :label="opt.label"
               :value="opt.value"></el-option>
  </el-select>
  <el-upload v-else-if="type === 'upload'"
             :fileList="data[prop]"
             :on-success="fileUploadSuccess"
             v-bind="extendParam">
    <el-button size="small" type="primary">点击上传</el-button>
    <div v-show="extendParam.tip" slot="tip" class="el-upload__tip" style="line-height: 20px;
}">{{extendParam.tip}}</div>
  </el-upload>
</template>
<script>
  export default {
    props: {
      //所有数据项集合
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
      //格式化显示数据,用在非编辑状态下
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
      //文件上传成功回调
      fileUploadSuccess(response, file, fileList){
        this.data[this.prop]=[];
        _.forEach(fileList,(val)=>{
          this.data[this.prop].push(_.pick(val,['name','path']));
        })
      }
    }
  }
</script>
