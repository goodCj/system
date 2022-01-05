import { lazy } from "react";
import {
    HomeOutlined,
    UserOutlined,
    BarChartOutlined,
    AlignLeftOutlined,
    TeamOutlined
} from '@ant-design/icons';

const Main = lazy(() => import('../pages/main'))
const CompanyManagement = lazy(() => import('../pages/companyManagement'))
const FieldManagement = lazy(() => import('../pages/personManagement/field'))
const TagManagement = lazy(() => import('../pages/contentManagement/tagManagement/index'))
const ContentBrowsing = lazy(() => import('../pages/contentManagement/contentBrowsing/index'))

const routes = [
    {
        path: '/app/main',
        title: '首页',
        icon: <HomeOutlined />,
        component: Main
    },
    {
        title: '公司管理',
        path: '/app/companyManagement',
        icon: <TeamOutlined />,
        component: CompanyManagement
    },
    {
        title: '人员管理',
        path: '/app/personManagement',
        icon: <UserOutlined />,
        component: FieldManagement
    },
    {
        title: '内容管理',
        key: 'content-management',
        icon: <BarChartOutlined />,
        children: [
            {
                title: '内容一览',
                path: '/app/contentManagement/contentBrowsing',
                component: ContentBrowsing
            },
            {
                title: '标签管理',
                path: '/app/contentManagement/tagManagement',
                component: TagManagement
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