//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    openidArray: ['oIyQg0VPzbgbbT4gzRHzrn4Vzmzq','222'],
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onReady: function(){
    var openid = app.globalData.openid;
    var userInfo = this.data.userInfo;
    console.log(userInfo)
    var scene = app.globalData.scene;
    if(this.isInArray(openid) === true){
      console.log('普通用户');
      wx.request({
        url: 'http://dev.ci.com/index.php/api/Wx_login/setUser',
        method: 'POST',
        data: {
          'openid' : openid,
          'scene' : scene,
          'userInfo' : JSON.stringify(userInfo)
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: res=>{
          console.log(res)
          setTimeout(function () {
            wx.redirectTo({
              url: '/pages/store/store',
            })
          }, 1000)
        }
      })
    }else{
      console.log('管理员账号')
      setTimeout(function(){
        wx.redirectTo({
          url: '/pages/admin/admin',
        })
      },1000)
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  isInArray:function(value){
    var arr = this.data.openidArray;
    for (var i = 0; i < arr.length; i++){
      if(value === arr[i]){
        return false;
      }else {
        return true;
      }
    }
  }
})
