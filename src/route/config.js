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
const MaterialBrowsing = lazy(() => import('../pages/contentManagement/materialBrowsing/index'))
const userInfo = JSON.parse(localStorage.getItem('userInfo'))
console.log(userInfo.role)
const routes = [
    {
        path: '/app/main',
        title: '首页',
        icon: <HomeOutlined />,
        component: Main,
        show: true
    },
    {
        title: '公司管理',
        path: '/app/companyManagement',
        icon: <TeamOutlined />,
        component: CompanyManagement,
        show: userInfo.role === 0 ? false : true
    },
    {
        title: '人员管理',
        path: '/app/personManagement',
        icon: <UserOutlined />,
        component: FieldManagement,
        show: true
    },
    {
        title: '内容管理',
        key: 'content-management',
        icon: <BarChartOutlined />,
        show: true,
        children: [
            {
                title: '活动一览',
                path: '/app/contentManagement/contentBrowsing',
                component: ContentBrowsing,
                show: true
            },
            {
                title: '素材一览',
                path: '/app/contentManagement/materialBrowsing',
                component: MaterialBrowsing,
                show: true
            },
            {
                title: '标签管理',
                path: '/app/contentManagement/tagManagement',
                component: TagManagement,
                show: userInfo.role > 1 ? false : true
            }
        ]
    },
    // {
    //     title: '数据查询',
    //     key: 'data-search',
    //     icon: <AlignLeftOutlined />,
    //     children: [
    //         {
    //             title: '统计数据',
    //             path: '/app/dataSearch/statisticalData',
    //             component: ''
    //         },
    //         {
    //             title: '数据明细',
    //             path: '/app/dataSearch/dataDetails',
    //             component: ''
    //         }
    //     ]
    // },
]

export default routes