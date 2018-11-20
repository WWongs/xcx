// pages/detail/detail.js
let app = getApp();

Page({

  data: {
    initGoodData: {},
    isJoin: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      'initGoodData': app.globalData.goodItem
    })
    // console.log(app.goodItem);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  //添加商品事件
  addShopCar: function () {
    this.setData({
      isJoin: true
    });
    wx.showToast({
      title: '加入购物车成功'
    });

    this.data.initGoodData.isSelected = false;
    this.data.initGoodData.count = 1;
    app.globalData.allGoodItems.push(this.data.initGoodData);
  },

  //分享到朋友圈
  shareToApp: function () {
      wx.showActionSheet({
        itemList: ['分享到qq空间', '分享到朋友圈', '分享到微博']
      })
  }

})