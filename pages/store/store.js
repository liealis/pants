// pages/store/store.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',
    openid:'',
    nameFocus:false,
    nameValue:'',
    mobileValue:'',
    addressValue:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  formSubmit: function (e) {
    let region =  this.data.region;
    let openid = app.globalData.openid;
    // console.log(openid)
    let data = e.detail.value;
    data['province'] =  region[0]
    data['city'] = region[1]
    data['borough'] = region[2]
    data['openid'] = openid
    console.log(typeof (data))
    // wx.request({
    //   url: 'http://dev.ci.com/index.php/api/Wx_order/createOrder',
    //   method:'POST',
    //   header:{
    //     'content-type':'application/x-www-form-urlencoded'
    //   },
    //   data:{
    //     'data': JSON.stringify(data)
    //   },
    //   success: res=>{
    //     console.log(res.data)
    //   }
    // })
  },
  /**
   * 检测用户名是否合法
   * step 1 ——检测是否为中文
   * step 2 ——非中文姓名，检测是否符合英文名格式
   */
  checkName: function (e) {
    var self = this
    let reg = new RegExp(/^(?![\\p{P}\\p{S}])[\u4e00-\u9fa5]+$/)  //正则式，中文不包括“标点符号 特殊字符“ 
    let reg2 = new RegExp(/^[a-zA-Z0-9]{3,16}$/) //正则式2
    let name = e.detail.value
    // console.log(reg.test(name))
    if (reg.test(name) == false || name.length >= 6 || name.length < 2) {
      // console.log(reg2.test(name))
      if (reg2.test(name) == false) {
        wx.showModal({
          title: '提示',
          confirmText: '修改',
          cancelText: '取消',
          content: '请输入正常用户名【纯中文名(2-6个字），或3-16位英文+数字组合】',
          success: function (res) {
            if (res.confirm) {
              self.bindButtonTap();
            } else if (res.cancel) {
              self.setData({
                nameFocus: false
              })
            }
          }
        })
      }
    }
  },
  // 检测手机号是否合格
  checkMobile: function (e) {
    let mobile = e.detail.value
    let reg = new RegExp(/^(13[0-9]|14[57]|15[012356789]|18[0-9]|17[03768])\d{8}$/)
    if (reg.test(mobile) == false) {
      wx.showToast({
        title: '请核对您的手机号',
        duration: 1000
      })
    }
    this.setData({
      mobileValue: mobile
    })
  },
  // 检测具体地址是否合格
  checkAddress: function(e){
    let address = e.detail.value
    // let reg = 
  },
  // 使得input获取焦点
  bindButtonTap: function () {
    this.setData({
      nameFocus: true
    })
  },
}) 