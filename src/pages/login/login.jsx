import * as React from "react";
import './login.less'
import {Form, Input, Button, Checkbox, Switch, message} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import logo from './images/login-title.png'
import {reqLogin} from '../../api/index'

export default class Login extends React.Component {

    render() {

        const NormalLoginForm = () => {
            const onFinish = async (values) => {
                console.log('Received values of form: ', values);
                const result = await reqLogin(values.username, values.password, "POST")
                if (result.code === 200) {
                    message.success('登录成功')
                    this.props.history.replace('/')

                } else {
                    message.error('用户名或密码错误')
                }
                console.log(result)
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
                                // type: 'email',
                                required: true,
                                message: '请输入邮箱',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="邮箱"/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {required: true, message: '请输入密码'},
                            {pattern: /^[a-zA-Z0-9_]+$/, message: '密码必须是英文、数字或下划线组成'}
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="密码"
                        />

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
            <div className='login'>
                <header className='login-header'>
                    <img src={logo} alt=""/>
                    <h1>西浦教资管理系统</h1>
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