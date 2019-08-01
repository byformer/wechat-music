//index.js
//获取应用实例
/* const app = getApp() */

Page({
  data: {
     btn:'立即登录',
    
  
  },
  //事件处理函数
  bindViewTap: function() {
 
  },
  onLoad: function () {
  
  },
  getUserInfo: function(e) {

  },
  onTapDayWeather:function(e){
    wx.navigateTo({
        url: '/pages/login/login',
      }),
      wx.showToast({
        title:'',
        icon:'loading',
        duration:1000,
      })
  }
})
