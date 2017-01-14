[![NPM](https://nodei.co/npm/jdf-img-minify.png?downloads=true)](https://nodei.co/npm/jdf-img-minify/)

[![NPM version](https://badge.fury.io/js/jdf-img-minify.png)](http://badge.fury.io/js/jdf-img-minify) [![Build Status](https://travis-ci.org/jdf2e/jdf-img-minify.svg?branch=master)](https://travis-ci.org/jdf2e/jdf-img-minify)

# jdf-img-minify

> JDF 图片处理集成工具包


## Install

```
$ npm install --save jdf-img-minify
```


## Usage

### jdfImg.all 自动根据文件扩展名压缩

```js
/**
 * jdfImg.all(src,dist,withWebp,callback)
 */
jdfImg.all("src.png", "dist.png", true, function(info) {
    console.log(info);
})


/**
 * jdfImg.all(src,dist,withWebp,quantity)
 * return Promise
 */
jdfImg.all("src.gif", "dist.gif", true, "11").then(info => {
    console.log(info);
});
 
```

## 手动指定压缩

```js
/**
 * jdfImg.png(src,dist,quantity,callback)
 */
jdfImg.png("src.png", "dist.png", "10-20", function(data) {
    console.log(data);
})

/**
 * jdfImg.png(src,dist,withWebp)
 * return Promise
 */
jdfImg.png("src.png", "dist.png").then(info => {
    console.log(info);
});


//10 为压缩质量 默认 60-80
jdfImg.jpg("src.jpg", "dist.jpg", "10", function(data) {
    console.log(data);
})

jdfImg.jpg("src.jpg", "dist.jpg").then(info => {
    console.log(info);
});

//gif has no quantity to set
jdfImg.gif("src.gif", "dist.gif", function(data) {
    console.log(data);
})

jdfImg.gif("src.gif", "dist.gif").then(info => {
    console.log(info);
});


//webp-png  
jdfImg.png2webp("src.png", "dist.png.webp", "15", function(data) {
    console.log(data);
})

jdfImg.png2webp("src.png", "dist.png.webp").then(info => {
    console.log(info);
});

//webp-gif  
jdfImg.gif2webp("src.gif", "dist.gif.webp", function(data) {
    console.log(data);
})

jdfImg.gif2webp("src.gif", "dist.gif.webp").then(info => {
    console.log(info);
});

```