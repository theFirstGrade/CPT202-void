import React, {Component} from 'react'
import {Button, Card, Input, InputNumber, message, Radio, Select, Table} from "antd";
import {PAGE_SIZE_APPLICATION} from "../../utils/constants";
import MyOrder from "../makeOrder/myOrder";
import {
    reqRentalApplications,
    reqSearchRentalApplications,
    reqRentalVerify,
    reqReturnRentalApplications,
    reqSearchReturnRentalApplications,
    reqReturnRentalVerify
} from "../../api";
import {store_list} from '../../utils/constants'

// const store_list = ['全部', '基础楼（北校区）', '理科楼（北校区）', '中心楼（北校区）', '数学楼（北校区）', '人文和社科楼（南校区）', '新兴科学楼（南校区）', '商学院（南校区）']
const {Option} = Select

export default class RentalApplication extends Component {
    state = {
        searchAddress: store_list[0],
        userId: null,
        applications: [],
        total: 0,
        applicationId: [],
        showStatus: 0,
        verifyCode: null,
        focusInput: false,
        mode: 'receive'
    }

    getApplications = async (currentPage) => {
        this.pageNum = currentPage
        const {searchAddress, verifyCode, mode, applicationId} = this.state;
        console.log(applicationId)
        if (verifyCode && isNaN(verifyCode)) {
            // console.log(userId, typeof userId)
            message.warn('verifyCode must be an integer')
            return
        }

        let result;
        if (mode === 'receive') {
            if ((searchAddress !== '全部' && searchAddress !== 'All') || verifyCode) {
                result = await reqSearchRentalApplications({currentPage, searchAddress, verifyCode})
            } else {
                result = await reqRentalApplications(currentPage)
            }
        } else {
            if ((searchAddress !== '全部' && searchAddress !== 'All') || verifyCode) {
                result = await reqSearchReturnRentalApplications({currentPage, searchAddress, verifyCode})
            } else {
                result = await reqReturnRentalApplications(currentPage)
            }
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
                dataIndex: 'rentalName',
            },
            {
                title: 'address',
                dataIndex: 'address',
            },
            {
                title: 'quantity',
                dataIndex: 'number',
            },
            {
                title: 'duration(day)',
                dataIndex: 'rentalDay'
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
        const {verifyCode, applicationId, mode} = this.state
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
        let result;
        if (mode === 'receive') {
            result = await reqRentalVerify({verifyCode, applicationId})
        } else {
            result = await reqReturnRentalVerify({verifyCode, applicationId})

        }
        if (result.code === 200) {
            message.success('verify successfully')
            this.setState({verifyCode: null, applicationId: []})
            this.getApplications(1)

        } else {
            message.error('fail to verify！')
        }
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
                <Radio.Group defaultValue="receive" style={{marginLeft: 50}} buttonStyle="solid"
                             onChange={(e) => this.setState({
                                     mode: e.target.value,
                                 }, () =>
                                     this.getApplications(1)
                             )}>
                      <Radio.Button value="receive">receive</Radio.Button>
                      <Radio.Button value="return">return</Radio.Button>
                </Radio.Group>
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

