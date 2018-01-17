<template>
  <label v-if="type === 'label'">{{value}}</label>
  <div v-else-if="type === 'file'">
    <span style="display:inline-block;min-width:200px">{{value}}</span>
    <a :href="data[prop_url]"
       target="_blank" class="downloadMessage"><span class="">下载</span></a>
  </div>
</template>
<script>
  export default {
    props: {
      data:{
        default(){
          return {};
        }
      },
      type: {
        default: 'label'
      },
      formatter:{
        type:Function
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
    computed:{
      value(){
        if(this.formatter){
          return this.formatter(this.data[this.prop])
        }
        return this.data[this.prop]
      }
    }
  }
</script>
