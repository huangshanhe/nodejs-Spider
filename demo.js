var request = require('request');
var cheerio = require('cheerio');
var path = require('path');
var fs = require('fs');
var async = require('async');
var mkdirp = require('mkdirp');
// 需要爬的网址
 let url = 'http://www.mmjpg.com/mm/1';

 console.log('目标网址(彩蛋)已经暴露，爬这个网站的任务就交给你了，当是课后作业了')

// 头助攻
var options = {
    url: url,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.99 Safari/537.36',
        'Connection':'keep-alive'
    }
};



