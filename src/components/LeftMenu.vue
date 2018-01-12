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
            <li v-for="val in value.subMenus" class="list-group-item" :class="{tive:val.code==activeItem}">
              <router-link :to="{nme:'child'}"  class="list-group-item-title" v-on:click.prevent="subMenuClick(val.code)">{{val.name}}</router-link>
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
              subMenus: [{
                name: 'test1-1',
                code: 'test'
              }]
            },
            {
              isShow: true,
              code:'',
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
          return this.activeMenuId
        },
        set:function(active){
          this.activeMenuId=active
        }
      }
    },
    methods: {
      menuClick(item) {
        item.isShow=!item.isShow
      },
      subMenuClick(active) {
        console.log(active,this.activeItem)
        if(this.activeItem!=active){
          this.activeItem=active;
        }
      },
    }
  }
</script>

