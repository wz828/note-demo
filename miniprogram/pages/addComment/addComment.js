// miniprogram/pages/addComment/addComment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showAddBtn: true,
    form: {
      img: '',
      comment: ''
    }
  },
  uploadImg: function() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        this.setData({
          showAddBtn: false,
          'form.img': res.tempFilePaths[0],
        });
      }
    })
  },

  onInput: function(event) {
    this.setData({
      'form.comment': event.detail.value
    });
  },

  addToDB: function(fileID) {
    // var db = wx.cloud.database();
    var form = this.data.form;

    wx.cloud.callFunction({
      // 云函数名称
      name: 'db',
      // 传给云函数的参数
      data: {
        type: 'add',
        img: fileID,
        comment: form.comment,
        saveType: 'comment'
      },
      success: function(res) {
        wx.showToast({
          title: '保存成功',
        });

        setTimeout(function() {
          wx.navigateBack({
            url: '/pages/list/list'
          });
        }, 500);
      },
      fail: function() {
        console.log('fail');
      }
    })

    // db.collection('list').add({
    //   data: {
    //     img: fileID,
    //     comment: form.comment,
    //     time: Date.now()
    //   },
    //   success: function(res) {
    //     console.log('success');

    //     wx.showToast({
    //       title: '保存成功',
    //     });
    //   },
    //   fail: function(res) {
    //     console.log('fail');
    //   }
    // })
  },

  onSave: function() {
    var form = this.data.form;
    var that = this;

    if (!form.img || !form.comment) {
      wx.showToast({
        title: '表单不能为空',
        icon: 'none'
      });

      return;
    }

    var cloudPath = Date.now() + form.img.match(/\.[^.]+?$/)[0];

    wx.cloud.uploadFile({
      cloudPath: cloudPath, // 上传至云端的路径
      filePath: form.img, // 图片路径
      success: res => {
        // 返回文件 ID
        console.log(res.fileID);
        that.addToDB(res.fileID);
      },
      fail: function() {
        wx.showToast({
          title: '保存失败',
          icon: 'none'
        });
      }
    })
  }




})