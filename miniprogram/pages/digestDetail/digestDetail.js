// miniprogram/pages/commentDetail/commentDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resource: {}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.cloud.callFunction({
      // 云函数名称
      name: 'db',
      // 传给云函数的参数
      data: {
        type: 'getById',
        id: options.id
      },
      success: function (res) {
        console.log('success', res);

        that.setData({
          resource: res.result.data
        });

      },
      fail: function () {
        console.log('fail');
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '读书心得'
    };
  }
})