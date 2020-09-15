//index.js
//获取应用实例
import { request } from '../../utils/api.js';
import { showMessage } from '../../utils/util.js';
const app = getApp()

Page({
    data: {},
    onLoad: function() {
        request.apiGet('/home/swiperdata').then(res => {
            console.log(res);
            showMessage('测试')
        })
    }
})