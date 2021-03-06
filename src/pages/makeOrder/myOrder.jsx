import {Component} from "react";
import {message, List, Typography, InputNumber, Table} from "antd";
import './myOrder.less'
import {connect} from "react-redux";
import {updateOrder} from "../../redux/actions";
import {deepClone} from "./deepClone";

class MyOrder extends Component {


    handleOrder = (number, id, address, unit, name, stock) => {
        if (number === 0) {
            const order_null = {}
            for (const item in this.props.order) {
                if (item === id) {
                    message.warn(item)
                } else {
                    order_null[item] = this.props.order[item]
                }
            }
            this.props.updateOrder(order_null)
        } else {
            let order_temp = deepClone(this.props.order)
            order_temp[id] = {
                'productId': id,
                'productName': name,
                'address': address,
                'number': number,
                'unit': unit,
                'stock': stock

            }
            this.props.updateOrder(order_temp)
        }
    }


    render() {

        const order = this.props.order

        const orderListArray = []

        for (const item in order) {
            orderListArray.push(item)
        }

        const orderList = orderListArray.map((item, value) => {
            return (
                <div key={value} className='order'>
                    <span className='order-list' style={{flex: 1, marginRight: 15}}>{(order[item])['productName']}</span>
                    <span className='order-list' style={{flex: 2, marginRight: 15}}>{(order[item])['address']}</span>
                    <span className='order-list' style={{flex: 1, marginRight: 15}}>{(order[item])['unit']}</span>
                    <InputNumber className='order-list' style={{flex: 1}} min={0} max={order[item]['stock']}
                                 value={(order[item])['number']}
                                 onChange={(e) => this.handleOrder(e, item, (order[item])['address'], (order[item])['unit'], (order[item]['productName']), (order[item]['stock']))}/>
                </div>
            )
        })

        return (
            <div>
                <List
                    bordered
                    dataSource={orderList}
                    renderItem={item => {
                        return (
                            <List.Item>
                                {item}
                            </List.Item>
                        )
                    }}
                />
            </div>
        );
    }
}

export default connect(
    state => ({order: state.order}),
    {updateOrder}
)(MyOrder)