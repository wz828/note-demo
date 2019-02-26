// miniprogram/pages/journalDetail/journalDetail.js
function fixZero(num) {
  return num < 10 ? '0' + num : num;
}
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
  onLoad: function(options) {
    var that = this;
    wx.cloud.callFunction({
      // 云函数名称
      name: 'db',
      // 传给云函数的参数
      data: {
        type: 'getById',
        id: options.id
      },
      success: function(res) {
        // console.log('读取success', res);

        var result = res.result || {};
        that.dealData(result.data, function(data) {
          that.setData({
            resource: data
          });
        });
      },
      fail: function() {
        console.log('fail');
      }
    })
  },

  dealData: function(res, callback) {
    var date = new Date(res.time);

    res.timeInfo = {
      year: date.getFullYear(),
      month: fixZero(date.getMonth() + 1),
      date: fixZero(date.getDate()),
      hours: fixZero(date.getHours()),
      miniutes: fixZero(date.getMinutes())
    };
    callback(res);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: this.data.resource.title
    };
  }
})