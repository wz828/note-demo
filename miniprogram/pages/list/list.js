// miniprogram/pages/list/list.js
function fixZero(num) {
  return num < 10 ? '0' + num : num;
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    showToolbar: false,
    select: 0,
    listCopy: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function(options) {
    this.getData();

  },

  dealData: function(list, callback) {
    // var fileList = [];

    list.forEach(function(item) {
      var date = new Date(item.time);
      // console.log('item', item);

      item.timeInfo = {
        year: date.getFullYear(),
        month: fixZero(date.getMonth() + 1),
        date: fixZero(date.getDate()),
        hours: fixZero(date.getHours()),
        miniutes: fixZero(date.getMinutes())
      };

      // fileList.push(item.img || '');
      // console.log('fileList',fileList);
    });
    callback(list);

    //将云fileID转换为真实链接
    // wx.cloud.getTempFileURL({
    //   fileList: fileList,
    //   success: function(res) {
    //     var fileList = res.fileList;
    //     console.log('res',res);

    //     list.forEach(function(item, index) {
    //       item.img = fileList[index].tempFileURL;
    //     });

    //     callback(list);
    //   },
    //   fail: function(err) {
    //     wx.showToast({
    //       title: '失败',
    //     });
    //   }
    // });
  },

  getData: function() {
    var that = this;

    wx.cloud.callFunction({
      // 云函数名称
      name: 'db',
      // 传给云函数的参数
      data: {
        type: 'get'
      },
      success: function(res) {
        var result = res.result || {};

        that.dealData(result.data, function(data) {
          that.setData({
            list: data,
            listCopy: data
          });  
        });
        // console.log('result', result);
      },
      fail: function() {}
    });

  },

  onToggle: function() {
    this.setData({
      showToolbar: !this.data.showToolbar
    });
  },

  onAddComment: function() {
    wx.navigateTo({
      url: '/pages/addComment/addComment',
    });
  },

  onAddDigest: function() {
    wx.navigateTo({
      url: '/pages/addDigest/addDigest',
    });
  },

  onAddJournal: function() {
    wx.navigateTo({
      url: '/pages/addJournal/addJournal',
    });
  },

  onOpenCommentDetail: function(event) {
    var dataset = event.currentTarget.dataset || {};
    var item = this.data.list[dataset.index];

    wx.navigateTo({
      url: '/pages/commentDetail/commentDetail?id=' + item._id,
    });
  },

  onOpenDigestDetail: function(event) {
    var dataset = event.currentTarget.dataset || {};
    var item = this.data.list[dataset.index];

    wx.navigateTo({
      url: '/pages/digestDetail/digestDetail?id=' + item._id,
    });
  },

  onOpenJournalDetail: function(event) {
    var dataset = event.currentTarget.dataset || {};
    var item = this.data.list[dataset.index];

    wx.navigateTo({
      url: '/pages/journalDetail/journalDetail?id=' + item._id,
    });
  },

  onAll: function() {
    this.setData({
      select: 0
    });
    // this.getData()
    // this.data.list = this.data.listCopy;
    this.onShow();

  },

  onDigest: function() {
    this.setData({
      select: 1
    });
    this.onFilter('digest')
  },

  onComment: function() {
    this.setData({
      select: 2
    });
    this.onFilter('comment')
  },

  onJournal: function() {
    this.setData({
      select: 3
    });
    this.onFilter('journal')
  },

  onFilter: function(type) {
    let data = this.data.listCopy;
    let newData = [];
    let i = 0;
    let len = data.length;

    for (; i < len; i++) {
      if (type == 'digest') {
        if (data[i].saveType === 'digest') {
          newData.push(data[i]);
        }
      } else if (type == 'comment') {
        if (data[i].saveType === 'comment') {
          newData.push(data[i]);
        }
      } else {
        if (data[i].saveType === 'journal') {
          newData.push(data[i]);
        }
      }
    }
    this.setData({
      list: newData
    });
    // console.log(this.data);
  }
})