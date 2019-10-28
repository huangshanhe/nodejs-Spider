// 依赖模块
const fs = require('fs');
const path = require('path');
const request = require("request");
const cheerio = require("cheerio");
const mkdirp = require('mkdirp');
const async = require('async');

// 本地存储目录
const dir = './girlImages';

// 图片链接地址
let links = [];

// 创建目录
mkdirp(dir, function(err) {
    if(err){
        console.log(err);
    } else {
        console.log(dir + '文件夹创建成功!准备下载');
    }
});

// 下载方法
let download = function(url, dir, filename){
    request.head(url, function(err, res, body){
        request(url).on('error', (err) => {
            console.log(err);
        }).pipe(fs.createWriteStream(dir + "/" + filename));
    });
};

function requestMore(url,index){
    // 发送请求
    request(url, function(error, response, body) {
        if(!error && response.statusCode == 200) {
            const $ = cheerio.load(body);
            $('.photo-list-padding a img').each(function() {
                let src = $(this).attr('src');
                src = src.replace(/t_s208x130c5/, 't_s960x600c5');
                links.push(src);
            });
            async.mapLimit(links, 5, function(item, callback) {
                download(item, dir, Math.floor(Math.random()*100000) + item.substr(-4,4));
                console.log('成功下载图片' + item.substr(-10,10));
                callback(null, item);
            }, function(err, results) {
                console.log(`第${index}页全部爬完。`);
            });
        }
    });
}

// 目标网址
let urls = [];
for(let i = 1; i < 2; i++){// push前X页
    urls.push('http://desk.zol.com.cn/meinv/1920x1080/'+i+'.html');
}

for(let i=0; i < urls.length; i++){
    requestMore(urls[i], i+1);
}
