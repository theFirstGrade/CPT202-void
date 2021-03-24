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
        title: 'Make Order',
        key: '/makeOrder',
        icon: <RiseOutlined/>,
    },
    {
        title: 'Inventory Inquiry',
        key: '/inquiry',
        icon: <SearchOutlined/>
    },
    {
        title: 'Application for supplies',
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