<template>
  <label v-if="type === 'label'">{{data[prop]}}</label>
  <div v-else-if="type === 'file'">
    <span style="display:inline-block;min-width:200px">{{data[prop]}}</span>
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
      prop: {
        default: ''
      },
      prop_url: {
        default: ''
      },
    },
    data() {
      return {}
    }
  }
</script>
