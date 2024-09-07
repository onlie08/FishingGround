const AV = require('../../libs/av-core.js');
Page({
    data: {
        latitude: 30.450482,
        longitude: 114.335445,
        markers: [], // 存储标记的数组
        startPoint: null, // 起点
        endPoint: null, // 终点
        startPointNumber: null, // 起点号码
        endPointNumber: null, // 终点号码
        canStartSelect: false, // 是否可以开始选点
        canEndSelect: false, // 是否可以结束选点s
        canUpload: false // 是否可以上传
    },

    onRegionChange(e) {
        // 更新地图中心点
        this.setData({
            latitude: e.detail.centerLocation.latitude,
            longitude: e.detail.centerLocation.longitude
        });
    },

    onStartPointInput(e) {
        const value = e.detail.value;
        this.setData({
            startPointNumber: value,
            canStartSelect: !!value && !!this.data.endPointNumber
        });
    },

    onEndPointInput(e) {
        const value = e.detail.value;
        this.setData({
            endPointNumber: value,
            canStartSelect: !!value && !!this.data.startPointNumber
        });
    },

    startSelect() {
        // 记录起点坐标
        const {
            latitude,
            longitude
        } = this.data;
        this.setData({
            startPoint: {
                latitude,
                longitude
            },
            canEndSelect: true // 结束按钮可点击
        });
    },

    endSelect() {
        // 记录终点坐标
        const {
            latitude,
            longitude,
            startPoint,
            endPointNumber
        } = this.data;
        if (!startPoint) {
            wx.showToast({
                title: '请先选择起点',
                icon: 'none'
            });
            return;
        }

        const endPoint = {
            latitude,
            longitude
        };
        this.setData({
            endPoint
        });

        // 计算并绘制等分点
        this.drawMarkers(startPoint, endPoint, endPointNumber);
        this.setData({
            canUpload: true
        }); // 上传按钮可点击
    },

    drawMarkers(startPoint, endPoint, endPointNumber) {
        console.log('drawMarkers:', this.data.startPointNumber, endPointNumber);
        const markers = this.data.markers;
        const numPoints = Math.abs(endPointNumber - this.data.startPointNumber); // 计算等分点数量

        for (let i = 0; i <= numPoints; i++) {
            const lat = startPoint.latitude + (endPoint.latitude - startPoint.latitude) * (i / numPoints);
            const lon = startPoint.longitude + (endPoint.longitude - startPoint.longitude) * (i / numPoints);
            markers.push({
                id: Number(this.data.startPointNumber) + i, // 确保每个marker id唯一
                latitude: lat,
                longitude: lon,
                iconPath: 'home_fill.png', // 替换为您的标记图标路径
                width: 20,
                height: 20
            });
        }
        console.log('drawMarkers:', markers);
        this.setData({
            markers
        });
    },



    uploadMarkers() {
        // TODO: 实现上传逻辑，将 markers 数组上传到 LeanCloud
        const markersToUpload = this.data.markers.map(marker => ({
            latitude: marker.latitude,
            longitude: marker.longitude,
            pointNumber: marker.id // 或者根据需要选择对应的号码
        }));
        console.log('uploadMarkers:', markersToUpload);
        // 创建一个新的 FishingSpot 对象
        const FishingSpot = AV.Object.extend('SpotDetail');
        const fishingSpot = new FishingSpot();
        // 设置字段
        fishingSpot.set('name', '武汉百丰垂钓中心'); // 替换为实际的钓场名称
        fishingSpot.set('location', markersToUpload); // 替换为实际的钓场地点

        // 保存对象
        fishingSpot.save()
            .then((result) => {
                console.log('钓场信息上传成功:', result);
            })
            .catch((error) => {
                console.error('上传钓场信息失败:', error);
            });

    }
});
