import React, {Component} from 'react'
import {Button, Card, Input, InputNumber, message, Modal, Select, Table} from "antd";
import {PAGE_SIZE_APPLICATION} from "../../utils/constants";
import MyOrder from "../makeOrder/myOrder";
import {reqApplications, reqSearchApplications, reqVerify} from "../../api";
import {store_list} from '../../utils/constants'

// const store_list = ['全部', '基础楼（北校区）', '理科楼（北校区）', '中心楼（北校区）', '数学楼（北校区）', '人文和社科楼（南校区）', '新兴科学楼（南校区）', '商学院（南校区）']
const {Option} = Select

export default class Application extends Component {
    state = {
        searchAddress: store_list[0],
        userId: null,
        applications: [],
        total: 0,
        applicationId: [],
        showStatus: 0,
        verifyCode: null,
        focusInput: false
    }

    getApplications = async (currentPage) => {
        this.pageNum = currentPage
        const {searchAddress, verifyCode} = this.state;
        if (verifyCode && isNaN(verifyCode)) {
            // console.log(userId, typeof userId)
            message.warn('verifyCode must be an integer')
            return
        }

        let result;
        if ((searchAddress !== '全部' && searchAddress !== 'All') || verifyCode) {
            result = await reqSearchApplications({currentPage, searchAddress, verifyCode})
        } else {
            result = await reqApplications(currentPage)
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
                title: 'product name',
                dataIndex: 'productName',
            },
            {
                title: 'address',
                dataIndex: 'address',
            },
            {
                title: 'quantity ',
                dataIndex: 'number',
            },
            {
                title: 'unit',
                dataIndex: 'unit',
            },
            {
                title: 'recipient',
                dataIndex: 'username',
            }

        ]
    }

    onSelectChange = applicationId => {
        console.log('applicationId changed: ', applicationId);
        this.setState({applicationId});
    }


    verify = async () => {
        const {verifyCode, applicationId} = this.state

        console.log(typeof verifyCode)
        if (!verifyCode || verifyCode.length === 0) {
            message.warn('please enter the verify code')
            return
        } else if (isNaN(verifyCode)) {
            message.warn('the verify code should be an integer')
            return
        }

        console.log(applicationId)
        if (!applicationId || applicationId.length === 0) {
            message.warn('please select the product')
            return
        }

        const result = await reqVerify({verifyCode, applicationId})
        if (result.code === 200) {
            message.success('verify successfully')
            this.setState({verifyCode: null, applicationId: []})
        } else {
            message.error('fail to verify！')
        }

        this.getApplications(1)
    }

    render() {

        const {searchAddress, showStatus, applications, total, applicationId, verifyCode, focusInput} = this.state

        const rowSelection = {
            applicationId,
            onChange: this.onSelectChange,
        };

        const store = store_list.map((item => {
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
                <Input
                    value={verifyCode}
                    placeholder='verify code'
                    style={{width: 150, marginRight: '15px'}}
                    onChange={event => this.setState({verifyCode: event.target.value})}
                />
                <Button type='primary' onClick={() => this.getApplications(1)}>search</Button>
            </span>
        )

        const extra = (
            // <Button type='primary' onClick={this.showOrder}>
            //     验证
            // </Button>
            <div>
                {/*订单的验证码:&nbsp;&nbsp;*/}
                {/*<Input*/}
                {/*    maxLength={4}*/}
                {/*    style={{width: '150px', marginRight:'15px'}}*/}
                {/*    value={verifyCode}*/}
                {/*    onChange={event => this.setState({verifyCode: event.target.value})}*/}
                {/*    onPressEnter={this.verify}*/}
                {/*    autoFocus={true}*/}
                {/*/>*/}
                <Button type='primary' onClick={this.verify}>
                    verify
                </Button>
            </div>
        )
        return (
            <div>
                <Card title={title} style={{borderRadius: '0px'}} extra={extra}>
                    <Table rowSelection={rowSelection} rowKey='applicationId' dataSource={applications}
                           columns={this.columns} bordered
                           loading={false}
                           pagination={{
                               current: this.pageNum,
                               total,
                               defaultPageSize: PAGE_SIZE_APPLICATION,
                               onChange: this.getApplications
                           }}/>
                    {/*<Modal*/}
                    {/*    title="验证"*/}
                    {/*    visible={showStatus === 1}*/}
                    {/*    onOk={this.verify}*/}
                    {/*    onCancel={this.hideOrder}*/}
                    {/*    okText='提交'*/}
                    {/*    cancelText='返回'*/}
                    {/*>*/}
                    {/*<MyOrder order={order} column={this.columns}/>*/}
                    {/*订单的验证码:&nbsp;&nbsp;*/}
                    {/*<Input*/}
                    {/*    maxLength={4}*/}
                    {/*    style={{width: '17%'}}*/}
                    {/*    value={verifyCode}*/}
                    {/*    onChange={event => this.setState({verifyCode: event.target.value})}*/}
                    {/*    onPressEnter={this.verify}*/}
                    {/*    autoFocus={true}*/}
                    {/*/>*/}
                    {/*</Modal>*/}
                </Card>
            </div>
        );
    }
}

