// pages/search/search.js
// https://api.douban.com/v2/movie/search?q=战狼&start=25&count=25
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: 10,
    start: 0,
    isSearch: true,
    listData: [],
    inputValue: ''
  },

  onLoad: function (options) {

  },

  onReady: function () {

  },

  onShow: function () {

  },

  //得到输入框的值
  getInputValue(e) {
    // console.log(e.detail.value);
    this.setData({
      'inputValue': e.detail.value
    });

    let value = e.detail.value;
    let that = this;
    let count = this.data.count;
    let start = this.data.start;

    if (value != '') {
      let search = this.getSearchMovie(value, start, count)
        .then(function (res) {
          wx.hideLoading();
          if (res != '') {
            that.setData({
              'listData': res
            })
          } else {
            wx.showModal({
              title: '没有此电影的相关消息...'
            })
          }
          // console.log(res);
        })
    }
  },

  //获得内容
  getSearchMovie(value, start, count) {
    return new Promise(function (reslove, reject) {
      wx.showLoading({
        title: '玩命加载中...'
      });
      wx.request({
        url: 'https://douban.uieee.com/v2/movie/search?q=' + value + '&start=' + start + '&count=' + count,
        header: {
          'Content-Type': 'json'
        },
        success: function (res) {
          reslove(res.data.subjects);
        },
        fail: function (res) {
          reject(res);
        }
      })
    })
  },

  //跳转详情
  toDetail(options) {
    // console.log(options.currentTarget.id);
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + options.currentTarget.id
    })
  },

  //上拉更新
  updateDown() {
    this.setData({
      'isSearch': false
    })
    let value = this.data.inputValue;
    let that = this;
    let count = this.data.count;
    let start = this.data.start;
    start += 11;
    count += 10;
    that.setData({
      'count': count,
      'start': start
    })
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/search?q=' + value + '&start=' + start + '&count=' + count,
      header: {
        'Content-Type': 'json'
      },
      success: function (res) {
        that.setData({
          'isSearch': true
        })
        if (res.data.subjects != '') {
          res.data.subjects.forEach(element => {
            that.data.listData.push(element);
            that.setData({
              'listData': that.data.listData.concat(element)
            })
          });
        } else {
          wx.showModal({
            title: '已经没有更多数据了...'
          })
        }

        console.log(that.data.listData);
      },
      fail: function (res) {
        console.log(res);
      }
    })
  }
})