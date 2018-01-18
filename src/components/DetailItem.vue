<template>
  <!--展示组件-->
  <label v-if="type === 'label'">{{value}}</label>
  <div v-else-if="type === 'file'">
    <span style="display:inline-block;min-width:200px">{{value}}</span>
    <a :href="data[prop_url]"
       target="_blank" class="downloadMessage"><span class="">下载</span>
    </a>
  </div>
  <!--编辑组件-->
  <el-input v-else-if="type === 'input'" v-model="value"></el-input>
</template>
<script>
  export default {
    props: {
      data: {
        default() {
          return {};
        }
      },
      type: {
        default: 'label'
      },
      formatter: {
        type: Function
      },
      prop: {
        default: ''
      },
      prop_url: {
        default: ''
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
        },
        set(){

        }
      }
    }
  }
</script>
