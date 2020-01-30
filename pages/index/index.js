//index.js
//获取应用实例
// 个人网易云音乐 ID  66919655

// const theAPI = `https://xgformer.com`

var app = getApp()
Page({
    data: {
        inputShowed: false,
        inputVal: "",
        tabs: ["个性推荐", "歌单", "主播电台", "排行榜"],
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
        swiperList: [{
            id: 0,
            type: 'image',
            url: 'https://s2.ax1x.com/2020/01/16/lvsYGD.jpg '
        }, {
            id: 1,
            type: 'image',
            url: 'https://s2.ax1x.com/2020/01/16/lvsdsA.jpg',
        }, {
            id: 2,
            type: 'image',
            url: 'https://s2.ax1x.com/2020/01/16/lvs6JS.jpg'

        }],
     
        list: [
            {
                id: 0,
                type: 'image',
                url: 'https://xgformer.com/wp-content/uploads/2019/07/banner1-1.jpg'
            },{
                id: 1,
                type: 'image',
                url: 'https://xgformer.com/wp-content/uploads/2019/07/banner5-1024x447.jpg'
            },{
                id: 2,
                type: 'image',
                url: 'https://xgformer.com/wp-content/uploads/2019/07/banner6.jpg'
            }],
        itemList: [
            {
                id: 0,
                type: 'image',
                url: 'https://xgformer.com/wp-content/uploads/2019/07/banner4.jpg'
            },{
                id: 1,
                type: 'image',
                url: 'https://xgformer.com/wp-content/uploads/2019/07/banner3-1.jpg '
            },{
                id: 2,
                type: 'image',
                url: 'https://xgformer.com/wp-content/uploads/2019/07/banner2.jpg'
            }
        ],
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
        wx.request({
            url: 'http://musicapi.leanapp.cn/personalized',
            headers: {
                'Content-Type': 'application/json'
            },
            success: function (res) {
                //将获取到的json数据，存在名字叫list的这个数组中
                that.setData({
                    list: res.data.result,
                    //res代表success函数的事件对，data是固定的，list是数组
                })
                console.log(res);
            }
        })

        wx.request({
            url: 'http://musicapi.leanapp.cn/top/playlist',
            data: {},
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
                that.setData({
                    itemList: res.data.playlists,
                })
                console.log(res);
            },
            fail: function () {
                // fail
            },
            complete: function () {
                // complete
            }
        })

        wx.request({
            url: 'http://musicapi.leanapp.cn/personalized/djprogram',
            data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
                that.setData({
                    radio: res.data.result,
                })
                console.log(res);
            },
            fail: function () {
                // fail
            },
            complete: function () {
                // complete
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