const mutations = {
  setActiveLeftMenu(state, active) {
    state.activeLeftMenu = active
  },
  setUserInfo(state, info) {
    _.assign(state.userInfo,info);
  },
}
export default mutations
