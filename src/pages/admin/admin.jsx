import {Layout} from 'antd'
import LeftNav from "../../components/left-nav";
import Header from "../../components/header";
import {Redirect, Route, Switch} from "react-router-dom";
import Home from '../home/home'
import Application from "../application/application";
import Inquiry from "../inquiry/inquiry";
import Manage from "../manage/manage";
import MakeOrder from "../makeOrder/makeOrder";
import {WechatOutlined} from '@ant-design/icons'
import React, {Component} from 'react'
import {connect} from "react-redux";


const {Footer, Sider, Content} = Layout;

class Admin extends Component {

    render() {
        const user = this.props.user
        // 如果内存没有存储user ==> 当前没有登陆
        if (!user || !user.id) {
            // 自动跳转到登陆(在render()中)
            return <Redirect to='/login'/>
        }
        return (
            <Layout style={{minHeight: '100%'}}>
                <Sider width='300px'
                       style={{
                           backgroundColor: '#0D8FBF',
                           overflow: 'auto',
                           height: '100vh',
                           position: 'fixed',
                           left: 0,
                       }}>
                    <LeftNav/>
                </Sider>
                <Layout style={{marginLeft: 300}}>
                    <Header/>
                    <Content style={{margin: 20, backgroundColor: '#fff', marginTop: '85px'}}>
                        {/*<Content style={{*/}
                        {/*    margin: '24px 16px',*/}
                        {/*    padding: 24,*/}
                        {/*    minHeight: 280,*/}
                        {/*}}>*/}
                        <Switch>
                            <Redirect from='/' exact to='/home'/>
                            <Route path='/home' component={Home}/>
                            <Route path='/inquiry' component={Inquiry}/>
                            <Route path='/manage' component={Manage}/>
                            <Route path='/makeOrder' component={MakeOrder}/>
                            <Route path='/application' component={Application}/>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign: 'center', justifyContent: 'center'}}>
                        <span style={{color: '#9D9D9D'}}>本应用所有权归西交利物浦<span
                            style={{color: 'black'}}>&nbsp;void&nbsp;</span>所有</span>
                        <br/>
                        <span style={{color: '#9D9D9D'}}>联系我们:&nbsp;&nbsp;&nbsp;</span><WechatOutlined/>
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default connect(
    state => ({user: state.user}),
    {}
)(Admin)