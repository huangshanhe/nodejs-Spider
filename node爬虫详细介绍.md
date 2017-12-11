# 用Node.js写爬虫 #

## 前言 ##

**前端同学可能向来对爬虫不是很感冒，觉得爬虫需要用偏后端的语言，诸如 php ， python 等。当然这是在 nodejs 前了，nodejs 的出现，使得 Javascript 也可以用来写爬虫了。由于 nodejs 强大的异步特性，让我们可以轻松以异步高并发去爬取网站，比如一些用户信息，图片，资源种子等**

## 爬虫步骤 ##

1.添加依赖 选好想爬的url 检查分析下页面结构

![分析](https://raw.githubusercontent.com/huangshanhe/nodejs-Spider/master/imgs/%E5%88%86%E6%9E%90.png)
![头](https://raw.githubusercontent.com/huangshanhe/nodejs-Spider/master/imgs/%E5%A4%B4.png)

2.抓取页面结构，把关键字段存起来

![抓取](https://raw.githubusercontent.com/huangshanhe/nodejs-Spider/master/imgs/%E6%8B%BF%E6%95%B0%E6%8D%AE.png)

3.把爬到的数据存起来

![存](https://raw.githubusercontent.com/huangshanhe/nodejs-Spider/master/imgs/%E5%AD%98.png)

4.有时间可以把爬到的内容更好地展示出来，我这就放在文件夹里没去处理。

![haha](https://raw.githubusercontent.com/huangshanhe/nodejs-Spider/master/imgs/%E6%88%AA%E5%9B%BE.png)

注意: 爬取具体页面内容 使用 async 控制异步并发数量 

不然很容易被单IP的巨量 URL 请求攻击到崩溃。为了做一个好公民，也为了减轻网站的压力（其实为了不被封IP），
我限制了同时并发量最高为5。

![限制并发](https://raw.githubusercontent.com/huangshanhe/nodejs-Spider/master/imgs/limit.png)

这里用到了一个非常强大的库 async ，让我们控制并发量变得十分轻松，简单的介绍如下。
async(https://github.com/caolan/async#queueworker-concurrency)，async是一个流程控制工具包，
提供了直接而强大的异步功能mapLimit(arr, limit, iterator, callback)。

最后

一个简单的爬虫就完成了， 大家可以去尝试一下爬爬自己感兴趣的内容，代码量不多，更多时间是去分析页面结构处理各种问题。
