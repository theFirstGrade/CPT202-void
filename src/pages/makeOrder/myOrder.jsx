import {Component} from "react";
import {InputNumber, Table} from "_antd@4.14.0@antd";
import {message, List, Typography} from "antd";
import './myOrder.less'
import {connect} from "react-redux";
import {updateOrder} from "../../redux/actions";
import {deepClone} from "./deepClone";

class MyOrder extends Component {


    handleOrder = (number, name, address, unit) => {
        let order_temp = deepClone(this.props.order)
        order_temp[name] = {'address': address, 'number': number, 'unit': unit}
        this.props.updateOrder(order_temp)
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
                    <span className='order-list' style={{flex: 1}}>{item}</span>
                    <span className='order-list' style={{flex: 2}}>{(order[item])['address']}</span>
                    <span className='order-list' style={{flex: 1}}>{(order[item])['unit']}</span>
                    <InputNumber className='order-list' style={{flex: 1}} min={0} max={10}
                                 value={(order[item])['number']}
                                 onChange={(e) => this.handleOrder(e, item, (order[item])['address'], (order[item])['unit'])}/>
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