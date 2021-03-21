import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {Menu, Divider} from 'antd';
import './index.less'
import logo from '../../res/images/login-title.png'
import {AppstoreOutlined, MailOutlined, SettingOutlined, PieChartOutlined} from '@ant-design/icons';
import menuList from "../../res/test/menuList";

const {SubMenu} = Menu;

/*
左侧导航的组件
 */
export default class LeftNav extends Component {

    componentWillMount() {
        this.menuNodes = this.getMenuNodes(menuList)
    }

    getMenuNodes = (menuList) => {
        return menuList.map(item => {
            if (!item.children) {
                return (
                    <Menu.Item icon={item.icon} key={item.key}
                               className={item.title === 'Home' ? 'left-nav-menu-home' : ''}
                    >
                        <Link to={item.key}>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                return (
                    <SubMenu icon={item.icon}
                             key={item.key}
                             title={
                                 <span>
              <span>{item.title}</span>
            </span>
                             }
                    >
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            }

        })
    }

    render() {
        return (
            <div className='left-nav'>
                <img src={logo} alt="logo" className='left-nav-logo'/>
                <Menu
                    className='left-nav-menu'
                    mode="inline"
                    theme="light"
                    // defaultSelectedKeys='/Home'
                    // defaultOpenKeys={[openKey]}
                >

                    {
                        this.menuNodes
                    }

                </Menu>
            </div>
        );
    }
}


