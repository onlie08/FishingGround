const AV = require('../../libs/av-core.js');

Page({
  data: {
    user: {
      avatar: '',
      nickname: ''
    }
  },

  onLoad() {
    this.fetchUserInfo(); // 页面加载时获取用户信息
  },

  fetchUserInfo() {
    const currentUser = AV.User.current();
    if (currentUser) {
      this.setData({
        user: {
          avatar: currentUser.get('avatar') || '',
          nickname: currentUser.get('nickname') || '老板'
        }
      });
    } else {
      console.warn('用户未登录');
    }
  },

  editProfile: function () {
    tt.navigateTo({
      url: '/pages/profile-edit/profile-edit'
    });
  },

  navigateTo抽号管理: function () {
    tt.navigateTo({
      url: '/pages/抽号管理/抽号管理'
    });
  },

  navigateTo收费管理: function () {
    tt.navigateTo({
      url: '/pages/收费管理/收费管理'
    });
  },

  navigateTo数据分析: function () {
    tt.navigateTo({
      url: '/pages/数据分析/数据分析'
    });
  },

  navigateTo赛事管理: function () {
    tt.navigateTo({
      url: '/pages/赛事管理/赛事管理'
    });
  },

  navigateTo反馈管理: function () {
    tt.navigateTo({
      url: '/pages/反馈管理/反馈管理'
    });
  }
});
