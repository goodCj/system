import { lazy } from "react";

const Text = lazy(()=> import('../pages/text'))

const routes = [
    {
        path: '/app/test',
        title: '首页',
        icon: '',
        component: Text
    },
    {
        title: '人员管理',
        icon: '',
        children: [
            {
                title: '外勤管理',
                path: '',
                component: ''
            },
            {
                title: '内勤管理',
                path: '',
                component: ''
            }
        ]
    },
    {
        title: '内容管理',
        icon: '',
        children: [
            {
                title: '内容一览',
                path: '',
                component: ''
            },
            {
                title: '标签管理',
                path: '',
                component: ''
            }
        ]
    },
    {
        title: '数据查询',
        icon: '',
        children: [
            {
                title: '统计数据',
                path: '',
                component: ''
            },
            {
                title: '标签管理',
                path: '',
                component: ''
            }
        ]
    },
]

export default routes