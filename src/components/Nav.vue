<template>
  <!--供应商导航栏-->
  <div class="nav-supplier">
    <div class="inner fix">
      <a v-bind:href="baseUrl+'html/portal/index.html'" class="logo-shopping"></a>
      <ul class="fl fix">
        <li v-for="nav in menus" :class="{active:nav.code==active.code}"><a :href="baseUrl+nav.url" v-on:click.prevent="menuClick(nav)">{{nav.name}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      baseUrl:{
        default:''
      },
      active:{
        default(){
          return {};
        }
      },
      menus:{
        type:Array,
        default(){
          return []
        }
      },
    },
    methods: {
      menuClick(nav) {
        if(this.active.code!=nav.code){
          this.$emit('menu-click',nav);
        }
      },
    }
  }
</script>
