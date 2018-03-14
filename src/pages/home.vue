<template>
  <div>
    <Header v-bind="headerData"></Header>
    <Nav v-bind="navData" @menu-click="navClick"></Nav>
    <LeftMenu v-bind="leftMenuData"></LeftMenu>
    <div class="content_right">
      <crumbs/>
      <div class="table-list-group">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
  import Header from '@/components/Header.vue'
  import Nav from '@/components/Nav.vue'
  import LeftMenu from '@/components/LeftMenu.vue'
  import Crumbs from '@/components/Crumbs.vue'

  export default {
    components: {
      Header,
      Nav,
      LeftMenu,
      Crumbs
    },
    data() {
      return {
        navData: {},
        leftMenuData:{
          menus:[]
        }
      }
    },
    computed:{
      headerData(){
        return{
          isLogin: this.$store.state.userInfo.login,
          userName: this.$store.state.userInfo.userName,
          msgNum: 1,
          goodsNum: 2
        }
      },
    },
    methods: {
      navClick(nav){
        this.$router.push(nav.url)
        const nextNav=_.find(this.navData.menus, {'id':nav.id});
        if(nextNav.isVue){
          this.$router.push(nav.url)
          // console.log('%c env:','background:#aaa;color:#bada55',nextNav)
          this.generateLeftMenu(nextNav.subMenus)
        }else{
          // console.log('%c env:','background:#aaa;color:#bada55',location.origin+nextNav.url)
          window.location.href=location.origin+nextNav.url;
        }

      },
      getHeaderData() {
        //获取用户信息
        this.axios.post(this.appConfig.api('nouser/SelectUserInfoBusiService'))
          .then((response) => {
            console.log(response);
            var data = response;
            this.$store.dispatch('setUserInfo',data)
          })
          .catch(function (error) {
            console.log(error);
          });
        //获取购物车商品数量
        this.axios.post(this.appConfig.api('nouser/SelectTypeByUserIdBusiService'))
          .then((response) => {
            console.log(response);
            var data = response;
            this.headerData.goodsNum = data.count;
          })
          .catch(function (error) {
            console.log(error);
          });
        //获取站内消息数量
        this.axios.post(this.appConfig.api('nouser/SelectUnReadCountBusiService'))
          .then((response) => {
            console.log(response);
            var data = response;
            this.headerData.msgNum = data;
          })
          .catch(function (error) {
            console.log(error);
          });
        //获取菜单消息数量
        console.log(this.appConfig.api('', 'menu'))
        this.axios.get(this.appConfig.api('', 'menu'))
          .then((response) => {
            console.log(response);
            let data = response;
            this.generateNav(data)
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      generateNav(data){
        let activeMenu;
        let navMenus = [];
        let subMenus = [];
        // console.log('%c this.$route:','background:#aaa;color:#bada55',this.$route)
        data.forEach(item=>{
          item.subMenus.forEach(child=>{
            child.subMenus.forEach(sec=>{
              if(sec.menuCode===this.$route.name){
                activeMenu=item.autoId;
                subMenus=item.subMenus;
                return false;
              }
            })
            if(activeMenu){
              return false;
            }
          });
          if(activeMenu){
            return false;
          }
        });
        data.forEach(item => {
          if (!activeMenu) {
            activeMenu = item.autoId;
            subMenus = item.subMenus;
          }
          navMenus.push({id: item.autoId, name: item.menuName, url: item.menuUrl,subMenus:item.subMenus,isVue:item.isVue})
        })
        this.navData = {
          activeMenu: activeMenu,
          menus: navMenus
        }
        this.generateLeftMenu(subMenus)
      },
      generateLeftMenu(subMenus){
        let leftMenus = [];
        subMenus.forEach(item => {
          let menu = {
            isShow: true,
            code: item.menuCode,
            name: item.menuName,
            url:item.menuUrl,
            subMenus: []
          };
          if (item.subMenus) {
            item.subMenus.forEach((child) => {
              let subMenu = {
                code: child.menuCode,
                name: child.menuName,
                url:child.menuUrl
              };
              if(this.$route.name===subMenu.url)(
                this.$store.dispatch('setActiveLeftMenu',subMenu)
              )
              menu.subMenus.push(subMenu)
            })
          }
          leftMenus.push(menu)
        });
        this.leftMenuData.menus=leftMenus
        // console.log('leftMenuData',this.leftMenuData)
      }
    },
    created(){
      this.getHeaderData();
    }
  }
</script>
<style>
</style>
