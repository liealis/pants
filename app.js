//app.js
App({
<<<<<<< HEAD
  onLaunch: function () {
=======
  onLaunch: function (res) {
>>>>>>> 从mac出上传小程序代码
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
<<<<<<< HEAD
=======
    //赋值场景值
    this.globalData.scene = res.scene;
>>>>>>> 从mac出上传小程序代码

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
<<<<<<< HEAD
          url: 'http://dev.ci.com/index.php/api/Wx_login/wx_code',
=======
          url: 'http://dev.ci.com:8888/index.php/api/Wx_login/wx_code',
>>>>>>> 从mac出上传小程序代码
          data:{
            code:res.code
          },
          header:{
<<<<<<< HEAD
            'content-type':'application/x-www-form-urlencode'
          },
          method:'post',
          success: res =>{
            this.globalData.openid = res.data.openid;
          }
        
=======
            'content-type':'application/x-www-form-urlencoded'
          },
          method:'POST',
          success: res => {
            this.globalData.openid = res.data.openid;
            // 将获取到的openid存入本地
            wx.setStorage({
              key: 'openid',
              data: res.data.openid,
            })
          }
>>>>>>> 从mac出上传小程序代码
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
<<<<<<< HEAD

=======
              // 将获取到的用户信息存入本地
              wx.setStorage({
                key: 'userInfo',
                data: res.userInfo,
              })
>>>>>>> 从mac出上传小程序代码
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
<<<<<<< HEAD
    openid:''
=======
    openid:'',
    scene:'',
>>>>>>> 从mac出上传小程序代码
  }
})