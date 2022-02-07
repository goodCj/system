import './index.scss'
import App from "~route"
import routes from '~route/config';
import { Layout, Menu, Button, Popover } from 'antd';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { companyList } from "~request/api/company";
import React, { useEffect } from 'react';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PoweroffOutlined
} from '@ant-design/icons';
import AddNewP from './addCompany';
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
    const history = useHistory()
    const localCompany = localStorage.getItem('currentCompany')
    const [currentCompany, setCurrentCompany] = useState()
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const [companyFlag, setCompanyFlag] = useState(false)
    const [list, setList] = useState()
    const [currentPage, setCurrentPage] = useState(['/app/main'])
    useEffect(() => {
        const pageKey = sessionStorage.getItem('currentMenu')
        if (pageKey) {
            setCurrentPage([pageKey])
        }
        if(userInfo?.role === 0) getCompanylist()
    }, [])

    useEffect(() => {
        if (currentCompany) {
            localStorage.setItem('currentCompany', JSON.stringify(currentCompany))
        }
    }, [currentCompany])
    const [addNewFlag, setAddNewFlag] = useState(false)

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

    /**
     * @method logout
     * @description 退出登录
     */
    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
        localStorage.removeItem('currentCompany')
        sessionStorage.removeItem('currentMenu')
        history.push('/login')
    }

    /**
     * @method getCompanylist
     * @description 获取公司列表
     */
    const getCompanylist = async () => {
        let res = await companyList({
            count: 100,
            offset: 0
        })
        if (res.code === 0) {
            if (res.data.list.length > 0) {
                if (!localCompany) {
                    setCurrentCompany(res.data.list[0])
                } else {
                    setCurrentCompany(JSON.parse(localCompany))
                }
            } else {
                localStorage.removeItem('currentCompany')
                setCurrentCompany(null)
                setAddNewFlag(true)
            }
        }
    }

    useEffect(() => {
        (async () => {
            if (companyFlag) {
                let { data: { list } } = await companyList({
                    count: 100,
                    offset: 0
                })
                setList(list)
            } else {
                setList([])
            }
        })()
    }, [companyFlag])

    const CompanyContent = () => {
        const changeCompany = (item) => {
            setCurrentCompany(item)
            window.location.reload()
        }
        return (
            <div className='allCompany'>
                {
                    list.map(item => {
                        return <div className={currentCompany?.id === item.id ? 'companyPart activeCompany' : 'companyPart'} key={item.id} onClick={() => changeCompany(item)}>{item.companyName}</div>
                    })
                }
            </div>
        )
    }
    // 用户操作
    const userOptions = (
        <div className='userOptions'>
            <div onClick={logout}><PoweroffOutlined className="optionsIcon" />退出登录</div>
        </div>
    )

    const selectMenu = (menu) => {
        sessionStorage.setItem('currentMenu', menu.key)
        setCurrentPage([menu.key])
    }

    return (
        <div className="content-container">
            {/* 添加新公司 */}
            {
                addNewFlag && <AddNewP { ...{addNewFlag, setAddNewFlag } }></AddNewP>
            }
            <Layout className='layout-container'>
                <Sider width='260' trigger={null} className='layout-sider' collapsed={collapsed} collapsible>
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
                            selectedKeys={currentPage}
                            onSelect={selectMenu}
                        >
                            {
                                routes.map((item, index) => {
                                    if (item.show) {
                                        if (item.children?.length > 0) {
                                            return (
                                                <SubMenu
                                                    key={item.key ? item.key : item.path}
                                                    icon={item.icon}
                                                    title={item.title}>
                                                    {
                                                        item.children.map((subItem, subIndex) => {
                                                            if (!subItem.show) return
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
                                    }
                                })
                            }
                        </Menu>
                    </div>
                </Sider>
                <Layout>
                    <Header className='layout-header'>
                        <div className='leftContent'>
                            <div className='toggleBtn' onClick={toggleCollapsed}>
                                {
                                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                                }
                            </div>
                            {
                                userInfo?.role === 0 &&
                                <div className='companyList'>
                                    公司：{
                                        currentCompany ?
                                            <Popover visible={list?.length > 0 && companyFlag} placement="bottom" content={companyFlag && <CompanyContent />} trigger="hover" onVisibleChange={(v) => setCompanyFlag(v)}>
                                                <span className='companyName'>{currentCompany?.companyName}</span>
                                            </Popover>
                                            : <span className='noCompanyData'>当前无数据，请创建新公司后刷新页面</span>
                                    }
                                </div>
                            }
                        </div>
                        <div className='userInfoBox'>
                            <div className='logout'>欢迎您,<Popover placement="bottomRight" content={userOptions}><span>{userInfo?.name}</span></Popover></div>
                        </div>
                    </Header>
                    <Content className='layout-content' id='layout-content'>
                        <App />
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}

export default Main