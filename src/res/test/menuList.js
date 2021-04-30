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
        title: 'Application',
        key: '/makeOrder',
        icon: <RiseOutlined/>,
    },
    {
        title: 'Rent Application',
        key: '/makeRentalOrder',
        icon: <SearchOutlined/>
    },
    {
        title: 'Verify Application',
        key: '/application',
        icon: <PlusCircleOutlined/>
    },
    {
        title: 'Verify Rental Application',
        key: '/rentalApplication',
        icon: <PlusCircleOutlined/>
    },
    {
        title: 'Inventory Management',
        key: '/manage',
        icon: <SettingOutlined/>,
    },
    {
        title: 'Rental Inventory Management',
        key: '/rentalManage',
        icon: <SettingOutlined/>,
    },


]

export default menuList