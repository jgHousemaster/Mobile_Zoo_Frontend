//index.js
//获取应用实例
const { $Toast } = require('../../dist/base/index');
const app = getApp();
var globalId = "0";
var globalStatus = "init";
Page({
  data: {
    current:"search",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
  },
  uploadHandler: function () {
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      count: 1,
      success: res => {
        const tempFilePaths = res.tempFilePaths
        wx.showLoading({
          title: '加载中',
        })
        wx.uploadFile({
          url: 'https://zoo.scubrl.org/upload/', 
          filePath: tempFilePaths[0],
          name: 'pic',
          formData: {
            user: 'test'
          },
          success(res) {
            var tmp = JSON.parse(res.data)
            globalId = tmp.id
            globalStatus = tmp.status
          },
        })
        while(globalStatus != 'done'){
          wx.request({
            url: 'https://zoo.scubrl.org/getStatus/',
            data: {
              id: globalId
            },
            method: 'post',
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              globalStatus = res.data.slice(8)
              console.log(globalStatus)
              if (globalStatus == "done")
                wx.hideLoading()
                wx.navigateTo({
                  url: '/pages/animalInfo/index',
                })
            }
          })
          //setTimeout(function () {},5)
          globalStatus = 'done'
        }
      }
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
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
