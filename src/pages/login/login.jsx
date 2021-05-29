import * as React from "react";
import './login.less'
import {Form, Input, Button, Checkbox, Col, Select, Modal, Row, message} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import logo from './images/login-title.png'
import {reqAddUser, reqLogin} from '../../api/index'
import {connect} from "react-redux";
import {login} from "../../redux/actions";
import {Redirect} from "react-router-dom";
import storageUtils from "../../utils/storageUtils";
import MyOrder from "../makeOrder/myOrder";
import {reqRegisterVerifyCode} from '../../api/index'

const buildingList = ['foundation building', 'centre building', 'public building']
const {Option} = Select

class Login extends React.Component {

    state = {
        show: 0,
        email: ''
    }

    getVerifyCode = async () => {
        const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        const {email} = this.state
        if (!reg.test(email)) {
            return
        }
        console.log(email)
        let result = await reqRegisterVerifyCode(email)
        if (result.code === 200) {
            message.success('please check the verify code in your mail box')
        } else {
            message.warn('something wrong with the system')
        }
    }


    hideRegisterForm = () => {
        this.setState({
            show: 0
        })
    }

    render() {

        const options = buildingList.map((item => {
            return (
                <Option key={item} value={item}>{item}</Option>
            )
        }))

        const layout = {
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 12,
            },
        };
        const validateMessages = {
            required: '${label} is required!',
            types: {
                email: '${label} is not a valid email!',
                number: '${label} is not a valid number!',
            },
            number: {
                range: '${label} must be between ${min} and ${max}',
            },
        };
        /* eslint-enable no-template-curly-in-string */

        const Demo = () => {
            const onFinish = async (values) => {
                const {username, password, email, building, room, verifyCode} = values
                let result = await reqAddUser(username, password, email, building, room, verifyCode)
                if (result.code === 200) {
                    message.success('register successfully')
                } else {
                    message.error('sorry,there\'s something wrong')
                }
                this.setState({show: 0})
            };

            return (
                <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}
                      style={{width: '100%'}} initialValues={{building: buildingList[0]}}>
                    <Form.Item
                        name='username'
                        label="username"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name='password'
                        label="password"
                        rules={[
                            {required: true, message: 'password is required!'},
                            // {pattern: /^[a-zA-Z0-9_]+$/, message: '密码必须是英文、数字或下划线组成'}
                            {pattern: /^[a-zA-Z0-9_]+$/, message: 'the passcode must be English words, integer or "_"'}
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name='passwordCheck'
                        label="password check"
                        dependencies={['password']}
                        rules={[
                            {required: true, message: 'password is required!'},
                            // {pattern: /^[a-zA-Z0-9_]+$/, message: '密码必须是英文、数字或下划线组成'}
                            {pattern: /^[a-zA-Z0-9_]+$/, message: 'the passcode must be English words, integer or "_"'},
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name='email'
                        label="email"
                        rules={[
                            {
                                type: 'email',
                                required: true,

                            },
                        ]}
                    >
                        <Input onChange={(e) => this.setState({email: e.target.value})}/>
                    </Form.Item>
                    <Form.Item
                        name='building'
                        label="building"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select>
                            {options}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name='room'
                        label="room"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item label="Captcha" extra="We must make sure that your are a human.">
                        <Row gutter={8}>
                            <Col span={12}>
                                <Form.Item
                                    name="verifyCode"
                                    noStyle
                                    rules={[{required: true, message: 'Please input the captcha you got!'}]}

                                >
                                    <Input/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Button
                                    onClick={this.getVerifyCode}>Get
                                    captcha</Button>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}}>

                        <Button type="primary" htmlType="submit">
                            submit
                        </Button>
                    </Form.Item>
                </Form>
            );
        };
        const username = storageUtils.getUserName()
        const user = this.props.user
        if (user && user.id) {
            return <Redirect to='/home'/>
        }
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
                    initialValues={{
                        remember: true,
                        username: 'admin',
                        password: 'admin'
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                // type: 'email',
                                required: true,
                                message: 'please enter your email',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="邮箱"/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {required: true, message: 'password please'},
                            // {pattern: /^[a-zA-Z0-9_]+$/, message: '密码必须是英文、数字或下划线组成'}
                            {pattern: /^[a-zA-Z0-9_]+$/, message: 'the passcode must be English words, integer or "_"'}
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="password"
                        />

                    </Form.Item>


                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            login
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" className="register-form-button"
                                onClick={() => this.setState({show: 1})}>
                            Register
                        </Button>
                    </Form.Item>
                    <Form.Item className='login-form-remember'>
                        <Form.Item name="remember" valuePropName="checked" className='login-form-remember-switch'>
                            {/*<Switch/>*/}
                            {/*<span style={{fontSize: '.75rem', fontWeight: '400'}}>&nbsp;&nbsp;&nbsp;记住用户名</span>*/}
                            <Checkbox>remember username</Checkbox>
                            {/*<Switch checkedChildren="记住密码" unCheckedChildren="" defaultChecked />*/}
                        </Form.Item>
                    </Form.Item>
                </Form>
            );
        };

        const RegisterForm = () => {
            const onFinish = async (values) => {

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
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label='username'
                        name="username"
                        rules={[
                            {
                                // type: 'email',
                                required: true,
                                message: 'please enter your email',
                            },
                        ]}
                    >
                        <Input placeholder="nick name"/>
                    </Form.Item>
                    <Form.Item
                        label='password'
                        name="password"
                        rules={[
                            {required: true, message: 'password please'},
                            // {pattern: /^[a-zA-Z0-9_]+$/, message: '密码必须是英文、数字或下划线组成'}
                            {pattern: /^[a-zA-Z0-9_]+$/, message: 'the passcode must be English words, integer or "_"'}
                        ]}
                    >
                        <Input
                            type="password"
                            placeholder="password"
                        />

                    </Form.Item>
                    <Form.Item
                        label='email'
                        name="email"
                        rules={[
                            {required: true, message: 'password please'},
                            // {pattern: /^[a-zA-Z0-9_]+$/, message: '密码必须是英文、数字或下划线组成'}
                            {pattern: /^[a-zA-Z0-9_]+$/, message: 'the passcode must be English words, integer or "_"'}
                        ]}
                    >
                        <Input
                            type="email"
                            placeholder="email"
                        />

                    </Form.Item>


                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            login
                        </Button>
                    </Form.Item>
                </Form>
            );
        };

        return (
            <div className='login'>
                <header className='login-header'>
                    <img src={logo} alt=""/>
                    <h1>XJTLU SUPPLIES MANAGEMENT SYSTEM</h1>
                </header>
                <section className='login-content'>
                    <h2>USER LOGIN</h2>
                    {NormalLoginForm()}
                </section>
                <footer>
                </footer>
                <Modal
                    title="Register"
                    visible={this.state.show === 1}
                    onOk={this.sendOrder}
                    onCancel={this.hideRegisterForm}
                    okText='submit'
                    cancelText='back'
                >
                    <div style={{display: 'flex'}}>
                        {Demo()}
                    </div>
                </Modal>

            </div>
        );
    }
}

export default connect(
    state => ({user: state.user}),
    {login}
)(Login)