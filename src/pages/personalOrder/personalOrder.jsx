import React, {Component} from 'react'
import {Button, Card, Input, InputNumber, message, Modal, Select, Table, Switch} from "antd";
import {PAGE_SIZE_APPLICATION} from "../../utils/constants";
import MyOrder from "../makeOrder/myOrder";
import {
    reqCancelRentalApplication,
    reqPersonalApplication,
    reqPersonalRentalApplication,
    reqCancelApplication
} from "../../api";
import {store_list} from '../../utils/constants'
import {connect} from "react-redux";
// const store_list = ['全部', '基础楼（北校区）', '理科楼（北校区）', '中心楼（北校区）', '数学楼（北校区）', '人文和社科楼（南校区）', '新兴科学楼（南校区）', '商学院（南校区）']
const {Option} = Select
const completed_list = ['completed', 'uncompleted']
const order_type_list = ['common', 'rental']


class PersonalOrder extends Component {

    state = {
        searchAddress: store_list[0],
        applications: [],
        total: 0,
        applicationId: [],
        showStatus: 0,
        verifyCode: null,
        searchCompleted: completed_list[0],
        searchOrderType: order_type_list[0],
    }

    cancelApplication = async (product) => {
        const {applicationId} = product
        const {searchOrderType} = this.state
        let result;
        if (searchOrderType === 'common') {
            result = await reqCancelApplication(applicationId)
        } else {
            console.log(product)
            result = await reqCancelRentalApplication(applicationId)
        }

        if (result.code === 200) {
            message.success('cancel successfully')
            this.getApplications(1)
        }

    }

    getApplications = async (currentPage) => {
        this.pageNum = currentPage
        const {searchAddress, searchOrderType, searchCompleted} = this.state;
        const id = this.props.user.id

        if (searchOrderType === 'rental' && searchCompleted === 'completed') {
            this.columns = [
                {
                    width: '15%',
                    title: 'product name',
                    dataIndex: 'rentalName',
                },
                {
                    title: 'address',
                    dataIndex: 'address',
                },
                {
                    title: 'date',
                    dataIndex: 'created'
                },
                {
                    title: 'unit',
                    dataIndex: 'unit',
                },
                {
                    title: 'quantity ',
                    dataIndex: 'number',
                },

                {
                    title: 'rental day',
                    dataIndex: 'rentalDay'
                },


            ]
        }
        if (searchOrderType === 'rental' && searchCompleted === 'uncompleted') {
            this.columns = [
                {
                    width: '15%',
                    title: 'product name',
                    dataIndex: 'rentalName',
                },
                {
                    title: 'address',
                    dataIndex: 'address',
                },
                {
                    title: 'date',
                    dataIndex: 'created'
                },
                {
                    title: 'unit',
                    dataIndex: 'unit',
                },
                {
                    title: 'quantity ',
                    dataIndex: 'number',
                },

                {
                    title: 'rental day',
                    dataIndex: 'rentalDay'
                },
                {
                    title: 'modify',
                    width: '15%',
                    render: (product) => {
                        return (
                            <div>
                                <Button style={{backgroundColor: '#f01e1e'}}
                                        onClick={() => this.cancelApplication(product)}><span
                                    style={{color: 'white'}}>cancel</span></Button>
                            </div>

                        )
                    }
                }
            ]
        }

        if (searchOrderType === 'common' && searchCompleted === 'completed') {
            this.columns = [
                {
                    width: '15%',
                    title: 'product name',
                    dataIndex: 'productName',
                },
                {
                    title: 'address',
                    dataIndex: 'address',
                },
                {
                    title: 'date',
                    dataIndex: 'date'
                },
                {
                    title: 'unit',
                    dataIndex: 'unit',
                },
                {
                    title: 'quantity ',
                    dataIndex: 'number',
                },
            ]
        }
        if (searchOrderType === 'common' && searchCompleted === 'uncompleted') {
            this.columns = [
                {
                    width: '15%',
                    title: 'product name',
                    dataIndex: 'productName',
                },
                {
                    title: 'address',
                    dataIndex: 'address',
                },
                {
                    title: 'date',
                    dataIndex: 'date'
                },
                {
                    title: 'unit',
                    dataIndex: 'unit',
                },
                {
                    title: 'quantity ',
                    dataIndex: 'number',
                },

                {
                    title: 'modify',
                    width: '15%',
                    render: (product) => {
                        return (
                            <div>
                                <Button style={{backgroundColor: '#f01e1e'}}
                                        onClick={() => this.cancelApplication(product)}><span
                                    style={{color: 'white'}}>cancel</span></Button>
                            </div>

                        )
                    }
                }
            ]
        }

        let result;
        if (searchOrderType === 'common') {
            result = await reqPersonalApplication({currentPage, id, searchAddress, searchCompleted})
        } else {
            result = await reqPersonalRentalApplication({currentPage, id, searchAddress, searchCompleted})
        }

        // message.success(result.code)
        if (result.code === 200) {
            const {records, total} = result.data
            this.setState({
                total,
                applications: records
            })
        }
    }

