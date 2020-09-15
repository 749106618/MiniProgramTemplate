/**
 * request 请求
 */
let { config } = require('../config.js');


const request = {
    apiGet: (url, param = {}) => {
        return new Promise((resolve, reject) => {
            let token = wx.getStorageSync('token');
            wx.showLoading({
                title: '加载中...',
                mask: false
            })
            wx.request({
                url: config.baseUrl + url + '?token=' + token,
                data: param,
                header: {
                    "X-Requested-With": "XMLHttpRequest",
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                success: (res) => {
                    wx.hideLoading();
                    let status = res.data.code;
                    if (status == 500) {
                        wx.showModal({
                            title: '提示',
                            content: res.data.msg,
                            showCancel: false,
                        })
                    } else {
                        resolve(res)
                    }
                },
                fail: (res) => {
                    wx.hideLoading();
                    console.info(res)
                    wx.showModal({
                        title: '提示',
                        content: '系统异常，请联系管理员',
                        showCancel: false,
                    })
                }
            })
        })
    },
    apiPost: (url, param = {}) => {
        return new Promise((resolve, reject) => {
            wx.showLoading({
                title: '加载中...',
                mask: false
            })
            let token = wx.getStorageSync('token');
            wx.request({
                url: config.baseUrl + url + '?token=' + token,
                data: param,
                method: 'POST',
                header: {
                    "X-Requested-With": "XMLHttpRequest"
                },
                success: (res) => {
                    wx.hideLoading();
                    //console.log(res);
                    resolve(res)

                },
                fail: (res) => {
                    wx.hideLoading();
                    wx.showModal({
                        title: '提示',
                        content: '系统异常，请联系管理员',
                        showCancel: false
                    })
                }
            })
        })
    }
}



module.exports = {
    request
}