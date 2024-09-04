const AV = require('../../libs/av-core.js');

Page({
  data: {
    开放日期: '',
    开放时间: '',
    结束日期: '',
    结束时间: '',
    总钓位数: '',
    排除号码: '',
    塘选择范围: ['大混养', '小混养', '鲫鱼塘'], // 新增塘选择范围
    选择的塘: '' // 新增选择的塘
  },

    // 选择塘的处理函数
    选择塘(event) {
      const index = event.detail.value;
      this.setData({
        选择的塘: this.data.塘选择范围[index] // 更新选择的塘
      });
    },

  // 设置开放日期
  设置开放日期(event) {
    this.setData({
      开放日期: event.detail.value
    });
  },

  // 设置开放时间
  设置开放时间(event) {
    this.setData({
      开放时间: event.detail.value
    });
  },

  // 设置结束日期
  设置结束日期(event) {
    this.setData({
      结束日期: event.detail.value
    });
  },

  // 设置结束时间
  设置结束时间(event) {
    this.setData({
      结束时间: event.detail.value
    });
  },

  // 设置钓位数量
  设置钓位数量(event) {
    this.setData({
      总钓位数: event.detail.value
    });
  },

  // 设置排除号码
  设置排除号码(event) {
    this.setData({
      排除号码: event.detail.value
    });
  },

  // 保存设置
  保存设置() {
    const { 开放日期, 开放时间, 结束日期, 结束时间, 总钓位数, 排除号码, 选择的塘 } = this.data;

    // 数据验证
    if (!开放日期 || !开放时间 || !结束日期 || !结束时间 || !总钓位数) {
      wx.showToast({
        title: '请填写所有必填项',
        icon: 'none'
      });
      return;
    }

    // 创建或更新抽号管理数据
    const DrawManagement = AV.Object.extend('DrawManagement');
    const drawManagement = new DrawManagement();

    drawManagement.set('openDate', 开放日期);
    drawManagement.set('openTime', 开放时间);
    drawManagement.set('endDate', 结束日期);
    drawManagement.set('endTime', 结束时间);
    drawManagement.set('fishingNum', 选择的塘);
    drawManagement.set('totalFishingSpots', parseInt(总钓位数, 10));
    drawManagement.set('fishingName', "百丰垂钓中心");
    drawManagement.set('excludedNumbers', 排除号码.split(',').map(num => num.trim()));
    // 保存到 LeanCloud
    drawManagement.save()
      .then(() => {
        wx.showToast({
          title: '设置保存成功',
          icon: 'success'
        });
        // 可以在这里重置表单或跳转到其他页面
      })
      .catch((error) => {
        console.error('保存设置失败:', error);
        wx.showToast({
          
          title: '保存设置失败',
          icon: 'none'
        });
      });
  }
});
