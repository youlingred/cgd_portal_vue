<template>
  <div>
    <Header v-bind="headerData"></Header>
    <Nav v-bind="navData"></Nav>
    <LeftMenu v-bind="leftMenuData"></LeftMenu>
    <div class="content_right">
      <Crumbs></Crumbs>
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
    data() {
      return {
        headerData: {
          isLogin: false,
          userName: '',
          msgNum: 1,
          goodsNum: 2
        },
        navData: {},
        leftMenuData:{}
      }
    },
    components: {
      Header,
      Nav,
      LeftMenu,
      Crumbs
    },
    methods: {
      getHeaderData() {
        //获取用户信息
        this.axios.post(this.appConfig.api('nouser/SelectUserInfoBusiService'))
          .then((response) => {
            console.log(response.data.data);
            var data = response.data.data;
            this.headerData.isLogin = data.login;
            this.headerData.userName = data.userName;
          })
          .catch(function (error) {
            console.log(error);
          });
        //获取购物车商品数量
        this.axios.post(this.appConfig.api('nouser/SelectTypeByUserIdBusiService'))
          .then((response) => {
            console.log(response.data.data);
            var data = response.data.data;
            this.headerData.goodsNum = data.count;
          })
          .catch(function (error) {
            console.log(error);
          });
        //获取站内消息数量
        this.axios.post(this.appConfig.api('nouser/SelectUnReadCountBusiService'))
          .then((response) => {
            console.log(response.data.data);
            var data = response.data.data;
            this.headerData.msgNum = data;
          })
          .catch(function (error) {
            console.log(error);
          });
        //获取菜单消息数量
        console.log(this.appConfig.api('', 'menu'))
        this.axios.get(this.appConfig.api('', 'menu'))
          .then((response) => {
            console.log(response.data.data);
            let data = response.data.data;
            let activeMenu;
            let navMenus = [];
            let leftMenus = [];
            data.forEach((item) => {
              if (!activeMenu) {
                activeMenu = item.autoId;
              }
              navMenus.push({id: item.autoId, name: item.menuName, url: item.menuUrl})
            })
            this.navData = {
              activeMenu: activeMenu,
              menus: navMenus
            }
            data[0].subMenus.forEach((item) => {
              let menu = {
                isShow: true,
                code: item.menuCode,
                name: item.menuName,
                subMenus: []
              };
              if (item.subMenus) {
                item.subMenus.forEach((child) => {
                  let subMenus = {
                    code: child.menuCode,
                    name: child.menuName
                  };
                  menu.subMenus.push(subMenus)
                })
              }
              leftMenus.push(menu)
            });
            this.leftMenuData={
              menus:leftMenus
            }
            console.log('leftMenuData',this.leftMenuData)
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    created() {
      this.getHeaderData()
    }
  }
</script>
<style>
</style>
