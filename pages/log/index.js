//index.js
//获取应用实例
import { request } from '../../utils/api.js'
const app = getApp()

Page({
    data: {},
    onLoad: function() {
        request.apiGet('/home/swiperdata').then(res => {
            console.log(res);
        })
    }
})