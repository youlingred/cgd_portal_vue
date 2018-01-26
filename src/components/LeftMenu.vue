<template>
  <div class="nav_left" id="leftmenu">
    <div class="supplier_leftmenu">
      <!--<h2 class="leftmemu-title" v-if="menutitle"><i class="abs glyphicon-menu-left"></i>{{menuName || ""}}</h2>-->
      <ul>
        <li v-for="value in menus" class="memu-item" v-bind:class="{tive:value.isShow}">
          <a href="javascript:;" class="memu-item-title" v-on:click.prevent="menuClick(value)">{{value.name || ""}}
            <i class="abs glyphicon-add-left"></i>
          </a>
          <ul class="list-group">
            <li v-for="val in value.subMenus" class="list-group-item" :class="{tive:val.code===active.code}">
              <router-link :to="{name:val.url}"  class="list-group-item-title" v-on:click.prevent.native="subMenuClick(val)">{{val.name}}</router-link>
              <i class="abs glyphicon-arrows-right dn"></i>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    props:{
      menus:{
        default:function (){
          return [
            {
              isShow: true,
              code:'',
              name: 'test',
              url:'',
              subMenus: [{
                name: 'test1-1',
                code: 'test',
                url:''
              }]
            },
            {
              isShow: true,
              code:'',
              name: 'test1',
              url:''
            }
          ]
        }
      }
    },
    data() {
      return {

      }
    },
    computed:{
      active:{
        get(){
          return this.$store.state.activeLeftMenu;
        },
        set(val){
          this.$store.dispatch('setActiveLeftMenu',val);
        }
      }
    },
    methods: {
      menuClick(item) {
        item.isShow=!item.isShow
      },
      subMenuClick(menu) {
        console.log(menu.url)
        if(this.active.code!=menu.code){
          this.active=menu;
          this.$emit('change',menu);
          this.$router.push({name:menu.url})
        }
      },
    },
  }
</script>

