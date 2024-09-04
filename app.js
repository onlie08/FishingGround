const AV = require('./libs/av-core.js');
const adapters = require('./libs/leancloud-adapters-toutiao.js');
App({
  onLaunch: function () {
    console.log(AV); // 打印 AV 对象，查看其结构
    if (typeof AV.setAdapters === 'function') {
      AV.setAdapters(adapters);
      console.info("AV.setAdapters");
      AV.init({
        appId: '7o4eBvxO6ilpjL3EUwKDVPJo-gzGzoHsz', // 替换为您的应用 ID
        appKey: 'qdKZIhlHzCvYFDGx3S8EkPLc', // 替换为您的应用 Key
        serverURL: 'https://7o4ebvxo.lc-cn-n1-shared.com' // 替换为您的服务器 URL
      });
      console.info('AV.init');

    } else {
      console.error("AV.setAdapters is not a function");
    }

    // // 创建一个新的 FishingSpot 对象
    // const FishingSpot = AV.Object.extend('FishingSpot');
    // const fishingSpot = new FishingSpot();
    // // 设置字段
    // fishingSpot.set('name', '武汉百丰垂钓中心'); // 替换为实际的钓场名称
    // fishingSpot.set('location', '洪山区珞狮南路40号'); // 替换为实际的钓场地点
    // fishingSpot.set('adminPhone', '13720282090'); // 替换为实际的管理员电话
    // fishingSpot.set('rating', 4.9); // 替换为实际的钓点评分，类型为 Number

    // // 保存对象
    // fishingSpot.save()
    //   .then((result) => {
    //     console.log('钓场信息上传成功:', result);
    //   })
    //   .catch((error) => {
    //     console.error('上传钓场信息失败:', error);
    //   });
  }
})