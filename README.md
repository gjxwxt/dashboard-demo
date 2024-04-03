# 项目简介

使用react+vite创建的大屏项目，地图采用视频+svg进行开发，视频组件通过传入videoList和将svg作为chidren的格式进行使用，默认
播放完第一段视频后循环播放第二段视频，main分支保持视频1920 / 1080 比例，dev分支视频占满父元素。svg默认和视频同比例来保证
不同情况下的匹配，main分支采用保持比例的做法，dev分支下采用占满父元素的做法，未采用scale缩放的做法，选择了直接从中心点放
大视频来占满父元素，因为缩放会导致视频模糊，并且缩放后视频的宽高比会发生变化，导致视频变形，所以采用直接放大视频的方式

## 开发环境

node版本：>=16

## 项目运行

```shell
npm install
npm run dev
```
