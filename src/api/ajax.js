/*
能发送异步ajax请求的函数模块
封装axios库
函数的返回值是promise对象
1. 优化1: 统一处理请求异常?
    在外层包一个自己创建的promise对象
    在请求出错时, 不reject(error), 而是显示错误提示
2. 优化2: 异步得到不是reponse, 而是response.data
   在请求成功resolve时: resolve(response.data)
 */

import axios from 'axios'
import {message} from 'antd'
import storageUtils from "../utils/storageUtils";

// 带上cookie
axios.defaults.withCredentials = true

axios.interceptors.request.use(config => {
    //携带token
    let uToken = storageUtils.getToken();
    console.log(uToken)
    if (uToken) {
        //我就在请求头里面添加一个头信息叫做U-TOKEN ==》jsessionid(token) 后台通过token作为key值可以在redis中获得loginUser的信息
        config.headers['Authorization'] = uToken;
    }
    return config;
}, error => {
    console.log('报错了')
    Promise.reject(error);
})

axios.interceptors.response.use(res => {
    let {code} = res.data;
    console.log(res)
    message.warn(code)
    //用户没有登录
    //跳转登录界面
    if (code === 200) {
        // message.success('有token')
        return res;
    } else {
        return res;
        // message.warn('没token')
        // storageUtils.removeToken()
        // storageUtils.removeUser()
        // window.location.href = "/login"
        // message.warn("错误")
    }
}, error => {
    // message.warn('没token2')
    storageUtils.removeToken()
    storageUtils.removeUser()
    window.location.href = "/login"
})


export default function ajax(url, data = {}, type = 'GET') {


    return new Promise((resolve, reject) => {
        let promise
        // 1. 执行异步ajax请求
        if (type === 'GET') { // 发GET请求
            promise = axios.get(url, { // 配置对象
                params: data // 指定请求参数
            })
        } else { // 发POST请求
            promise = axios.post(url, data)
        }
        // 2. 如果成功了, 调用resolve(value)
        promise.then(response => {
            resolve(response.data)
            // 3. 如果失败了, 不调用reject(reason), 而是提示异常信息
        }).catch(error => {
            // reject(error)
            message.error('很抱歉，服务器出了点小问题，请稍后再试', 6)
        })
    })


}

// 请求登陆接口
// ajax('/login', {username: 'Tom', passsword: '12345'}, 'POST').then()
// 添加用户
// ajax('/manage/user/add', {username: 'Tom', passsword: '12345', phone: '13712341234'}, 'POST').then()
