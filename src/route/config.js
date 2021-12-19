import { lazy } from "react";

const Text = lazy(()=> import('../pages/text'))

const routes = [
    {
        path: '/app/test',
        title: '首页',
        component: Text
    }
]

export default routes