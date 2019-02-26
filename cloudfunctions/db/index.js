// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init();
var db = cloud.database();

function add(event, context) {
  return new Promise(function(resolve, reject) {
    var data = {
      time: Date.now(),
      openid: event.userInfo.openId,
      saveType: event.saveType
    };

    if (event.saveType === 'comment') {
      data.comment = event.comment;
      data.img = event.img;
    } else if(event.saveType === 'digest') {
      data.comment = event.comment;
      data.info = event.info;
    } else {
      data.title = event.title;
      data.classifyValue = event.classifyValue;
      data.text = event.text;
    }

    db.collection('list').add({
      data: data,
      success: function(res) {
        resolve(res);
      },
      fail: function(err) {
        reject(err);
      }
    })
  });
}

function getData(event, context) {
  return db.collection('list').where({
    openid: event.userInfo.openId
  }).get();
}

function getById(event, context) {
  return db.collection('list').doc(event.id).get();
}

// 云函数入口函数
exports.main = async(event, context) => {
  console.log('调用云函数成功');
  console.log(event);

  if (event.type === 'add') {
    return add(event, context);
  } else if (event.type === 'getById') {
    return getById(event, context);
  }

  return getData(event, context);
}