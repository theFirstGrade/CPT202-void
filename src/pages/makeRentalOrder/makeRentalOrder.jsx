import React, {Component} from 'react'
import {Select, Input, Button, Card, Table, Modal, InputNumber, message, Image} from 'antd'
import './makeRentalOrder.less'
import {reqRentalDepository, reqSearchRentalProducts} from "../../api";
import MyOrder from "./myRentalOrder";
import {connect} from 'react-redux'
import {updateRentalOrder, submitRentalOrder} from '../../redux/actions'
import {deepClone} from './deepClone'
import {PAGE_SIZE} from '../../utils/constants'
import {category_list, store_list, chooseStore} from '../../utils/constants'

const {Option} = Select
// const category_list2 = ['全部', '书写用品', '桌面用品', '文件管理用品', '纸质用品', '财务用品', '辅助用品']
// const category_list = ['All', 'Writing supplies', 'Desktop products', 'Document management supplies', 'Paper products', 'Financial supplies']
// const store_list2 = ['全部', '基础楼（北校区）', '理科楼（北校区）', '中心楼（北校区）', '数学楼（北校区）', '人文和社科楼（南校区）', '新兴科学楼（南校区）', '商学院（南校区）']
// const store_list = ['All', 'Foundation building (North Campus)', 'Science building (North Campus)', 'Center building (North Campus)', 'Mathematics building (North Campus)', 'Humanities and Social Sciences Building (South Campus)', 'Emerging Science Building (South Campus)','Business school (South Campus)']

class MakeRentalOrder extends Component {

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

        if (JSON.stringify(this.props.rentalOrder) === "{}") { // 将json对象转化为json字符串，再判断该字符串是否为"{}" ！！！！！！
            message.info('please select a product')
        } else {

            Modal.confirm({
                content: 'confirm to submit your order? Please check successfully',
                okText: 'confirm',
                cancelText: 'back',
                onOk: () => {

                    this.props.submitRentalOrder(this.props.user.id, this.props.user.email, this.props.rentalOrder) // 提交订单，并将redux中的订单数据清空
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


    handleOrder = (number, product, days) => {
        const {rentalName, address, unit, depositoryId, stock} = product
        if (number === 0 && days === 0) {
            const order_null = {}
            for (const item in this.props.rentalOrder) {
                if (parseInt(item) === depositoryId) {

                } else {
                    order_null[item] = this.props.rentalOrder[item]
                }
            }
            this.props.updateRentalOrder(order_null)
        } else {
            const order_temp = deepClone(this.props.rentalOrder)
            order_temp[depositoryId] = {
                'depositoryId': depositoryId,
                'rentalName': rentalName,
                'address': address,
                'number': number,
                'unit': unit,
                'days': days,
                'stock': stock
            }
            this.props.updateRentalOrder(order_temp)
        }
    }

    handleRentalDay = (days, product, number) => {
        const {rentalName, address, unit, depositoryId, stock} = product
        if (number === 0 && days === 0) {
            const order_null = {}
            for (const item in this.props.rentalOrder) {
                if (parseInt(item) === depositoryId) {
                    message.warn(days)

                } else {
                    order_null[item] = this.props.rentalOrder[item]
                }
            }
            this.props.updateRentalOrder(order_null)
        } else {
            const order_temp = deepClone(this.props.rentalOrder)
            order_temp[depositoryId] = {
                'depositoryId': depositoryId,
                'rentalName': rentalName,
                'address': address,
                'number': number,
                'unit': unit,
                'days': days,
                'stock': stock
            }
            this.props.updateRentalOrder(order_temp)
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
            result = await reqSearchRentalProducts({currentPage, searchCate, searchAddress, searchName})
        } else {
            result = await reqRentalDepository(currentPage)
        }

        // message.success(result.code)
        if (result.code === 200) {
            const {records, total} = result.data
            console.log(records)
            this.setState({
                total,
                product: records
            })
        }
    }


    initColumns = () => {

        this.columns = [
            {
                width: '15%',
                title: 'product name',
                dataIndex: 'rentalName',
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
                width: '10%',
                title: 'unit',
                dataIndex: 'unit',
            },
            {
                title: 'Selected quantity',
                // dataIndex: 'number',
                render: (product) => {
                    const {depositoryId, stock} = product
                    const days = this.props.rentalOrder[depositoryId] !== undefined || null ? ((this.props.rentalOrder[depositoryId])['days']) : 0
                    // console.log(product)
                    return (
                        /**
                         * order:{name1:{address,number,unit},name2:{},name3}
                         */
                        <InputNumber min={0} max={stock}
                                     value={(this.props.rentalOrder[depositoryId] !== undefined || null) ? ((this.props.rentalOrder[depositoryId])['number']) : 0}
                                     onChange={(e) => this.handleOrder(e, product, days)}/>
                    )
                }
            },
            {
                title: 'rental days',
                render: (product) => {
                    const {depositoryId} = product
                    const number = this.props.rentalOrder[depositoryId] !== undefined || null ? ((this.props.rentalOrder[depositoryId])['number']) : 0
                    return (
                        <InputNumber min={0} max={30}
                                     value={(this.props.rentalOrder[depositoryId] !== undefined || null) ? ((this.props.rentalOrder[depositoryId])['days']) : 0}
                                     onChange={(e) => this.handleRentalDay(e, product, number)}
                        />
                    )
                }
            }

        ]
    }


    render() {
        const {searchCate, product, searchAddress, showStatus, total} = this.state
        const order = this.props.rentalOrder
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
                <span style={{
                    color: 'grey',
                    marginLeft: 20
                }}>{chooseStore(this.props.user.building)}&nbsp;is&nbsp;the&nbsp;closest&nbsp;</span>
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
                    <Table rowKey='depositoryId' dataSource={product} columns={this.columns} bordered loading={false}
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
    state => ({rentalOrder: state.rentalOrder, user: state.user}),
    {updateRentalOrder, submitRentalOrder}
)(MakeRentalOrder)

