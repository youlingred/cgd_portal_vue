const config = {
  prov: 3,
  apiBaseurl () {
    switch (this.prov) {
      default:
        // return 'http://39.107.71.15:8080/'
            return 'http://192.168.2.156:9081/'
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
