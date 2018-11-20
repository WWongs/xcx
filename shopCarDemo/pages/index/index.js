Page({
    data: {
        //用户信息
        user: {
            userName: 'Welcome',
            userAvatar: '',
            isBegin: false,
            isRoot: true
        }
    },
    onLoad: function () {
        this.getUserRoot();
    },
    //得到用户信息
    getUserIfo: function () {
        const that = this;
        wx.getUserInfo({
            success: function (res) {
                let userData = JSON.parse(res.rawData);
                // console.log(userData);
                that.setData({
                    'user.userName': userData.nickName,
                    'user.userAvatar': userData.avatarUrl
                });
            }
        })
    },
    //得到授权
    getUserRoot: function () {
        const that = this;
        wx.getSetting({
            success(res) {
                // console.log(res);
                if (res.authSetting['scope.userInfo']) {
                    that.setData({
                        'user.isBegin': true,
                        'user.isRoot': false
                    });
                    that.getUserIfo();
                } else {
                    that.setData({
                        'user.userName': '您还没有授权，无法使用本程序...'
                    });
                }
            }
        })
    },
    //回调处理用户点击是否授权
    callBackGetUserIfo: function (res) {
        const that = this;
        if (res.detail.rawData) {
            that.getUserRoot();
        } else {

        }
    },
    //打开程序跳转
    openPro: function () {
        wx.switchTab({
            url: '../lists/lists'
        })
    }
})