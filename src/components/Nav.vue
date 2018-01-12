<template>
  <!--供应商导航栏-->
  <div class="nav-supplier">
    <div class="inner fix">
      <a v-bind:href="baseUrl+'html/portal/index.html'" class="logo-shopping"></a>
      <ul class="fl fix">
        <li v-for="nav in menus" :class="{active:nav.id==activeItem}"><a :href="baseUrl+nav.url" v-on:click.prevent="menuClick(nav.id)">{{nav.name}}</a>
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
            {
              id:'',
              url: 'test',
              name: 'test'
            },
            {
              id:'',
              url: 'test1',
              name: 'test1'
            }
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
      menuClick(active) {
        console.log(active,this.activeItem)
        if(this.activeItem!=active){
          this.activeItem=active;
        }
      },
    }
  }
</script>
