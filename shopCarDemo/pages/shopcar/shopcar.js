// pages/car/car.js
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //是否存在商品
    ifGood: false,
    //所有的商品数据
    allGoodData: [],
    //添加商品数量的输入框默认值
    goodNum: 1,
    //商品总数量,总价
    totalPrice: 0,
    totalNum: 0,
    //选中的商品数组
    selectData: []
  },

  onShow: function () {
    this.initGoodEve();
  },

  //初始化页面数据
  initGoodEve: function () {
    if (app.globalData.allGoodItems != '') {
      this.setData({
        'ifGood': true,
        'allGoodData': app.globalData.allGoodItems
      });
    } else {
      this.setData({
        'ifGood': false
      });
    }
    // console.log('购物车');
    // console.log(this.data.allGoodData);
  },

  //删除商品
  deleteGood: function (index) {
    let goodIndex = index.currentTarget.dataset.index;
    let goodDatas = this.data.allGoodData;
    goodDatas.splice(goodIndex, 1);
    this.setData({
      'allGoodData': goodDatas
    })
    app.globalData.allGoodItems = goodDatas;
    // this.initGoodEve();
    this.computerGoodPrice();
  },

  //商品数量--
  back: function (index) {
    let goodDatas = this.data.allGoodData;
    let goodIndex = parseInt(index.currentTarget.dataset.index);
    let goodCount = parseInt(goodDatas[goodIndex].count);

    if (goodCount > 1 && goodDatas[goodIndex].isSelected == true) {
      goodCount -= 1;
      goodDatas[goodIndex].count = goodCount;
      this.setData({
        'allGoodData': goodDatas
      })
      this.computerGoodPrice();
    }

  },

  //商品数量++
  add: function (index) {
    let goodDatas = this.data.allGoodData;
    let goodIndex = parseInt(index.currentTarget.dataset.index);
    let goodCount = parseInt(goodDatas[goodIndex].count);

    if (goodCount >= 1 && goodDatas[goodIndex].isSelected == true) {
      goodCount += 1;
      goodDatas[goodIndex].count = goodCount;
      this.setData({
        'allGoodData': goodDatas
      })
      this.computerGoodPrice();
    }
  },

  //check事件设置总价,总数量
  checkboxChange: function (e) {
    let totalPrice = 0;
    let totalNum = 0;
    let valueData = e.detail.value;
    let totalLength = this.data.allGoodData.length;
    let data = this.data.allGoodData;
    for (let i = 0; i < totalLength; i++) {
      data[i].isSelected = false;
      for (let j = 0; j < valueData.length; j++) {
        if (data[i].title == valueData[j]) {
          data[i].isSelected = true;
          totalPrice += parseInt(data[i].price);
          totalNum = totalNum + 1;
        }
      }

      this.setData({
        'totalPrice': totalPrice,
        'totalNum': totalNum
      })

    }
  },

  //checkbox全选事件
  checkMoneyEve: function (e) {
    let valueData = e.detail.value;
    // console.log(valueData)
    if (valueData[0] == 'allCheck') {
      let allGoodDatas = this.data.allGoodData;
      for (let i = 0; i < allGoodDatas.length; i++) {
        allGoodDatas[i].isSelected = true;
      }
      this.setData({
        'totalNum': allGoodDatas.length,
        'allGoodData': allGoodDatas
      })
      this.computerGoodPrice();

    } else {
      let allGoodDatas = this.data.allGoodData;
      for (let i = 0; i < allGoodDatas.length; i++) {
        allGoodDatas[i].isSelected = false;
      }
      this.setData({
        'totalNum': 0,
        'allGoodData': allGoodDatas
      })
      this.computerGoodPrice();
    }
  },

  //刷新计算当前商品总价
  computerGoodPrice: function () {
    let goodDatas = this.data.allGoodData;
    let length = goodDatas.length;
    let allPrice = 0;

    for (let i = 0; i < length; i++) {
      if (goodDatas[i].isSelected == true) {
        allPrice += parseInt(goodDatas[i].price) * parseInt(goodDatas[i].count);
      }
    }

    this.setData({
      'totalPrice': allPrice
    })
  }

})