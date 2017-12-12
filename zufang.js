//依赖模块
const fs = require('fs');
const path = require('path');
const request = require("request");
const cheerio = require("cheerio");
const mkdirp = require('mkdirp');
const async = require('async');

function requestMore(url,index){
    // 发送请求
    request(
        {url: url,headers:{'User-Agent': 'request'}},
        function(error, response, body) {
        if(!error && response.statusCode == 200) {
            let $ = cheerio.load(body);
            $('.title a').each(function() {
                let info = $(this).attr('title') || '无';
                if(info.indexOf('湘云雅苑') != -1){//关键字为湘云雅苑
                    console.log('标题:'+$(this).attr('title').slice(0,40)+'\n网址:'+$(this).attr('href')+'\n');
                }
            });
        }
    });
}

// 目标网址
let urls = [];
for(let i=0;i<50;i++){//push前X页
    urls.push('https://www.douban.com/group/595637/discussion?start='+(i*25));
}

for(let i=0;i<urls.length;i++){
    requestMore(urls[i],i+1);
}
