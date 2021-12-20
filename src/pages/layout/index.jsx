import './index.scss'
import App from "~route"
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;


const Main = () => {
    return (
        <div className="content-container main">
            {/* <div className="pageBox">
                <App />
            </div> */}
            <Layout className='layout-container'>
                <Sider className='layout-sider'>
                    <div className="logo-title">
                        齿科智能营销系统
                    </div>
                    
                    
                    <div className="menu">
                    </div>
                </Sider>
                <Layout>
                    <Header className='layout-herder'>Header</Header>
                    <Content>Content</Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        </div>
    )
}

export default Main