// pages/animalInfo/index.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: "result",
    picUrl: {},
    numResult: 0,
    index: 0,
    array: [],
  },
  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData)
    // var result = "" //储存处理后的识别结果
    var type = -1
    var arr = []
    // app.globalData.numResult = 5
    for (var i = 0; i < app.globalData.numResult; i++) {
      arr.push(i+1)
    }
    // if(app.globalData.speciesResult.length === 0){
    //   result += "无物种识别结果"
    // }
    // else{
    //   var speciesString = app.globalData.speciesResult.split('\n')
    //   for (var i = 0; i < speciesString.length; i++) {
    //     var index = speciesString[i].indexOf(":")
    //     if (index === -1)
    //       continue
    //     var name = speciesString[i].slice(0, index)
    //     if (name === "panda") {
    //       speciesString[i] = "大熊猫" + speciesString[i].slice(index)
    //       type = 0
    //     }
    //     else if (name === "red panda") {
    //       speciesString[i] = "小熊猫" + speciesString[i].slice(index)
    //       type = 1
    //     }
    //     else if (name === "peacock") {
    //       speciesString[i] = "孔雀" + speciesString[i].slice(index)
    //       type = 2
    //     }
    //     else if (name === "swan") {
    //       speciesString[i] = "天鹅" + speciesString[i].slice(index)
    //       type = 3
    //     }
    //     else if (name === "white crane") {
    //       speciesString[i] = "白鹤" + speciesString[i].slice(index)
    //       type = 4
    //     }
    //     else if (name === "siberian tiger"){
    //       speciesString[i] = "西伯利亚虎" + speciesString[i].slice(index)
    //       type = 5
    //     }
    //     else if (name === "cattle") {
    //       speciesString[i] = "牦牛" + speciesString[i].slice(index)
    //       type = 6
    //     }
    //     result += speciesString[i] + "\n"
    //   }
    // }
    this.setData({
      picUrl: 'http://' + app.globalData.URL + ':8080/getPic/' + JSON.stringify(app.globalData.globalId).slice(1, -1) + '/',
      numResult: app.globalData.numResult,
      array: arr,
    })
    
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

  }
})