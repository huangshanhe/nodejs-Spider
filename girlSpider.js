//依赖模块
var fs = require('fs');
var path = require('path');
var request = require("request");
var cheerio = require("cheerio");
var mkdirp = require('mkdirp');
var async = require('async');

// 目标网址
var url = 'http://desk.zol.com.cn/meinv/1920x1080/1.html';

// 本地存储目录
var dir = './girlImages';

// 图片链接地址
var links = [];

// 创建目录
mkdirp(dir, function(err) {
    if(err){
        console.log(err);
    } else {
        console.log(dir+'文件夹创建成功!正在下载');
    }
});

// 发送请求
request(url, function(error, response, body) {
    if(!error && response.statusCode == 200) {
        var $ = cheerio.load(body);
        $('.photo-list-padding a img').each(function() {
            var src = $(this).attr('src');
            src = src.replace(/t_s208x130c5/, 't_s960x600c5');
            links.push(src);
        });
        // 每次只执行一个异步操作
        async.mapSeries(links, function(item, callback) {
            download(item, dir, Math.floor(Math.random()*100000) + item.substr(-4,4));
            console.log('成功下载图片'+item.substr(-10,10));
            callback(null, item);
        }, function(err, results) {});
    }
});

// 下载方法
var download = function(url, dir, filename){
    request.head(url, function(err, res, body){
        request(url).pipe(fs.createWriteStream(dir + "/" + filename));
    });
};
