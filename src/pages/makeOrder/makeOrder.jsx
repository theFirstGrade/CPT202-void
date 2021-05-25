import React, {Component} from 'react'
import {Select, Input, Button, Card, Table, Modal, InputNumber, message, Image} from 'antd'
import {productList} from '../../res/test/productList'
import {productList2} from '../../res/test/productList2'
import './makeOrder.less'
import {reqProducts, reqSearchProducts} from "../../api";
import MyOrder from "./myOrder";
import {connect} from 'react-redux'
import {updateOrder, submitOrder} from '../../redux/actions'
import {deepClone} from './deepClone'
import {PAGE_SIZE} from '../../utils/constants'
import {category_list, store_list} from '../../utils/constants'

const {Option} = Select
// const category_list = ['全部', '书写用品', '桌面用品', '文件管理用品', '纸质用品', '财务用品', '辅助用品']
// const store_list = ['全部', '基础楼（北校区）', '理科楼（北校区）', '中心楼（北校区）', '数学楼（北校区）', '人文和社科楼（南校区）', '新兴科学楼（南校区）', '商学院（南校区）']

class MakeOrder extends Component {

    state = {
        searchCate: category_list[0],
        searchAddress: store_list[0],
        searchName: '',
        product: [],
        showStatus: 0,
        total: 0
    }

    sendOrder = () => {
        // message.success('您的申请已提交，请注意查看您的邮件', 6)

        if (JSON.stringify(this.props.order) === "{}") { // 将json对象转化为json字符串，再判断该字符串是否为"{}" ！！！！！！
            message.info('please select a product')
        } else {

            Modal.confirm({
                content: 'confirm to submit your order? Please check successfully',
                okText: 'confirm',
                cancelText: 'back',
                onOk: () => {

                    this.props.submitOrder(this.props.user.id, this.props.user.email, this.props.order) // 提交订单，并将redux中的订单数据清空
                    this.hideOrder()
                    setTimeout(
                        () => {
                            this.getProducts(1)
                        }, 2500
                    )
                },
                onCancel() {
                },
            })
        }
    }


    handleOrder = (number, product) => {
        const {productName, address, unit, productId, stock} = product
        if (number === 0) {
            const order_null = {}
            for (const item in this.props.order) {
                if (parseInt(item) === productId) {
                    console.log(item)
                } else {
                    order_null[item] = this.props.order[item]
                }
            }
            this.props.updateOrder(order_null)
        } else {
            const order_temp = deepClone(this.props.order)
            order_temp[productId] = {
                'productId': productId,
                'productName': productName,
                'address': address,
                'number': number,
                'unit': unit,
                'stock': stock
            }
            this.props.updateOrder(order_temp)
        }
    }


    showOrder = () => {
        this.setState({showStatus: 1})
    }

    hideOrder = () => {
        this.setState({showStatus: 0})
    }


    componentWillMount() {
        this.initColumns()
    }

    componentDidMount() {
        this.getProducts(1)
    }

    getProducts = async (currentPage) => {
        this.pageNum = currentPage
        const {searchCate, searchAddress, searchName} = this.state;
        let result;
        if (searchCate !== '全部' || (searchAddress !== '全部' && searchAddress !== 'All') || searchName !== '') {
            result = await reqSearchProducts({currentPage, searchCate, searchAddress, searchName})
        } else {
            result = await reqProducts(currentPage)
        }

        // message.success(result.code)
        if (result.code === 200) {
            const {records, total} = result.data
            this.setState({
                total,
                product: records
            })
        }
        console.log(result)
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
                width: '15%',
                title: 'product name',
                dataIndex: 'productName',
            },
            {
                width: '10%',
                title: 'picture',
                dataIndex: 'imageSrc',
                render: (image) => {
                    const imageSrc = image.split('\\')
                    const src = imageSrc[imageSrc.length - 1]
                    return (
                        image ? <Image width={100}
                                       src={'images/' + src}/> :
                            <span style={{fontWeight: 300, color: "grey"}}>暂时无图片</span>
                    )
                }
            },
            {
                width: '15%',
                title: 'address',
                dataIndex: 'address',
            },
            {
                width: '15%',
                title: 'stock',
                dataIndex: 'stock',
                // render: (price) => '￥' + price
            },
            {
                title: 'unit',
                dataIndex: 'unit',
            },
            {
                title: 'Selected quantity',
                // dataIndex: 'number',
                render: (product) => {
                    const {productName, productId} = product
                    // console.log(product)
                    return (
                        /**
                         * order:{name1:{address,number,unit},name2:{},name3}
                         */
                        <InputNumber min={0} max={product.stock}
                                     value={(this.props.order[productId] !== undefined || null) ? ((this.props.order[productId])['number']) : 0}
                                     onChange={(e) => this.handleOrder(e, product)}/>
                    )
                }
            },

        ]
    }


    render() {
        const {searchCate, product, searchAddress, showStatus, total} = this.state
        const order = this.props.order
        const category = category_list.map((item => {
            {
                return (
                    <Option key={item} value={item}>{item}</Option>
                )
            }
        }))

        const store = store_list.map((item => {
            return (
                <Option key={item} value={item}>{item}</Option>
            )
        }))


        const title = (
            <span>
                 <Select
                     value={searchCate}
                     style={{width: 250}}
                     onChange={value => this.setState({searchCate: value}, () => this.getProducts(1))}
                 >
                    {category}
                 </Select>
                 <Select
                     value={searchAddress}
                     style={{width: 400, margin: '0 15px'}}
                     onChange={value => this.setState({searchAddress: value}, () => this.getProducts(1))}
                 >
                     {store}
                </Select>
                <Input
                    placeholder='key words'
                    style={{width: 150, marginRight: '15px'}}
                    onChange={event => this.setState({searchName: event.target.value})}
                />
                <Button type='primary' onClick={() => this.getProducts(1)}>search</Button>
      </span>
        )

        const extra = (
            <Button type='primary' onClick={this.showOrder}>
                my order
            </Button>
        )
        return (
            <div>
                <Card title={title} style={{borderRadius: '0px'}} extra={extra}>
                    <Table rowKey='productId' dataSource={product} columns={this.columns} bordered loading={false}
                           pagination={{
                               current: this.pageNum,
                               total,
                               defaultPageSize: PAGE_SIZE,
                               onChange: this.getProducts
                           }}/>

                    <Modal
                        title="my order"
                        visible={showStatus === 1}
                        onOk={this.sendOrder}
                        onCancel={this.hideOrder}
                        okText='submit'
                        cancelText='back'
                    >
                        <MyOrder order={order} column={this.columns}/>
                    </Modal>
                </Card>
            </div>
        );
    }
}

export default connect(
    state => ({order: state.order, user: state.user}),
    {updateOrder, submitOrder}
)(MakeOrder)

