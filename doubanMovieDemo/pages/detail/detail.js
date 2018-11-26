// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailData: {}
  },

  onLoad: function (options) {
    // console.log(options.id);
    wx.showLoading({
      title: "玩命加载中..."
    });
    let that = this;
    let detail = this.toIdGetMovieDateil(options.id)
      .then(function (res) {
        wx.hideLoading();
        that.setData({
          'detailData': res
        })
        // console.log(res);
      })
  },

  onReady: function () {

  },

  onShow: function () {

  },

  //通过id获得电影详情
  toIdGetMovieDateil(id) {
    return new Promise(function (reslove, reject) {
      wx.request({
        url: 'https://douban.uieee.com/v2/movie/subject/' + id,
        header: { 'Content-Type': 'json' },
        success: function (res) {
          reslove(res.data);
        },
        fail: function (res) {
          reject(res);
        }
      })
    })
  }
})