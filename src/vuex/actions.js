const actions = {
  setNavMenus({commit},menus){
    commit('setNavMenus',menus)
  },
  setActiveNav({commit},active){
    sessionStorage.setItem('activeNav',JSON.stringify(active))
    commit('setActiveNav',active)
  },
  setLeftMenus({commit},menus){
    sessionStorage.setItem('leftMenus',JSON.stringify(menus))
    commit('setLeftMenus',menus)
  },
  setActiveLeft ({ commit }, active) {
    sessionStorage.setItem('activeLeft',JSON.stringify(active))
    commit('setActiveLeft', active)
  },
  setUserInfo ({ commit }, info) {
    commit('setUserInfo', info)
  },
}
export default actions
