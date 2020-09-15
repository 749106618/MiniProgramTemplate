// 测试地址
const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1';

const config = {
    baseUrl
}

const regExp = {
    mobileRegExp: /^\d{11}$/,
    emailRegExp: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
    cardNoRegExp: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
    passwordRegExp: /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/,
}

module.exports = {
    config,
    regExp
};