<template>
  <div class="shortcut-blue">
    <div class="inner fix">
      <ul class="shortcut-left fix">
        <li class="user">
          <a :href="userStateUrl" class="header-login btn-login">{{ userStateName }}</a>
          <a :href="loginOrOutUrl" :target="NODE_ENV==='production'?'_self':'_blank'" class="login btn-login">{{ loginOrOutName }}</a>
        </li>
        <li class="msg" v-if="isLogin"><a v-bind:href="msgUrl" target="_blank">
          <!--<svg>-->
          <!--<use xlink:href="#icons-msg"/>-->
          <!--</svg>-->
          消息<i style="color: #cc3333" v-if="msgNum!=0">（{{ msgNum }}）</i></a></li>
      </ul>
      <ul class="shortcut-right fix">
        <li v-for="item in menus" v-if="item.requireLogin==isLogin || !item.requireLogin">
          <a v-bind:href="item.url"class="btn-link">{{item.name}}
            <i class="shopping-num" v-if="item.name=='我的购物车'&&goodsNum!=0">({{ goodsNum
          }})</i>
          </a>
        </li>
        <li class="phone">
          <a href="#">
            <!--<svg>-->
            <!--<use xlink:href="#icons-phone"/>-->
            <!--</svg>-->
            手机</a>
          <div class="box">
            <div class="code-area">
              <img src="./../assets/img/code.jpg">
            </div>
          </div>
        </li>
        <li class="collect"><a href="collect" class="btn-login" v-on:click="collect">
          <!--<svg>-->
          <!--<use xlink:href="#icons-enshrine"/>-->
          <!--</svg>-->
          收藏网站</a></li>
        <li class="tel"><a href="#">客服电话<span>{{tel}}</span></a></li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      //是否登录
      isLogin: {
        type: Boolean,
        default: false,
      },
      msgNum: {
        type: [String, Number],
        default: 0
      },
      goodsNum: {
        type: [String, Number],
        default: 0
      },
      //客服电话
      tel: {
        type: [String, Number],
        default: '400-010-4000'
      },
      userName:{
        type: [String],
        default: ''
      }
    },
    data() {
      return {}
    },
    computed: {
      NODE_ENV(){
        return process.env.NODE_ENV;
      },
      baseUrl(){
        if (process.env.NODE_ENV === 'production') {
          return window.location.origin+'/';
        }
        return this.appConfig.apiBaseurl();
      },
      //菜单
      menus(){
          return [
            {
              name: '商城首页',
              url: this.baseUrl,
              requireLogin: false,
            },
            {
              name: '我的E购',
              url: `${this.baseUrl}html/supplier/memberCenter.html?pageTag=我的首页&root_menu_code=startPage`,
              requireLogin: true,
            },
            {
              name: '我的购物车',
              url: `${this.baseUrl}html/portal/cart.html?type=2`,
              requireLogin: false,
            },
            {
              name: '帮助中心',
              url: `${this.baseUrl}html/portal/helpCenter.html`,
              requireLogin: false,
            }
          ]
      },
      //登录URL地址
      loginUrl(){
        return `${this.baseUrl}rest/skip?callBackUrl=${window.location.origin}`
      },
      //登出URL地址
      logoutUrl(){
        return `${this.baseUrl}j_spring_cas_security_logout`
      },
      //注册URL地址
      regUrl(){
        return `${this.baseUrl}html/portal/register.html`
      },
      //用户信息URL地址
      memberInfoUrl(){
        return `${this.baseUrl}html/portal/information.html`
      },
      //消息URL地址
      msgUrl(){
        return `${this.baseUrl}html/portal/information.html`
      },
      userStateUrl: function () {
        if (this.isLogin) {
          return this.memberInfoUrl
        } else {
          return this.regUrl
        }
      },
      loginOrOutUrl: function () {
        if (this.isLogin) {
          return this.logoutUrl
        } else {
          return this.loginUrl
        }
      },
      userStateName: function () {
        if (this.isLogin) {
          return this.userName
        } else {
          return '注册'
        }
      },
      loginOrOutName: function () {
        if (this.isLogin) {
          return '退出'
        } else {
          return '登录'
        }
      }
    },
    methods:{
      // 收藏
      collect: function (event) {
        event.preventDefault();
        var bookmarkUrl = "https://www.neep.shop/business_portal/html/portal/index.html";
        var bookmarkTitle = "neep";
        if( window.external.AddFavorite || document.all) { // For IE Favorite
          window.external.AddFavorite( bookmarkUrl, bookmarkTitle);
        } else { // for other browsers which does not support
          alert('浏览器不支持,请按 Ctrl+D 手动收藏!');
          return false;
        }
      }
    }
  }
</script>