    componentWillMount() {
        this.initColumns()
    }

    componentDidMount() {
        this.getApplications(1)
    }

    initColumns = () => {

        this.columns = [
            {
                width: '15%',
                title: 'product name',
                dataIndex: 'productName',
            },
            {
                title: 'address',
                dataIndex: 'address',
            },
            {
                title: 'date',
                dataIndex: 'date'
            },
            {
                title: 'unit',
                dataIndex: 'unit',
            },
            {
                title: 'quantity ',
                dataIndex: 'number',
            },
        ]
    }

    onSelectChange = applicationId => {
        console.log('applicationId changed: ', applicationId);
        this.setState({applicationId});
    }


    render() {

        const {
            searchAddress,
            searchCompleted,
            applications,
            total,
            applicationId,
            searchOrderType,
        } = this.state

        const store = store_list.map((item => {
            return (
                <Option key={item} value={item}>{item}</Option>
            )
        }))

        const completed = completed_list.map((item => {
            return (
                <Option key={item} value={item}>{item}</Option>
            )
        }))

        const orderType = order_type_list.map((item => {
            return (
                <Option key={item} value={item}>{item}</Option>
            )
        }))

        const title = (
            <span>
                <Select
                    value={searchAddress}
                    style={{width: 400, margin: '0 15px'}}
                    onChange={value => this.setState({searchAddress: value}, () => this.getApplications(1))}
                >
                     {store}
                </Select>
                <Select
                    value={searchCompleted}
                    style={{width: 150, margin: '0 15px'}}
                    onChange={value => this.setState({searchCompleted: value}, () => this.getApplications(1))}
                >
                     {completed}
                </Select>
                <Select
                    value={searchOrderType}
                    style={{width: 150, margin: '0 15px'}}
                    onChange={value => this.setState({searchOrderType: value}, () => this.getApplications(1))}
                >
                     {orderType}
                </Select>
                {/*<Switch style={{marginLeft: 15}} checkedChildren="common" unCheckedChildren="rental" defaultChecked/>*/}
            </span>
        )

        const extra = (
            <div>
                <Button type='primary' onClick={this.verify}>
                    receive
                </Button>
            </div>
        )
        return (
            <div>
                <Card title={title} style={{borderRadius: '0px'}} extra={extra}>
                    <Table rowKey='applicationId' dataSource={applications}
                           columns={this.columns} bordered
                           loading={false}
                           pagination={{
                               current: this.pageNum,
                               total,
                               defaultPageSize: PAGE_SIZE_APPLICATION,
                               onChange: this.getApplications
                           }}/>
                </Card>
            </div>
        );
    }
}

export default connect(
    state => ({user: state.user}),
    {}
)(PersonalOrder)
