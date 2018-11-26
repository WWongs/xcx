// pages/movie/movie.js
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    toDayMovieData: [],
    topMovieData: []
  },

  onLoad: function (options) {

  },

  onReady: function () {

  },

  onShow: function () {
    let that = this;
    let banner = this.getTodayMovie()
      .then(function (res) {
        wx.hideLoading();
        that.setData({
          'toDayMovieData': res
        })
        // console.log(that.data.toDayMovieData)
      })
      .catch(function (res) {
        console.log(res);
      })

    let topMovie = this.getTopMovie()
      .then(function (res) {
        that.setData({
          'topMovieData': res
        })
        // console.log(res);
      })
      .catch(function (res) {
        console.log(res);
      })
  },

  //获取今天电影banner &start=0&count=10
  getTodayMovie() {
    let city = app.globalData.city;
    wx.showLoading({
      title: '玩命加载中...'
    });
    return new Promise(function (reslove, reject) {
      wx.request({
        url: `https://douban.uieee.com/v2/movie/in_theaters?city=${{ city }}`,
        header: { 'Content-Type': 'json' },
        success: function (res) {
          reslove(res.data.subjects);
        },
        fail: function (res) {
          reject(res);
        }
      })
    })
  },

  //获取top250电影
  getTopMovie() {
    return new Promise(function (reslove, reject) {
      wx.request({
        url: 'https://douban.uieee.com/v2/movie/top250?start=0&count=15',
        header: { 'Content-Type': 'json' },
        success: function (res) {
          reslove(res.data.subjects);
        },
        fail: function (res) {
          reject(res);
        }
      })
    })
  },

  //跳转到详情页
  toDetail(options) {
      // console.log(options.currentTarget.id);
      wx.navigateTo({
        url: '/pages/detail/detail?id=' + options.currentTarget.id
      })
  }
})