<template>
  <div>
    <Header v-bind="headerData"></Header>
    <Nav :menus="$store.state.menu.navs" :active="$store.state.menu.activeNav" @menu-click="navClick"></Nav>
    <LeftMenu :menus="$store.state.menu.leftMenus" :active="$store.state.menu.activeLeft"
              @menu-click="leftClick"></LeftMenu>
    <div class="content_right">
      <crumbs :name="$store.state.menu.activeLeft.name"/>
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
        leftMenuData: {
          menus: []
        },
        headerData: {
          isLogin: '',
          userName: '',
          msgNum: 0,
          goodsNum: 0
        },
      }
    },
    computed: {},
    methods: {
      navClick(nav) {
        const nextNav = _.find(this.navData.menus, {'id': nav.id});
        if (nextNav.isVue) {
          this.$router.push(nav.url)
          this.generateLeftMenu(nextNav.subMenus)
        } else {
          // console.log('%c env:','background:#aaa;color:#bada55',location.origin+nextNav.url)
          window.location.href = location.origin + nextNav.url;
        }

      },
      leftClick(menu) {
        this.$store.dispatch('setActiveLeft', menu)
        this.$router.push({name: menu.url})
      },
      getHeaderData() {
        //获取用户信息
        this.axios.post(this.appConfig.api('nouser/SelectUserInfoBusiService'))
          .then((response) => {
            console.log('获取用户信息', response);
            var data = response;
            this.$store.dispatch('setUserInfo', data);
            this.headerData.userName = data.userName;
            this.headerData.isLogin = data.login;
          }).then(() => {
          if (this.headerData.isLogin) {
            //获取菜单数据
            this.axios.get(this.appConfig.api('', 'menu'))
              .then((response) => {
                console.log('获取菜单数据:', response);
                let data = response;
                this.generateNav(data)
              })
            //获取购物车商品数量
            this.axios.post(this.appConfig.api('nouser/SelectTypeByUserIdBusiService'))
              .then((response) => {
                console.log('获取购物车商品数量:', response);
                var data = response;
                this.headerData.goodsNum = data.count;
              })
            //获取站内消息数量
            this.axios.post(this.appConfig.api('nouser/SelectUnReadCountBusiService'))
              .then((response) => {
                console.log('获取站内消息数量:', response);
                var data = response;
                this.headerData.msgNum = data.count;
              })
          } else {
            if (process.env.NODE_ENV === 'production') {
              window.location.href = window.location.origin;
            }
          }
        })

      },
      generateNav(data) {
        let navMenus = [];
        let activeNav;
        let leftMenus = [];
        // console.log('%c this.$route:','background:#aaa;color:#bada55',this.$route)
        data.forEach(item => {
          item.subMenus.forEach(child => {
            child.subMenus.forEach(sec => {
              if (sec.menuCode === this.$route.name) {
                activeNav = {
                  code: item.menuCode,
                  name: item.menuName,
                  url: item.menuUrl,
                };
                leftMenus = item.subMenus;
                return false;
              }
            })
            if (activeNav) {
              return false;
            }
          });
          if (activeNav) {
            return false;
          }
        });
        if (!activeNav) {
          activeNav = JSON.parse(sessionStorage.getItem('activeNav'));
        }
        if(leftMenus.length===0){
          let sessionLeftMenus=JSON.parse(sessionStorage.getItem('leftMenus'))
          leftMenus = sessionLeftMenus.length>0?sessionLeftMenus:null;
        }
        console.log('leftMenus',leftMenus)
        data.forEach(item => {
          if (!activeNav) {
            activeNav = {
              code: item.menuCode,
              name: item.menuName,
              url: item.menuUrl,
            };
            leftMenus = item.subMenus;
          }
          navMenus.push({
            code: item.menuCode,
            name: item.menuName,
            url: item.menuUrl,
            subMenus: item.subMenus,
            isVue: item.menuCode.split('|')[1]
          })
        })
        this.$store.dispatch('setNavMenus', navMenus)
        this.$store.dispatch('setActiveNav', activeNav)
        this.generateLeftMenu(leftMenus)
      },
      generateLeftMenu(menus) {
        let leftMenus = [];
        let activeLeft;
        menus.forEach(item => {
          let menu = {
            isShow: true,
            code: item.menuCode||item.code,
            name: item.menuName||item.name,
            url: item.menuUrl||item.url,
            subMenus: []
          };
          if (item.subMenus) {
            item.subMenus.forEach((child) => {
              let subMenu = {
                code: child.menuCode||child.code,
                name: child.menuName||child.name,
                url: child.menuUrl||child.url,
              };
              if (!activeLeft && (this.$route.name === subMenu.url)) {
                activeLeft = subMenu;
              }
              menu.subMenus.push(subMenu)
            })
          }
          leftMenus.push(menu)
        });

        if (!activeLeft) {
          activeLeft = JSON.parse(sessionStorage.getItem('activeLeft'));
        }
        this.leftMenuData.menus = leftMenus
        this.$store.dispatch('setLeftMenus', leftMenus)
        this.$store.dispatch('setActiveLeft', activeLeft)
      }
    },
    created() {
      this.getHeaderData();
    }
  }
</script>
<style>
</style>
