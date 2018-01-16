<template>
  <label v-if="type === 'label'">{{value}}</label>
  <div v-else-if="type === 'file'">
    <span>{{value}}</span>
    <a :href="url"
       target="_blank" class="downloadMessage"><span class="">下载</span></a>
  </div>
</template>
<script>
  export default {
    props: ['type','value', 'url'],
    data() {
      return {}
    }
  }
</script>
