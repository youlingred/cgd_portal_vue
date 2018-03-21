<template>
  <!--供应商导航栏-->
  <div class="nav-supplier">
    <div class="inner fix">
      <a v-bind:href="baseUrl+'html/portal/index.html'" class="logo-shopping"></a>
      <ul class="fl fix">
        <li v-for="nav in menus" :class="{active:nav.id==activeItem}"><a :href="baseUrl+nav.url" v-on:click.prevent="menuClick(nav)">{{nav.name}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      activeMenu:{
        default:''
      },
      baseUrl:{
        default:''
      },
      menus:{
        type:Array,
        default(){
          return [
          ]
        }
      }
    },
    data() {
      return {
        activeMenuId:0
      }
    },
    computed:{
      activeItem:{
        get:function (){
          return this.activeMenuId || this.activeMenu
        },
        set:function(active){
          this.activeMenuId=active
        }
      }
    },
    methods: {
      menuClick(nav) {
        if(this.activeItem!=nav.id){
          this.activeItem=nav.id;
          this.$emit('menu-click',nav);
        }
      },
    }
  }
</script>
