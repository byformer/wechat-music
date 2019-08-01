//index.js
//获取应用实例
// 个人网易云音乐 ID  66919655

const theAPI = `https://xgformer.com`

var app = getApp()
Page({
    data: {
        inputShowed: false,
        inputVal: "",
        tabs: [],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0,
        imgUrls: [
            
        ],
        indicatorDots: true,
        autoplay: true,
        interval: 2000,
        duration: 1000,
        circular: true,
        //   个性推荐轮播
     
     
     
  
        radio: []

    },
    showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    hideInput: function () {
        this.setData({
            inputVal: "",
            inputShowed: false
        });
    },
    clearInput: function () {
        this.setData({
            inputVal: ""
        });
    },
    inputTyping: function (e) {
        let that = this
        console.log(e.detail)
        this.setData({
            inputVal: e.detail.value
        });
        // let url = `http://localhost:3000/search?keywords=${e.detail.value}`
        wx.request({
            url: 'http://neteasemusic.leanapp.cn/search',
            data: {
                keywords: e.detail.value
            },
            method: 'GET',
            success: function (res) {
                let temp = []
                if (!res.data.result.songs) {
                    return;
                }
                res.data.result.songs.forEach((song, index) => {

                    temp.push({
                        id: song.id,
                        name: song.name,
                        mp3Url: song.mp3Url,
                        picUrl: song.album.picUrl,
                        singer: song.artists[0].name
                    })
                    that.setData({
                        searchReault: temp
                    })


                })
                // 存入搜索的结果进缓存
                wx.setStorage({
                    key: "searchReault",
                    data: temp
                })
            },
            fail: function (res) {
                // fail
            },
            complete: function (res) {
                // complete

            }
        })
    },
    onShow: function () {
        wx.hideLoading()
    },
    onLoad: function () {
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
                });
            }
        })

       
    },
    tabClick: function (e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
    },
    tonow: function (event) {
        let songData = {
            id: event.currentTarget.dataset.id,
            name: event.currentTarget.dataset.name,
            mp3Url: event.currentTarget.dataset.songurl,
            picUrl: event.currentTarget.dataset.picurl,
            singer: event.currentTarget.dataset.singer
        }
        // 将当前点击的歌曲保存在缓存中
      /*   wx.setStorageSync('clickdata', songData)
        wx.switchTab({
            url: '../now/index'
        }) */
    },

});