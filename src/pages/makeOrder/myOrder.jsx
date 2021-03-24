import {Component} from "react";
import {InputNumber, Table} from "_antd@4.14.0@antd";
import {message, List, Typography} from "antd";
import './myOrder.less'

export default class MyOrder extends Component {

    state = {
        order: []
    }


    handleOrder = (e, name) => {
        // console.log(e, name)
        this.props.handleOrderFromModal(e, name)

    }


    render() {

        const {order} = this.props
        const orderList = order.map((item, value) => {
            return (
                <div key={value} className='order'>
                    <span className='order-list' style={{flex: 1}}>{item.name}</span>
                    <span className='order-list' style={{flex: 2}}>{item.address}</span>
                    <span className='order-list' style={{flex: 1}}>{item.unit}</span>
                    <InputNumber className='order-list' style={{flex: 1}} min={0} max={10} value={item.number}
                                 onChange={(e) => this.handleOrder(e, item.name)}/>
                </div>
            )
        })

        return (
            <div>
                <List
                    bordered
                    dataSource={orderList}
                    renderItem={item => {
                        console.log(order)
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
