function formatDate(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatTime(date) {
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()

    return [hour, minute, second].map(formatNumber).join(':')
}
/**
 * 输入Unix时间戳，返回指定时间格式
 */
function calcTimeHeader(time) {
    // 格式化传入时间
    let date = new Date(parseInt(time)),
        year = date.getUTCFullYear(),
        month = date.getUTCMonth(),
        day = date.getDate(),
        hour = date.getHours(),
        minute = date.getUTCMinutes()
        // 获取当前时间
    let currentDate = new Date(),
        currentYear = date.getUTCFullYear(),
        currentMonth = date.getUTCMonth(),
        currentDay = currentDate.getDate()
        // 计算是否是同一天
    if (currentYear == year && currentMonth == month && currentDay == day) { //同一天直接返回
        if (hour > 12) {
            return `${hour}:${minute < 10 ? '0' + minute : minute}`
        } else {
            return `${hour}:${minute < 10 ? '0' + minute : minute}`
        }
    }
    // 计算是否是昨天
    let yesterday = new Date(currentDate - 24 * 3600 * 1000)
    if (year == yesterday.getUTCFullYear() && month == yesterday.getUTCMonth() && day == yesterday.getDate()) { //昨天
        return `昨天 ${hour}:${minute < 10 ? '0' + minute : minute}`
    } else {
        return `${year}-${month + 1}-${day} ${hour}:${minute < 10 ? '0' + minute : minute}`
    }
}
/**
 * 输入Unix时间戳，返回mm-dd
 */
function mmdd(time) {
    // 格式化传入时间
    let date = new Date(parseInt(time)),
        month = date.getUTCMonth() + 1,
        day = date.getDate();
    if (day > 10) {
        return `${month}-${day}`
    }
    return `${month}-0${+day}`
}
/**
 * 字符串数组排序：包含中文字符
 */
function sortStringArray(srcArr) {
    return srcArr.sort((a, b) => a.localeCompare(b, 'zh-Hans-CN', { sensitivity: 'base' }))
}

/**
 * 深度克隆
 */
function deepClone(srcObj, out) {
    let outObj = out || {}
    for (let key in srcObj) {
        if (typeof srcObj[key] === 'object') {
            outObj[key] = (srcObj[key].constructor === Array) ? [] : {}
            deepClone(srcObj[key], outObj[key])
        } else {
            outObj[key] = srcObj[key]
        }
    }
    return outObj
}
const showMessage = function(content) {
    return new Promise((resolve, reject) => {
        wx.showToast({
            title: content,
            icon: 'none',
            mask: true,
            success() {
                if (resolve) {
                    setTimeout(function() {
                        resolve()
                    }, 2000)
                }
            }
        })
    })
}

const showLoading = function(title = "登录中...") {
    wx.showLoading({ title, mask: false })
}

const hideLoading = function() {
        wx.hideLoading();
    }
    /**
     * 设置storage
     */
const setStorage = ({ key, data }) => {
    return new Promise((resolve, reject) => {
        wx.setStorage({
            key,
            data,
            success: (res) => {
                resolve(res)
            },
            fail: (res) => {
                reject(res)
            }
        })
    })
}

/**
 * 获取storage
 */
const getStorage = (key) => {
    return new Promise((resolve, reject) => {
        wx.getStorage({
            key,
            success: (res) => {
                resolve(res)
            },
            fail: (res) => {
                reject(res)
            }
        })
    })
}


const subReason = function(reason) {
    return reason.length > 72 ? reason.substring(0, 72) + "..." : reason;
}


function isCN(str) { //判断是不是中文
    let regexCh = /[u00-uff]/;
    return !regexCh.test(str);
}


let { request } = require('./api.js');
let { regExp } = require('../config.js');
const sendMobileCode = function(self, _tel) {
    console.info(_tel)
    if (!_tel || !regExp.mobileRegExp.test(_tel)) {
        showMessage('手机号格式不正确')
        return;
    } else {
        request.apiGet('user/getSms', { phone: _tel }).then(() => {
            self.setData({
                qrObj: {
                    qrDisabled: true
                }
            })
            let getCountDown = function(t) {
                if (t == 0) {
                    self.setData({
                        qrObj: {
                            qrText: '重新获取验证码',
                            qrDisabled: false
                        }
                    })
                } else {
                    self.setData({
                        qrObj: {
                            qrText: t + 's',
                            qrDisabled: true
                        }
                    })
                    t--;
                    setTimeout(function() {
                        getCountDown(t);
                    }, 1000);
                }
            }
            getCountDown(120);
        })
    }
}

module.exports = {
    formatDate,
    formatTime,
    sortStringArray,
    calcTimeHeader,
    deepClone,
    isCN,
    sendMobileCode,
    showMessage,
    showLoading,
    hideLoading,
    setStorage,
    getStorage,
    subReason,
    mmdd
}