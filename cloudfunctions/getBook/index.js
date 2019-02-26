// 云函数入口文件
var cloud = require('wx-server-sdk');
var request = require('request');

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  return new Promise(function(resolve, reject) {
    request('https://api.douban.com/v2/book/isbn/' + event.ISBN, function(err, response, body) {
      if (err) {
        reject(err);
        return;
      }

      resolve(body);
    });
  });

}