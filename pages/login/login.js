Page({
    data: {
        logo:'../../images/logo.png',
        email:'',
        Password:''
    },
 login:function(e){
   wx.showToast({
     title:'登录中',
     icon:'loading',
     duration:3000,
   });
  //  请求开始
 wx.request({
   url: 'http://musicapi.leanapp.cn/login?email=xxx@163.com&password=yyy',
  
 })
 }
})