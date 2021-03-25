import React, {Component} from 'react'
import {Select, Input, Button, Card, Table, Modal, InputNumber, message} from 'antd'
import {productList} from '../../res/test/productList'
import {productList2} from '../../res/test/productList2'
import './makeOrder.less'
import {reqLogin} from "../../api";
import MyOrder from "./myOrder";
import {connect} from 'react-redux'
import {updateOrder} from '../../redux/actions'
import {deepClone} from './deepClone'

const {Option} = Select
const category_list = ['书写用品', '桌面用品', '文件管理用品', '纸质用品', '财务用品', '辅助用品']
const store_list = ['基础楼（北校区）', '理科楼（北校区）', '中心楼（北校区）', '数学楼（北校区）', '人文和社科楼（南校区）', '新兴科学楼（南校区）', '商学院（南校区）']

class MakeOrder extends Component {

    state = {
        searchType: category_list[0],
        searchStore: store_list[0],
        product: productList,
        showStatus: 0,
    }

    sendOrder = () => {
        message.success('您的申请已提交，请注意查看您的邮件', 6)
        this.hideOrder()
    }


    handleOrder = (number, product) => {
        const {name, address, unit} = product
        if (number === 0) {
            const order_null = {}
            for (const item in this.props.order) {
                if (item === name) {

                } else {
                    order_null[item] = this.props.order[item]
                }
            }
            this.props.updateOrder(order_null)
        } else {
            const order_temp = deepClone(this.props.order)
            order_temp[name] = {'address': address, 'number': number, 'unit': unit}
            this.props.updateOrder(order_temp)
        }
    }


    showOrder = () => {
        this.setState({showStatus: 1})
    }

    hideOrder = () => {
        this.setState({showStatus: 0})
    }

    getProduct = async () => {
        const result = await reqLogin('11', '111')
        message.success(result.code)
        this.setState({
            product: this.state.product === productList2 ? productList : productList2,
        }, () => {
            // console.log(this.state.number['hahaha'])
        })
    }

    componentWillMount() {
        this.initColumns()
    }

    handleDelete = (key) => {
        const dataSource = [...this.state.dataSource];
        this.setState({
            dataSource: dataSource.filter((item) => item.key !== key),
        });
    };


    initColumns = () => {

        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
            },
            {
                title: '图片',
                dataIndex: 'pic',
            },
            {
                title: '仓库地址',
                dataIndex: 'address',
            },
            {
                width: 100,
                title: '剩余库存',
                dataIndex: 'price',
                // render: (price) => '￥' + price
            },
            {
                title: '单位',
                dataIndex: 'name',
            },
            {
                title: '已选数量',
                // dataIndex: 'number',
                render: (product) => {
                    const {name} = product
                    // console.log(this.props.order)
                    return (
                        /**
                         * order:{name1:{address,number,unit},name2:{},name3}
                         */
                        <InputNumber min={0} max={10}
                                     value={this.props.order[name] === undefined || null ? 0 : ((this.props.order[name])['number'])}
                                     onChange={(e) => this.handleOrder(e, product)}/>
                    )
                }
            },

        ]
    }


    render() {
        const {searchType, product, searchStore, showStatus} = this.state
        const order = this.props.order
        const category = category_list.map((item => {
            {
                return (
                    <Option value={item}>{item}</Option>
                )
            }
        }))

        const store = store_list.map((item => {
            return (
                <Option value={item}>{item}</Option>
            )
        }))


        const title = (
            <span>
                 <Select
                     value={searchType}
                     style={{width: 150}}
                     onChange={value => this.setState({searchType: value})}
                 >
                    {category}
                 </Select>
                 <Select
                     value={searchStore}
                     style={{width: 170, margin: '0 15px'}}
                     onChange={value => this.setState({searchStore: value})}
                 >
                     {store}
                </Select>
                <Input
                    placeholder='关键字'
                    style={{width: 150, marginRight: '15px'}}
                    onChange={event => this.setState({searchName: event.target.value})}
                />
                <Button type='primary' onClick={() => this.getProduct()}>搜索</Button>
      </span>
        )

        const extra = (
            <Button type='primary' onClick={this.showOrder}>
                我的订单
            </Button>
        )
        return (
            <div>
                <Card title={title} style={{borderRadius: '0px'}} extra={extra}>
                    <Table rowKey='_id' dataSource={product} columns={this.columns} bordered loading={false}/>

                    <Modal
                        title="我的订单"
                        visible={showStatus === 1}
                        onOk={this.sendOrder}
                        onCancel={this.hideOrder}
                        okText='提交'
                        cancelText='返回'
                    >
                        <MyOrder order={order} column={this.columns}/>
                    </Modal>
                </Card>
            </div>
        );
    }
}

export default connect(
    state => ({order: state.order}),
    {updateOrder}
)(MakeOrder)

