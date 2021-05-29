import React, {Component} from 'react'
import {Redirect, withRouter} from 'react-router-dom'
import {Input, Space, Modal, Tooltip, Menu, Dropdown, Button, message, Divider} from 'antd';
import './index.less'
import LinkButton from "../link-button";
import {
    DownOutlined,
    UserOutlined,
    LogoutOutlined,
    MessageOutlined,
    ProfileOutlined,
    BellOutlined
} from '@ant-design/icons';
import {connect} from "react-redux";
import {logout} from "../../redux/actions";

const {Search} = Input;
const {confirm} = Modal

/*
左侧导航的组件
 */
class Header extends Component {

    logout = () => {
        Modal.confirm({
            content: 'are you sure to logout?',
            onOk: () => {
                console.log('OK', this)
                // 跳转到login
                // this.props.history.replace('/login')
                this.props.logout()
            },
            onCancel() {
                console.log('Cancel');
            },
        })
    }

    jumpPersonalOrder = () => {
        message.success(123)
        this.props.history.push('/personalOrder')
    }

    handleSearch = (value) => {
        window.location.href = 'https://www.baidu.com/s?wd=' + value
    }

    render() {
        const menu = (
            <Menu style={{width: '200px', marginRight: '20px'}} theme='dark'>
                <Menu.Item disabled style={{
                    height: '50px',
                    justifyContent: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    fontWeight: '800',
                }} key="1">
                    {this.props.user.username}
                </Menu.Item>
                <Menu.Divider style={{backgroundColor: '#BEBEBE'}}/>
                <Menu.Item key="2" style={{
                    height: '40px',
                    margin: '5px',
                    borderRadius: '5px',
                    lineHeight: '30px',
                }}
                           onClick={this.jumpPersonalOrder}
                >
                    <MessageOutlined/>
                    personal orders
                </Menu.Item>
                <Menu.Item key="3" style={{
                    height: '40px',
                    margin: '5px',
                    borderRadius: '5px',
                    lineHeight: '30px',

                }}>
                    <ProfileOutlined/>
                    profile
                </Menu.Item>
                <Menu.Divider style={{backgroundColor: '#BEBEBE'}}/>
                <Menu.Item key="4" style={{
                    height: '45px',
                    lineHeight: '30px',
                    // display: 'flex',
                    // alignItems: 'center',
                    backgroundColor: '#f01e1e',
                    margin: '0 5px',
                    borderRadius: '5px'
                }} onClick={this.logout}>
                    <LogoutOutlined/>
                    Log out
                </Menu.Item>
            </Menu>
        );

        return (
            <div className='header'>
                <div className='header-left'>
                    <Search placeholder="input search text" allowClear onSearch={(value) => this.handleSearch(value)}
                            enterButton
                            className='header-search'/>
                </div>
                <div className='header-right'>
                    <LinkButton className='header-right-help' style={{marginRight: '20px'}}>Need help?</LinkButton>
                    <Dropdown overlay={menu} placement="bottomCenter" className='header-right-notification'>
                        <BellOutlined/>
                    </Dropdown>
                    <Divider type="vertical" style={{
                        backgroundColor: '#E0E0E0',
                        height: '25px',
                        margin: 'auto 10px',
                        marginRight: '13px',
                        width: '2px'
                    }}/>
                    <Dropdown overlay={menu} placement="bottomCenter" className='header-right-user'>
                        <UserOutlined/>
                    </Dropdown>
                </div>
            </div>
        );
    }


}

export default connect(
    state => ({user: state.user}),
    {logout}
)(withRouter(Header))
