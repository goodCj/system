import { lazy } from "react";
import {
    HomeOutlined,
    UserOutlined,
    BarChartOutlined,
    AlignLeftOutlined
} from '@ant-design/icons';

const Main = lazy(() => import('../pages/main'))
const FieldManagement = lazy(() => import('../pages/personManagement/field'))
const OfficeManagement = lazy(() => import('../pages/personManagement/office'))

const routes = [
    {
        path: '/app/main',
        title: '首页',
        icon: <HomeOutlined />,
        component: Main
    },
    {
        title: '人员管理',
        key: 'person-management',
        icon: <UserOutlined />,
        children: [
            {
                title: '外勤管理',
                path: '/app/personManagement/fieldManagement',
                component: FieldManagement
            },
            {
                title: '内勤管理',
                path: '/app/personManagement/officeManagement',
                component: OfficeManagement
            }
        ]
    },
    {
        title: '内容管理',
        key: 'content-management',
        icon: <BarChartOutlined />,
        children: [
            {
                title: '内容一览',
                path: '/app/contentManagement/contentBrowsing',
                component: ''
            },
            {
                title: '标签管理',
                path: '/app/contentManagement/tagManagement',
                component: ''
            }
        ]
    },
    {
        title: '数据查询',
        key: 'data-search',
        icon: <AlignLeftOutlined />,
        children: [
            {
                title: '统计数据',
                path: '/app/dataSearch/statisticalData',
                component: ''
            },
            {
                title: '数据明细',
                path: '/app/dataSearch/dataDetails',
                component: ''
            }
        ]
    },
]

export default routes