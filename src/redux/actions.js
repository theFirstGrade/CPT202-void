/*
包含n个action creator函数的模块
同步action: 对象 {type: 'xxx', data: 数据值}
异步action: 函数  dispatch => {}
 */
import {
    RESET_USER,
    RECEIVE_USER,
    SHOW_ERROR_MSG,
    UPDATE_ORDER,
    SUBMIT_ORDER,
    SUBMIT_ERROR,
    UPDATE_RENTAL_ORDER,
    SUBMIT_RENTAL_ERROR
} from './action-types'
import storageUtils from "../utils/storageUtils";
import {reqLogin, reqSubmitOrder, reqSubmitRentalOrder} from "../api";
import {message} from "antd";
import axios from 'axios'

/*
更新选中的物品的同步action
 */
export const updateOrder = (order) => ({type: UPDATE_ORDER, data: order})

export const updateRentalOrder = (orderRental) => ({type: UPDATE_RENTAL_ORDER, data: orderRental})

export const submitOrder = (userId, email, order) => {
    return async dispatch => {
        const data = []
        for (const item in order) {
            data.push({
                'productName': order[item]['productName'],
                'productId': order[item]['productId'],
                'address': order[item]['address'],
                'number': order[item]['number'],
                'unit': order[item]['unit']
            })
        }
        console.log(data)
        const result = await reqSubmitOrder(userId, email, data)
        if (result.code === 200) {
            dispatch(updateOrder({}))
            // message.success('您的申请已提交，请注意查看您的邮件', 6)
            message.success('submit successfully, please check your email', 6)
        } else {
            return {type: SUBMIT_ERROR}
        }
    }
}

export const submitRentalOrder = (userId, email, order) => {
    return async dispatch => {
        const data = []
        for (const item in order) {
            if (order[item]['number'] === 0 || order[item]['days'] === 0) {
                // message.warn('请勿将数量或时间设为0')
                message.warn('the quantity and days cannot be 0')
                return
            }
            data.push({
                'rentalName': order[item]['rentalName'],
                'address': order[item]['address'],
                'number': order[item]['number'],
                'unit': order[item]['unit'],
                'days': order[item]['days'],
                'depositoryId': order[item]['depositoryId']
            })
        }
        console.log(data)
        const result = await reqSubmitRentalOrder(userId, email, data)
        if (result.code === 200) {
            dispatch(updateRentalOrder({}))
            message.success('submit successfully, please check your email', 6)
        } else {
            return {type: SUBMIT_RENTAL_ERROR}
        }
    }
}

/*
接收用户的同步action
 */
export const receiveUser = (user) => ({type: RECEIVE_USER, user})

/*
显示错误信息同步action
 */
export const showErrorMsg = (errorMsg) => ({type: SHOW_ERROR_MSG, errorMsg})

export const logout = () => {
    // 删除local中的user
    storageUtils.removeUser()
    // 返回action对象
    return {type: RESET_USER}
}
/*
登陆的异步action
 */

export const login = (username, password) => {

    return async dispatch => {
        // 1. 执行异步ajax请求
        // const result = await reqLogin(username, password)  // {status: 0, data: user} {status: 1, msg: 'xxx'}
        // // 2.1. 如果成功, 分发成功的同步action
        // if (result.code === 200) {
        //     const user = result.data
        //     // 保存local中
        //     storageUtils.saveUser(user)
        //     storageUtils.saveToken()
        //     // 分发接收用户的同步action
        //     dispatch(receiveUser(user))
        // } else { // 2.2. 如果失败, 分发失败的同步action
        //     const msg = result.msg
        //     // message.error(msg)
        //     dispatch(showErrorMsg(msg))
        // }

        axios.post('/login', {username, password}).then((res) => {
            if (res.data.code === 200) {
                console.log(res)
                const user = res.data.data
                const token = res.headers.authorization
                storageUtils.saveUser(user)
                storageUtils.saveToken(token)
                dispatch(receiveUser(user))
                // console.log(res.headers.authorization)
            } else {
                const msg = res.data.msg
                dispatch(showErrorMsg(msg))
            }
        })
    }
    // this.axios.post('http://localhost:8080/login', {username, password}).then
    // ((res) => {
    //     console.log(res)
    //     // const token = res.headers['Authorization']
    //     // storageUtils.saveToken(token)
    //     // storageUtils.saveUser(res.data)
    // })
}