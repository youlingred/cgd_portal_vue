const mutations = {
  setNavMenus(state,menus){
    state.menu.navs=menus;
  },
  setActiveNav(state,active){
    state.menu.activeNav=active;
  },
  setLeftMenus(state,menus){
    state.menu.leftMenus=menus;
  },
  setActiveLeft(state,active){
    state.menu.activeLeft=active;
  },
  setUserInfo(state, info) {
    _.assign(state.userInfo,info);
  },
}
export default mutations
