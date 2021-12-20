import './index.scss'
import App from "~route"
import routes from '~route/config';
import { Layout, Menu, Button } from 'antd';
import { useState } from 'react/cjs/react.development';
import { Link, useHistory } from 'react-router-dom';
import React, { useEffect } from 'react';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
const { Header, Sider, Content } = Layout;

const { SubMenu } = Menu;

const Main = () => {
    // 获取带有子路由的父级的key值
    const rootSubmenuKeys = routes.map(item => {
        return item.children?.length > 0 ? item.key : ''
    })
    // 选中的父级路由的key值
    const [openKeys, setOpenKeys] = useState([]);
    // 是否闭合导航
    const [collapsed, setCollapsed] = useState(false)

    /**
     * @method onOpenChange
     * @param {string} keys 
     * @description 点击开启或关闭父级路由的方法
     */
    const onOpenChange = keys => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    /**
     * @method toggleCollapsed
     * @description 设置是否闭合路由导航
     */
    const toggleCollapsed = () => {
        setCollapsed(!collapsed)
    };

    return (
        <div className="content-container">
            <Layout className='layout-container'>
                <Sider width='260' trigger={null} className='layout-sider' collapsed={ collapsed } collapsible>
                    <div className="logo-title">
                        {
                            !collapsed ? '齿科智能营销系统' : <MenuUnfoldOutlined />
                        }
                    </div>
                    <div className="menu">
                        <Menu
                            mode="inline"
                            theme="dark"
                            openKeys={openKeys}
                            onOpenChange={onOpenChange}
                            defaultSelectedKeys={['/app/main']}
                        >
                            {
                                routes.map((item, index) => {
                                    if (item.children?.length > 0) {
                                        return (
                                            <SubMenu
                                                key={item.key ? item.key : item.path}
                                                icon={item.icon}
                                                title={item.title}>
                                                {
                                                    item.children.map((subItem, subIndex) => {
                                                        return (
                                                            <Menu.Item
                                                                key={subItem.key ? subItem.key : subItem.path}
                                                            >
                                                                <Link to={subItem.path}>
                                                                    {/* {item.icon && <Icon type={item.icon} />} */}
                                                                    <span>{subItem.title}</span>
                                                                </Link>
                                                            </Menu.Item>
                                                        )
                                                    })
                                                }
                                            </SubMenu>

                                        )
                                    } else {
                                        return (
                                            <Menu.Item
                                                key={item.key ? item.key : item.path}
                                                icon={item.icon}
                                            >
                                                <Link to={item.path}>
                                                    {/* {item.icon && <Icon type={item.icon} />} */}
                                                    <span>{item.title}</span>
                                                </Link>
                                            </Menu.Item>
                                        )
                                    }
                                })
                            }
                        </Menu>
                    </div>
                </Sider>
                <Layout>
                    <Header className='layout-header'>
                        <span className='toggleBtn' onClick={toggleCollapsed}>
                            {
                                collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                            }
                        </span>
                    </Header>
                    <Content className='layout-content'>
                        <App />
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}

export default Main