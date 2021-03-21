import {Component} from "react";
import {Carousel, Card} from 'antd'
import menuList from "../../res/test/menuList";
import './home.less'

export default class Header extends Component {


    render() {
        const contentStyle = {
            margin: '10px 35px',
            height: '200px',
            color: '#fff',
            lineHeight: '160px',
            textAlign: 'center',
            background: '#BEBEBE',
            borderRadius: '5px'
        };

        const carousel = (
            <div>
                <Carousel autoplay>
                    <div>
                        <h3 style={contentStyle}>使用手册</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>如何快速上手西浦教资管理系统</h3>
                    </div>
                </Carousel>
            </div>
        )


        const cards = (menuList) => {
            return menuList.map(item => {
                if (item.title !== 'Home') {
                    return (
                        <Card title={item.title} bordered={true} className='home-card'>
                        </Card>
                    )
                }
            })
        }

        return (
            <div className='home'>
                {carousel}
                <div className='cards'>
                    {cards(menuList)}
                </div>
            </div>
        );
    }

}


