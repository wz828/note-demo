// miniprogram/pages/addJournal/addJournal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      title: '',
      classifyValue: '日报',
      text: ''
    },
    classify: [{
        name: 'daily',
        value: '日报',
        checked: 'true'
      },
      {
        name: 'weekly',
        value: '周报'
      },
      {
        name: 'monthly',
        value: '月报'
      }
    ],
  },

  onTitleInput: function(event) {
    this.setData({
      'form.title': event.detail.value
    });
  },

  onTextInput: function(event) {
    this.setData({
      'form.text': event.detail.value
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) { 

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  radioChange: function(event) {
    var cla = this.data.classify;

    for (var item of cla) {
      if (event.detail.value === item.name) {
        this.setData({
          'form.classifyValue': item.value
        });
      }
    }
  },

  onSave: function () {
    var form = this.data.form;

    if (!form.title || !form.text) {
      wx.showToast({
        title: '表单不能为空',
        icon: 'none'
      });

      return;
    }

    wx.cloud.callFunction({
      // 云函数名称
      name: 'db',
      // 传给云函数的参数
      data: {
        type: 'add',
        title: form.title,
        classifyValue: form.classifyValue,
        text: form.text,
        saveType: 'journal'
      },
      success: function (res) {
        console.log(res);
        console.log('success');

        wx.showToast({
          title: '保存成功',
        });

        setTimeout(function () {
          wx.navigateBack({
            url: '/pages/list/list'
          });
        }, 1000);

      },
      fail: function () {
        console.log('fail');

        wx.showToast({
          title: '保存失败',
          icon: 'none'
        });
      }
    })
  }

})