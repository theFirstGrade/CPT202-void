/*
用来根据老的state和指定的action生成并返回新的state的函数
 */
import {combineReducers} from 'redux'

/*
用来管理头部标题的reducer函数
 */
import {
    RECEIVE_USER,
    SHOW_ERROR_MSG,
    RESET_USER,
    UPDATE_ORDER,
    SUBMIT_ORDER,
    SUBMIT_ERROR
} from './action-types'
import {message} from "antd";
import storageUtils from "../utils/storageUtils";


function order(state = {}, action) {
    switch (action.type) {
        case UPDATE_ORDER:
            return action.data
        case SUBMIT_ERROR:
            const errorMsg = action.errorMsg
            message.error(errorMsg)
            return
        default:
            return state
    }
}

const initUser = storageUtils.getUser()

/*
用来管理当前登陆用户的reducer函数
 */
function user(state = initUser, action) {
    switch (action.type) {
        case RECEIVE_USER:
            return action.user
        case SHOW_ERROR_MSG:
            const errorMsg = action.errorMsg
            // state.errorMsg = errorMsg  // 不要直接修改原本状态数据
            message.error(errorMsg)
            return {...state, errorMsg}
        case RESET_USER:
            return {}
        default:
            return state
    }
}

/*
向外默认暴露的是合并产生的总的reducer函数
管理的总的state的结构:
  {
    headTitle: '首页',
    user: {}
  }
 */
export default combineReducers({
    order, user
})