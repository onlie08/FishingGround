const AV = require('../../libs/av-core.js');

Page({
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    circular: false,
    current: 0,
    interval: 2000,
    duration: 500,
    truncatedSummary: '',
    isExpanded: false,
    fishingSpots: [], // 初始化钓场信息数组
  },

  onLoad() {
    this.fetchFishingSpots(); // 页面加载时获取钓场信息
  },

  onImageClick(event) {
    const newsId = event.currentTarget.dataset.newsid;
    // 在这里实现进入新闻详情页的逻辑
  },

  navigateTo(event) {
    const target = event.currentTarget.dataset.target;
  },

  fetchFishingSpots() {
    const FishingSpot = AV.Object.extend('FishingSpot');
    const query = new AV.Query(FishingSpot);
    query.find()
      .then((results) => {
        this.setData({
          fishingSpots: results.map(spot => ({
            id: spot.id,
            name: spot.get('name'),
            location: spot.get('location'),
            adminPhone: spot.get('adminPhone'),
            rating: spot.get('rating'),
          }))
        });
      })
      .catch((error) => {
        console.error('获取钓场信息失败:', error);
      });
  }
});
