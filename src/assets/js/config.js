const config = {
  prov: 3,
  apiBaseurl () {
    switch (this.prov) {
      default:
        return 'http://47.94.134.239:8080/'
    }
  },
  api (serverId, type) {
    switch (type) {
      case 'menu':
        return this.apiBaseurl() + 'pages/user/menus'
      default:
        return this.apiBaseurl() + 'rest/service/routing/' + serverId
    }
  },
}
export default config
