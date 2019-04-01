//index.js
//获取应用实例
const app = getApp();
function request(tmp_status, tmp_id) {
  if (tmp_status != 'done') {
    wx.request({
      url: 'https://zoo.scubrl.org/getStatus/',
      data: {
        id: tmp_id
      },
      method: 'post',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        tmp_status = res.data.status
        console.log(tmp_status)
        if (tmp_status == "done") {
          wx.hideLoading()
          app.globalData.uploading = 0
          wx.request({
            url: 'https://zoo.scubrl.org/animalInfo/',
            data: {
              id: 0
            },
            method: 'POST',
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              app.globalData.globalKind = res.data.name
            }
          })
          wx.navigateTo({
            url: '/pages/animalInfo/index',
          })
        }
        else{
          setTimeout(function () {
            request(tmp_status, tmp_id)
          }, 1000)
        }
      }
    })
  }
};

Page({
  data: {
    current:"search",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  handleChange({ detail }) {
    if (app.globalData.uploading == 0){
      this.setData({
        current: detail.key
      });
    }
  },
  uploadHandler: function () {
    if(app.globalData.uploading == 0){
      wx.chooseImage({
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        count: 1,
        success: res => {
          app.globalData.uploading = 1;
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
              app.globalData.globalId = tmp.id
              console.log(app.globalData.globalId)
              request(tmp.status, tmp.id)
            },
          })
        }
      })
    }
  },
  onLoad: function () {
    var that = this;
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
