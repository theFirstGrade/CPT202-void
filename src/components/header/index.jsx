import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
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

const {Search} = Input;

/*
左侧导航的组件
 */
class Header extends Component {

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
                    ZHENHAO CHEN
                </Menu.Item>
                <Menu.Divider style={{backgroundColor: '#BEBEBE'}}/>
                <Menu.Item key="2" style={{
                    height: '40px',
                    margin: '5px',
                    borderRadius: '5px',
                    lineHeight: '30px',
                }}>
                    <MessageOutlined/>
                    message
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
                <Menu.Item key="3" style={{
                    height: '45px',
                    lineHeight: '30px',
                    // display: 'flex',
                    // alignItems: 'center',
                    backgroundColor: '#f01e1e',
                    margin: '0 5px',
                    borderRadius: '5px'
                }}>
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
                    <Divider type="vertical" style={{backgroundColor:'#E0E0E0', height:'25px', margin:'auto 10px',marginRight:'13px',width:'2px'}}/>
                    <Dropdown overlay={menu} placement="bottomCenter" className='header-right-user'>
                        <UserOutlined/>
                    </Dropdown>
                </div>
            </div>
        );
    }


}

export default withRouter(Header)