import * as React from "react";
import './login.less'
import {Form, Input, Button, Checkbox, Switch, message} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import logo from './images/login-title.png'
export default class Login extends React.Component {


    render() {

        const NormalLoginForm = () => {
            const onFinish = (values) => {
                console.log('Received values of form: ', values);
                message.success('登录成功')
            };

            return (
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>


                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" className='login-form-remember'>
                            <Switch/>
                            <span style={{fontSize: '.75rem', fontWeight: '400'}}>&nbsp;&nbsp;&nbsp;记住用户名</span>
                            {/*<Switch checkedChildren="记住密码" unCheckedChildren="" defaultChecked />*/}
                        </Form.Item>
                    </Form.Item>
                </Form>
            );
        };


        return (
            <div className='login'>
                <header className='login-header'>
                    <img src={logo} alt=""/>
                </header>
                <section className='login-content'>
                    <h2>用户登录</h2>
                    {NormalLoginForm()}
                </section>
                <footer>
                </footer>
            </div>
        );
    }
}