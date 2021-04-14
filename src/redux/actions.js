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
    SUBMIT_ERROR
} from './action-types'
import storageUtils from "../utils/storageUtils";
import {reqLogin, reqSubmitOrder} from "../api";
import {message} from "antd";

/*
更新选中的物品的同步action
 */
export const updateOrder = (order) => ({type: UPDATE_ORDER, data: order})

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
            message.success('您的申请已提交，请注意查看您的邮件', 6)
        } else {
            return {type: SUBMIT_ERROR}
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
        const result = await reqLogin(username, password)  // {status: 0, data: user} {status: 1, msg: 'xxx'}
        // 2.1. 如果成功, 分发成功的同步action
        if (result.code === 200) {
            const user = result.data
            // 保存local中
            storageUtils.saveUser(user)
            // 分发接收用户的同步action
            dispatch(receiveUser(user))
        } else { // 2.2. 如果失败, 分发失败的同步action
            const msg = result.msg
            // message.error(msg)
            dispatch(showErrorMsg(msg))
        }
    }
}