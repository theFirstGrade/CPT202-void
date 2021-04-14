import {
    SettingOutlined,
    HomeOutlined,
    SearchOutlined,
    PlusCircleOutlined,
    RiseOutlined
} from '@ant-design/icons';

const menuList = [
    {
        title: 'Home', // 菜单标题名称
        key: '/home', // 对应的path
        icon: <HomeOutlined/>, // 图标名称
        isPublic: true, // 公开的
    },
    {
        title: 'Make Application',
        key: '/makeOrder',
        icon: <RiseOutlined/>,
    },
    {
        title: 'Rent',
        key: '/inquiry',
        icon: <SearchOutlined/>
    },
    {
        title: 'handle Application',
        key: '/application',
        icon: <PlusCircleOutlined/>
    },
    {
        title: 'Stock Management',
        key: '/manage',
        icon: <SettingOutlined/>,
    },


]

export default menuList