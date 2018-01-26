<template>
  <div class="crumbs">
    <ul class="crumbs-area fix">
      <li class="fl">{{title}}</li>
    </ul>
  </div>
</template>
<script>
  export default {
    // props:{
    //   name:{
    //     default:"面包屑"
    //   }
    // }
    data(){
      return {

      }
    },
    computed:{
      title(){
        return this.$store.state.activeLeftMenu.name;
      }
    }
  }
</script>
