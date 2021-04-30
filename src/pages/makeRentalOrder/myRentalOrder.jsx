import {Component} from "react";
import {message, List, Typography, InputNumber, Table} from "antd";
import './myRentalOrder.less'
import {connect} from "react-redux";
import {updateRentalOrder} from "../../redux/actions";
import {deepClone} from "./deepClone";

class MyRentalOrder extends Component {


    handleOrder = (number, name, address, unit, id, days, stock) => {
        if (number === 0 && days === 0) {
            const order_null = {}
            for (const item in this.props.rentalOrder) {
                if (parseInt(item) === id) {

                } else {
                    order_null[item] = this.props.rentalOrder[item]
                }
            }
            this.props.updateRentalOrder(order_null)
        } else {
            let order_temp = deepClone(this.props.rentalOrder)
            console.log(1234)
            order_temp[id] = {
                'depositoryId': id,
                'rentalName': name,
                'address': address,
                'number': number,
                'unit': unit,
                'days': days,
                'stock': stock
            }
            this.props.updateRentalOrder(order_temp)
        }
    }

    handleRentalDay = (days, name, address, unit, id, number, stock) => {
        if (number === 0 && days === 0) {
            const order_null = {}
            for (const item in this.props.rentalOrder) {
                if (parseInt(item) === id) {

                } else {
                    order_null[item] = this.props.rentalOrder[item]
                }
            }
            this.props.updateRentalOrder(order_null)
        } else {
            let order_temp = deepClone(this.props.rentalOrder)
            order_temp[id] = {
                'depositoryId': id,
                'rentalName': name,
                'address': address,
                'number': number,
                'unit': unit,
                'days': days,
                'stock': stock
            }
            this.props.updateRentalOrder(order_temp)
        }
    }


    render() {

        const order = this.props.rentalOrder

        const orderListArray = []

        for (const item in order) {
            orderListArray.push(item)
        }

        const orderList = orderListArray.map((item, value) => {
            return (
                <div key={value} className='order'>
                    <span className='order-list' style={{flex: 1}}>{(order[item])['rentalName']}</span>
                    <span className='order-list' style={{flex: 2}}>{(order[item])['address']}</span>
                    <span className='order-list' style={{flex: 1}}>{(order[item])['unit']}</span>
                    <span>数量:&nbsp;</span>
                    <InputNumber className='order-list' style={{flex: 1, marginRight: 15}} min={0}
                                 max={order[item]['stock']}
                                 value={(order[item])['number']}
                                 onChange={(e) => this.handleOrder(e, (order[item])['rentalName'], (order[item])['address'], (order[item])['unit'], (order[item]['depositoryId']), (order[item]['days']), (order[item]['stock']))}/>
                    <span>时间:&nbsp;</span>
                    <InputNumber className='order-list' style={{flex: 1}} min={0} max={30}
                                 value={(order[item])['days']}
                                 onChange={(e) => this.handleRentalDay(e, (order[item])['rentalName'], (order[item])['address'], (order[item])['unit'], (order[item]['depositoryId']), (order[item]['number']), (order[item]['stock']))}/>
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
    state => ({rentalOrder: state.rentalOrder}),
    {updateRentalOrder}
)(MyRentalOrder)