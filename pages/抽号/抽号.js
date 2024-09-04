const AV = require('../../libs/av-core.js');
Page({
  data: {
    fishPondName: "百丰垂钓中心", // 鱼塘名称
    fishCondition: "水质良好，鱼类丰富", // 鱼情介绍
    开放时间: '', // 从数据库获取的开放时间
    结束时间: '', // 从数据库获取的结束时间
    isDrawing: false, // 抽号状态
    drawResult: null, // 抽号结果
    latitude: 30.45, // 地图纬度
    longitude: 114.34 // 地图经度114.34,30.45
  },

  onLoad() {
      this.getCurrentLocation(); // 页面加载时获取当前位置
      this.loadDrawSettings();
  },

    // 加载抽号设置
    loadDrawSettings() {
        const DrawManagement = AV.Object.extend('DrawManagement');
        const query = new AV.Query(DrawManagement);
    
        // 这里可以根据需要添加条件，比如查询最新的设置
        query.first().then((result) => {
          if (result) {
            console.info('loadDrawSettings:', result);
            this.setData({
              开放时间: result.get('openTime'),
              结束时间: result.get('endTime'),
              latitude: result.get('latitude') || 0, // 假设你在数据库中存储了纬度
              longitude: result.get('longitude') || 0 // 假设你在数据库中存储了经度
            });
          } else {
            wx.showToast({
              title: '未找到抽号设置',
              icon: 'none'
            });
          }
        }).catch((error) => {
          console.error('加载设置失败:', error);
          wx.showToast({
            title: '加载设置失败',
            icon: 'none'
          });
        });
      },

  getCurrentLocation() {
      getLocation({
          type: 'wgs84',
          success: (res) => {
              this.setData({
                  latitude: res.latitude,
                  longitude: res.longitude
              });
          },
          fail: (error) => {
              console.error('获取当前位置失败', error);
              // 设置默认位置
              this.setData({
                  latitude: 30.45, // 默认纬度
                  longitude: 114.34 // 默认经度
              });
          }
      });
  },

  startDraw() {
      if (this.data.isDrawing) return; // 防止重复点击
      this.setData({ isDrawing: true });

      // 模拟抽号过程
      setTimeout(() => {
          // 假设抽号结果
          const result = {
              number: Math.floor(Math.random() * 100) + 1, // 随机号码
              position: Math.floor(Math.random() * 10) + 1, // 随机钓位
          };
          this.setData({ drawResult: result, isDrawing: false });
      }, 2000); // 模拟2秒的抽号时间
  },
});
