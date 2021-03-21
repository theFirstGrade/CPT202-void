import * as React from "react";
import {Layout} from 'antd'
import LeftNav from "../../components/left-nav";
import Header from "../../components/header";
import {Redirect, Route, Switch} from "react-router-dom";
import Home from '../home/home'
import {WechatOutlined} from '@ant-design/icons'

const {Footer, Sider, Content} = Layout;

export default class Admin extends React.Component {

    render() {
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