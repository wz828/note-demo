// miniprogram/pages/addDigest/addDigest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // scanResult: {
    //   charSet: "utf-8",
    //   errMsg: "scanCode:ok",
    //   rawData: "OTc4NzExNTQyNzg2MQ==",
    //   result: "9787115427861", //ISBN
    //   scanType: "EAN_13",
    // },
    //书籍信息
    info: {},
    //评论信息
    comment: ''
  },

  onLoad: function() {
    var that = this;
    setTimeout(function() {
      wx.scanCode({
        success: function(res) {
          //扫书成功
          console.log(res);

          wx.cloud.callFunction({
            // 云函数名称
            name: 'getBook',
            // 传给云函数的参数
            data: {
              ISBN: res.result
            },
            success: function(res) {
              try {
                res.result = JSON.parse(res.result);
              } catch (ex) {
                res.result = {};
              }

              that.setData({
                info: that.dealData(res.result)
              });
            },
            fail: function() {
              console.log('fail');
            }
          })
        },
        fail: function() {
          //扫码失败
          wx.navigateTo({
            url: '/pages/list/list',
          });
        }
      });
    }, 500);
  },

  onInput: function(event) {
    this.setData({
      comment: event.detail.value
    });
  },

  dealData: function(res) {
    if (!res || !res.author) {
      return res;
    }
    res.authors = res.author.join(' / ');
    return res;
  },

  onSave: function() {
    wx.cloud.callFunction({
      // 云函数名称
      name: 'db',
      // 传给云函数的参数
      data: {
        type: 'add',
        info: this.data.info,
        comment: this.data.comment,
        saveType: 'digest'
      },
      success: function(res) {
        console.log(res);
        console.log('success');

        wx.showToast({
          title: '保存成功',
        });

        setTimeout(function() {
          wx.navigateBack({
            url: '/pages/list/list'
          });
        }, 1000);

      },
      fail: function() {
        console.log('fail');

        wx.showToast({
          title: '失败',
          icon: 'none'
        });
      }
    })
  }

})