import {Component} from 'react'
import {Select, Input, Button, Card, Table, Modal, InputNumber, message} from 'antd'
import {productList} from '../../res/test/productList'
import {productList2} from '../../res/test/productList2'
import './makeOrder.less'
import {reqLogin} from "../../api";
import MyOrder from "./myOrder";

const {Option} = Select
const category_list = ['书写用品', '桌面用品', '文件管理用品', '纸质用品', '财务用品', '辅助用品']
const store_list = ['基础楼（北校区）', '理科楼（北校区）', '中心楼（北校区）', '数学楼（北校区）', '人文和社科楼（南校区）', '新兴科学楼（南校区）', '商学院（南校区）']
// const local_number = localStorage.getItem('number')
// console.log(111, local_number)
export default class MakeOrder extends Component {

    state = {
        searchType: category_list[0],
        searchStore: store_list[0],
        product: productList,
        showStatus: 0,
        order: [],
        number: {}
    }

    sendOrder = () => {
        message.success('您的申请已提交，请注意查看您的邮件', 6)
        this.hideOrder()
    }

    componentDidMount() {

    }

    handleOrderFromModal = (number, name) => {
        const number_temp = this.state.number
        const order_temp = this.state.order

        // if (number_temp[name]) {
        number_temp[name] = number
        // }

        order_temp.map((item => {
            if (item.name === name) {
                item.number = number
            }
        }))

        this.setState({number: number_temp, order: order_temp})
    }


    handleOrder = (e, product) => {
        // console.log(product)
        // console.log(e)
        const {name, address} = product
        const order_temp = this.state.order
        const number_temp = this.state.number
        let flag = false
        order_temp.map((item => {
            if (item.name === name) {
                item.number = e
                number_temp[name] = e
                flag = true
            }
        }))

        if (!flag) {
            order_temp.push({name: name, address: address, number: e, unit: product.unit})
            number_temp[name] = e
        }

        this.setState({
            order: order_temp,
            number: number_temp
        }, () => {
            // console.log(this.state.order)
        })
    }


    showOrder = () => {
        this.setState({showStatus: 1})
    }

    hideOrder = () => {
        this.setState({showStatus: 0})
    }

    getProduct = async () => {
        localStorage.removeItem('number')
        // console.log(this.state.number)
        localStorage.setItem('number', JSON.stringify(this.state.number))
        const result = await reqLogin('11', '111')
        message.success(result.code)
        const number_temp = JSON.parse(localStorage.getItem('number'))
        this.setState({
            product: this.state.product === productList2 ? productList : productList2,
            number: number_temp
        }, () => {
            // console.log(this.state.number['hahaha'])
        })
    }

    // componentWillUpdate(){
    //     const number_temp = JSON.parse(localStorage.getItem('number'))
    //     if (number_temp) {
    //         this.setState({number: number_temp},()=>{console.log(this.state.number)})
    //     }else {
    //         console.log('number_temp为空')
    //     }
    // }
    componentWillMount() {
        // 此段代码为 刷新之后仍然保存着选择记录
        // const number_temp = JSON.parse(localStorage.getItem('number'))
        // if (number_temp) {
        //     this.setState({number: number_temp})
        // }
        this.initColumns()
    }

    handleDelete = (key) => {
        const dataSource = [...this.state.dataSource];
        this.setState({
            dataSource: dataSource.filter((item) => item.key !== key),
        });
    };

    initColumns = () => {
        // const temp = {}
        // this.state.product.map((item) => {
        //     temp[item.name] = 0
        // })
        //
        // this.setState({number: temp}, () => {
        //     // console.log(this.state.number)
        // })

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
                    console.log(this.state.number)
                    return (
                        <InputNumber min={0} max={10}
                                     value={this.state.number[name] === undefined || null ? 0 : this.state.number[name]}
                                     onChange={(e) => this.handleOrder(e, product)}/>
                    )
                }
            },

        ]
    }


    render() {
        const {searchType, product, searchStore, showStatus, order} = this.state
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
                     {/*<Option value='productName'>按名称搜索</Option>*/}
                     {/*<Option value='productDesc'>按描述搜索</Option>*/}
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
                        <MyOrder order={order} column={this.columns}
                                 handleOrderFromModal={this.handleOrderFromModal}
                        />
                    </Modal>
                </Card>
            </div>
        );
    }
}

