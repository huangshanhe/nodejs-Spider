//依赖模块
var fs = require('fs');
var path = require('path');
var request = require("request");
var cheerio = require("cheerio");
var mkdirp = require('mkdirp');
var async = require('async');

// 目标网址
var url = 'https://tieba.baidu.com/p/4705665446?fr=good';

// 本地存储目录
var dir = './tiebaImages';

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
        $('.BDE_Image').each(function(index) {
            if(index<50){//可以控制下下载数量，大量需要的可以无视
                var src = $(this).attr('src');
                links.push(src);
            }
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
        if(err) console.log(err);
        else request(url).pipe(fs.createWriteStream(dir + "/" + filename));
    });
};
