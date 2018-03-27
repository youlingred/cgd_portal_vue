<template>
  <div class="crumbs">
    <ul class="crumbs-area fix">
      <li class="fl">{{name}}</li>
    </ul>
  </div>
</template>
<script>
  export default {
    props:{
      name:{
        default:"面包屑"
      }
    },
    data(){
      return {

      }
    },
  }
</script>
