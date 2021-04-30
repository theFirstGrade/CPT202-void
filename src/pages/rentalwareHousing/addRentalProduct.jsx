import React, {Component} from "react";
import {Button, Checkbox, Form, Input, Select} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import storageUtils from "../../utils/storageUtils";
import {Option} from "antd/es/mentions";

const category_list = ['全部', '书写用品', '桌面用品', '文件管理用品', '纸质用品', '财务用品', '辅助用品']

export default class AddRentalProduct extends Component {

    state = {
        searchCate: category_list[0],
    }

    render() {

        const {searchCate} = this.state

        const category = category_list.map((item => {
            {
                return (
                    <Option key={item} value={item}>{item}</Option>
                )
            }
        }))

        const NormalLoginForm = () => {
            const onFinish = async (values) => {
                console.log('Received values of form: ', values)
                this.props.login(values.username, values.password)
                if (values.remember) {
                    storageUtils.saveUserName(values.username)
                } else {
                    storageUtils.removeUserName()
                }
                // const result = await reqLogin(values.username, values.password, "POST")
                // if (result.code === 200) {
                //     message.success('登录成功')
                //     this.props.history.replace('/')
                //
                // } else {
                //     message.error('用户名或密码错误')
                // }
                // console.log(result)
            };

            return (
                <Form
                    name="normal_login"
                    className="login-form"
                    // initialValues={{
                    //     remember: true,
                    //     username: username
                    // }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: '请输入物品名称',
                            },
                        ]}
                    >
                        <Input placeholder="物品名称"/>
                    </Form.Item>
                    <Form.Item>
                        <Select
                            value={searchCate}
                            // style={{width: 170, margin: '0 15px'}}
                            onChange={value => this.setState({searchCate: value})}
                        >
                            {category}
                        </Select>

                    </Form.Item>
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: '请输入物品名称',
                            },
                        ]}
                    >
                        <Input placeholder="单位"/>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </Form.Item>
                    <Form.Item className='login-form-remember'>
                        <Form.Item name="remember" valuePropName="checked" className='login-form-remember-switch'>
                            {/*<Switch/>*/}
                            {/*<span style={{fontSize: '.75rem', fontWeight: '400'}}>&nbsp;&nbsp;&nbsp;记住用户名</span>*/}
                            <Checkbox>记住用户名</Checkbox>
                            {/*<Switch checkedChildren="记住密码" unCheckedChildren="" defaultChecked />*/}
                        </Form.Item>
                    </Form.Item>
                </Form>
            );
        };


        return (
            <div>
                {NormalLoginForm()}
            </div>
        );
    }

}