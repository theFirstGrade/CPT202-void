/*
要求: 能根据接口文档定义接口请求
包含应用中所有接口请求函数的模块
每个函数的返回值都是promise

基本要求: 能根据接口文档定义接口请求函数
 */
// import jsonp from 'jsonp'
import {message} from 'antd'
import ajax from './ajax'
// import jsonp from 'jsonp'

// const BASE = 'http://localhost:5000'
const BASE = ''
// 登陆
/*
export function reqLogin(username, password) {
  return ajax('/login', {username, password}, 'POST')
}*/
export const reqLogin = (username, password) => ajax(BASE + '/login', {username, password}, 'POST')

export const reqProducts = (currentPage) => ajax(BASE + '/depository', {currentPage})

export const reqRentalDepository = (currentPage) => ajax(BASE + '/rentalDepository', {currentPage})

export const reqSearchProducts = ({
                                      currentPage,
                                      searchCate,
                                      searchAddress,
                                      searchName
                                  }) => ajax(BASE + '/depository/search', {
    currentPage,
    searchCate,
    searchAddress,
    searchName
})

export const reqSearchRentalProducts = ({
                                            currentPage,
                                            searchCate,
                                            searchAddress,
                                            searchName
                                        }) => ajax(BASE + '/rentalProducts/search', {
    currentPage,
    searchCate,
    searchAddress,
    searchName
})

export const reqSubmitOrder = (userId, email, data) => ajax(BASE + '/application', {userId, email, data}, 'POST')

export const reqSubmitRentalOrder = (userId, email, data) => ajax(BASE + '/rentalApplication', {
    userId,
    email,
    data
}, 'POST')

export const reqApplications = (currentPage) => ajax(BASE + '/getApplication', {currentPage})

export const reqRentalApplications = (currentPage) => ajax(BASE + '/getRentalApplication', {currentPage})

export const reqSearchApplications = ({
                                          currentPage,
                                          searchAddress,
                                          verifyCode
                                      }) => ajax(BASE + '/getApplication/search', {
    currentPage,
    searchAddress,
    verifyCode
})

export const reqSearchRentalApplications = ({
                                          currentPage,
                                          searchAddress,
                                          verifyCode
                                      }) => ajax(BASE + '/getRentalApplication/search', {
    currentPage,
    searchAddress,
    verifyCode
})

export const reqVerify = ({verifyCode, applicationId}) => ajax(BASE + '/verifyApplication', {
    verifyCode,
    applicationId
}, 'POST')

export const reqRentalVerify = ({verifyCode, applicationId}) => ajax(BASE + '/verifyRentalApplication', {
    verifyCode,
    applicationId
}, 'POST')

export const reqRentalProducts = ({
                                      currentPage,
                                      searchCate,
                                      searchAddress,
                                      searchName
                                  }) => ajax(BASE + '/getRentalProducts', {
    currentPage,
    searchCate,
    searchAddress,
    searchName
})

export const reqDepository = ({
                                  currentPage,
                                  searchCate,
                                  searchAddress,
                                  searchName
                              }) => ajax(BASE + '/getProducts', {
    currentPage,
    searchCate,
    searchAddress,
    searchName
})

export const reqAddRentalProduct = (
    productName,
    productImage,
    productUnit,
    productCate,
    productAddress
) => ajax(BASE + '/addRentalProduct', {
    productName,
    productImage,
    productUnit,
    productCate,
    productAddress
}, 'POST')

export const reqAddProduct = (
    productName,
    productImage,
    productUnit,
    productCate,
    productAddress
) => ajax(BASE + '/addProduct', {
    productName,
    productImage,
    productUnit,
    productCate,
    productAddress
}, 'POST')

export const reqChangeRentalDepository = (rentalDepositoryId, rentalDepositoryStock) => ajax(BASE + '/rentalStock/change', {
    rentalDepositoryId,
    rentalDepositoryStock
}, 'POST')

export const reqChangeDepository = (depositoryId, depositoryStock) => ajax(BASE + '/stock/change', {
    depositoryId,
    depositoryStock
}, 'POST')

