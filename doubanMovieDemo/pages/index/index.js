// pages/index/index.js
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    getRoot: false
  },

  onLoad: function (options) {
    this.getUserLocation();
  },

  onReady: function () {

  },

  onShow: function () {

  },
  //打开提示用户授权
  getUserLocation () {
    let that = this;
    wx.getLocation({
      success: function (res){
        that.setData({
          'getRoot': true
        });

        let city = that.getUserCity(res.longitude, res.latitude)
        .then(function (res) {
            app.globalData.city = res.data.result.addressComponent.city;
            // console.log(res.data.result.addressComponent.city);
        })
        .catch( function (res) {
          console.log(res);
        })
      },
      fail: function (res){
        wx.showModal({
          title: '授权失败',
          content: '无法体验小程序功能'
        });
      }
    })
  },

  //百度根据经纬度查地名
  getUserCity (longitude, latitude) {
      let url = `http://api.map.baidu.com/geocoder/v2/?ak=B61195334f65b9e4d02ae75d24fa2c53&location=${latitude},${longitude}&output=json&pois=1`;
      return new Promise(function(reslove, reject) {
        wx.request({
          url: url,
          success: function (res) {
            reslove(res)
          },
          fail: function (res) {
            reject(res);
          }
        })
      })
    },

  //跳转到主页
  toMoviePage () {
      wx.switchTab({
        url: '/pages/movie/movie'
      })
  }
})