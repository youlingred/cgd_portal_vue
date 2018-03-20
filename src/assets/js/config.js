const config = {
  prov: 5,
  apiBaseurl () {
    switch (this.prov) {
      case 3:
        return 'http://39.107.71.15:8080/';
      case 4:
        return 'http://127.0.0.1:9081/';
      case 5:
        return 'http://47.94.134.239:8080';
      default:
        return 'http://39.107.71.15:8080/';
    }
  },
  api (service, type) {
    switch (type) {
      case 'menu':
        return this.apiBaseurl() + 'pages/user/menus';
      case 'upload':
        return this.apiBaseurl() +'rest/upload/uploadfiletooss'
      case 'down':
        return this.apiBaseurl() +'rest/download'+ service
      default:
        return this.apiBaseurl() + 'rest/service/routing/' + service
    }
  },
}
export default config
