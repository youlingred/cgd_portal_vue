<template>
  <div>
    <detail v-bind="detailData"></detail>
    <el-button @click="setValue">给第二层数据赋值</el-button>
  </div>


</template>
<script>
  import detail from '@/components/Detail.vue'

  export default {
    components: {
      detail
    },
    data() {
      return {
        data1: {
          planName: '团建',
          publishUser: '老铁',
          publishDate: 1514192693000,
          objectionDate: 1514192693000,
          status: 1,
          prop4: '艳照门',
          fileList: []
        },
        data2: {
          fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
        }
      };
    },
    computed: {
      detailData() {
        return {
          contents: [
            {
              header: '标题1',
              data: this.data2,
              children: [
                {
                  type: 'input',
                  label: '计划名称',
                  placeholder: '请输入计划名称',
                  prop: 'planName',
                },
                {
                  type: 'input',
                  label: '发布人',
                  placeholder: '请输入发布人',
                  prop: 'publishUser',
                },
                {
                  type: 'dateTimePicker',
                  label: '发布时间',
                  placeholder: '请输入发布时间',
                  prop: 'publishDate',
                  extendParam:{
                    format: 'yyyy-mm-dd hh:mm:ss'
                  }
                },
                {
                  type: 'select',
                  label: '处理状态',
                  placeholder: '请选择处理状态',
                  prop: 'status',
                  extendParam:{
                    options: [
                      {
                        value: 1,
                        label: '处理中'
                      },
                      {
                        value: 2,
                        label: '已受理'
                      },
                      {
                        value: 3,
                        label: '驳回'
                      }
                    ]
                  }
                },
                {
                  type: 'upload',
                  label: 'file4',
                  prop: 'prop4',
                  extendParam:{
                    action:'https://jsonplaceholder.typicode.com/posts/',
                    tip:'只能上传jpg/png文件，且不超过500kb',
                    listType:"picture"
                  }
                }
              ],
              rules:{
                planName:[
                  { required: true, message: '请输入活动名称', trigger: 'blur' },
                  { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ]
              }
            },
            {
              header: '标题2',
              data: this.data2,
              children: [
                {
                  type: 'label',
                  label: '计划名称',
                  prop: 'planName',
                },
                {
                  type: 'label',
                  label: '发布人',
                  prop: 'publishUser',
                },
                {
                  type: 'label',
                  label: '发布时间',
                  prop: 'publishDate',
                  formatter: (value) => {
                    return this.moment(value).format("YYYY-MM-DD HH:mm:ss");
                  }
                },
                {
                  type: 'label',
                  label: '处理状态',
                  prop: 'status',
                  formatter(value) {
                    switch (value) {
                      case 1:
                        return '处理中';
                        break;
                      case 2:
                        return '已受理';
                        break;
                      case 3:
                        return '驳回';
                        break;
                    }
                  }
                },
                {
                  type: 'file',
                  label: 'file4',
                  prop: 'fileList',
                }
              ]
            }
          ]
        }
      }
    },
    methods: {
      setValue() {
        // this.data2 = this.data1
        console.log(this.data2)
      }
    }
  }
</script>
