//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: 'http://dev.ci.com/index.php/api/Wx_login/wx_code',
          data:{
            'code': res.code
          },
          header:{
            'content-type':'application/x-www-form-urlencoded'
          },
          method:'post',
          success: res =>{
            if (res.statusCode == 200){
              // console.log(res.data)
              this.globalData.openid = res.data.openid;
              if (this.setOpenidCallback) {
                this.setOpenidCallback(res);
              }
            }else{
              wx.showToast({
                title: '网络错误',
                mask:true,
                duration:3000
              })
            }
          }       
        })
      },
      fail: res => {
        wx.showModal({
          title: '提示',
          content: '获取用户登录状态失败！'+ res.errMsg,
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
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            },
            fail:res=>{
              wx.showLoading({
                title: '系统内部错误',
                mask:true
              })
            }
          })
        }
      }
    })
  },
  onShow:function(){
    this.setOpenidCallback = res =>{
      try{
        wx.setStorageSync('openid', this.globalData.openid);
      }catch(e){
        console.log(e)
      }
    }
    this.userInfoReadyCallback = res =>{
      try{
        wx.setStorageSync('userInfo', this.globalData.useInfo)
      }catch(e){
        console.log(e)
      }
    }
  },
  globalData: {
    userInfo: null,
    openid:null
  },
})