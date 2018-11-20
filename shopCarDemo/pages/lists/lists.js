// pages/list/list.js
let app = getApp();
let goodLists = require('../../data/datalist');

Page({
  data: {
    'banner': ["/img/slider/bg.jpg", "/img/slider/bg2.jpg",
      "/img/slider/bg4.jpg", "/img/slider/bg5.jpg"
    ],
    'allGoodLists': []
  },

  onLoad: function (options) {

    //初始化商品列表
    this.setData({
      allGoodLists: goodLists.imglist
    });
    // console.log(this.data.allGoodLists);

  },
  onReady: function () {

  },
  selectGoodToDetail: function (options) {
    wx.navigateTo({
      url: '/pages/detail/detail'
    });
    
    app.globalData.goodItem = options.currentTarget.dataset.item;

    // console.log(options.currentTarget);
  }


})