const config = {
  prov: 3,
  portalBaseurl () {
    switch (this.prov) {
      default:
        return 'http://39.107.71.15:8080/'
      // return 'http://192.168.2.156:9081/'
    }
  },
  apiBaseurl () {
    switch (this.prov) {
      default:
        return 'http://127.0.0.1:9081/'
            // return 'http://192.168.2.156:9081/'
    }
  },
  api (service, type) {
    switch (type) {
      case 'menu':
        return this.apiBaseurl() + 'pages/user/menus';
      case 'upload':
        return this.apiBaseurl() +'/rest/upload/uploadfiletooss'
      case 'down':
        return this.apiBaseurl() +'/rest/download'+ service
      default:
        return this.apiBaseurl() + 'rest/service/routing/' + service
    }
  },
}
export default config
