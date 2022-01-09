import './index.scss'
import { useState, useEffect, useRef } from 'react';
import * as echarts  from 'echarts';
import { Menu, Tabs } from 'antd';

import { QuestionCircleOutlined, CaretUpOutlined } from '@ant-design/icons'
import { wxuser, active, activeDetails, activeRank } from '~request/api/statistical';

const { TabPane } = Tabs;

const Test = () => {
    const [wxUser, setWxUser] = useState({
        allCount: 0,
        phoneCount: 0,
        addCount: 0,
        addPhoneCount: 0
    })
    const [activeData, setActiveData] = useState({
        activeCount: 0,
        pv: 0,
        shareCount: 0,
        uv: 0,
        addActiveCount: 0,
        addPv: 0,
        addUv: 0,
        addShareCount: 0,
    })
    const [renderData, setRenderData] = useState({
        viewData: {count: 0, list: []},
        shareData: {count: 0, list: []},
        stayMsgData: {count: 0, list: []}
    })
    const [tab, setTab] = useState({
        title: '浏览量',
        key: 'viewData'
    })
    const [rank, setRank] = useState('pvList')
    const [contentTime, setContentTime] = useState(1)
    const [rankTime, setRankTime] = useState(1)
    const [rankData, setRankData] = useState({
        pvList: [],
        uvList: [],
        shareList: [],
        stayMsgList: []
    })
    
    const chartListMap = [{
        title: '浏览量',
        key: 'viewData'
    }, {
        title: '分享量',
        key: 'shareData'
    }, {
        title: '留资量',
        key: 'stayMsgData'
    }]
    const timeListMap = [{
        txt: '今日',
        key: 1
    }, {
        txt: '近七天',
        key: 7
    }, {
        txt: '近30天',
        key: 30
    }, {
        txt: '累计',
        key: 0
    }]
    const rankListMap = [
        {
            title: '浏览量',
            key: 'pvList'
        },
        {
            title: '浏览人数',
            key: 'uvList'
        },
        {
            title: '分享量',
            key: 'shareList'
        },
        {
            title: '留资量',
            key: 'stayMsgList'
        }
    ]
    const chartRef = useRef()

    useEffect(() => {
        wxuser().then((res) => {
            setWxUser(res.data)
        })
        active().then((res) => {
            setActiveData(res.data)
        })
    }, [])

    useEffect(() => {
        activeDetails({day: contentTime}).then(res => {
            const {data} = res
            const renderData = {}
            renderData.viewData = data.activeView
            renderData.shareData = data.activeShare
            renderData.stayMsgData = data.activeStayMsg
            setRenderData(renderData)
        })
    }, [contentTime])

    useEffect(() => {
        activeRank({day: rankTime}).then(res => {
            const {data} = res
            const {pvList, uvList, shareList, stayMsgList} = data
            setRankData({
                pvList, 
                uvList, 
                shareList,
                stayMsgList
            })
        })
    }, [rankTime])
    useEffect(() => {
        const {key, title} = tab
        const data = renderData[key]
        data.list.forEach(item => {
            item.value = item.count
        });
        var myChart = echarts.init(chartRef.current);
        var option = {
            tooltip: {
              trigger: 'item'
            },
            graphic:{
                type:"text",
                left:"center",
                top:"center",
                style:{
                    text: data.count,
                    textAlign:"center",
                    fill: "#000",
                    fontSize: 20
                }
            },
            series: [
              {
                type: 'pie',
                center: ['50%', '50%'],
                radius: ['30%', '60%'],
                avoidLabelOverlap: false,
                label: {
                    color: '#000',
                    formatter: title + '\n{b}:{c}（{d}%）'
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: '20',
                    fontWeight: 'bold'
                  }
                },
                
                data: data.list
              }
            ]
        };
        option && myChart.setOption(option);
    }, [tab, renderData])
    function tabChange(data) {
        setTab(data)
    }

    
    

    return (
        <div className="main">
            <div className="top-title">
                <div className="left-title">
                    关键数据指标<span>【我负责的】</span>
                </div>
                <div className="right-tip">
                    内容各类综合数据、平均任务领取率、策略数据每小时更新一次，其余数据实时更新
                </div>
            </div>
            <div className="center-data">
                <div className="dataBox">
                    <div className="title">{wxUser.allCount}<QuestionCircleOutlined className="tipIcon" /></div>
                    <div className="centerNum">
                        <div className='num'>
                            {wxUser.phoneCount}
                            {
                                !!wxUser.addCount && <span className='trend green'>
                                    <CaretUpOutlined className="trendIcon" />
                                    {wxUser.addCount}
                                </span>
                            }
                        </div>
                        <div className="num-tip">用户总数</div>
                    </div>
                    <div className='info'>
                        <div className="left-text">
                            已验证手机号用户数
                        </div>
                        <div className="right-num">
                            {wxUser.phoneCount}
                            {
                                !!wxUser.addPhoneCount 
                                && <span className='trend green'>
                                        <CaretUpOutlined className="trendIcon" />
                                        {wxUser.addPhoneCount}
                                    </span>
                            }
                        </div>
                    </div>
                    {/* <div className='info'>
                        <div className="left-text">
                            关注公众号用户数
                        </div>
                        <div className="right-num">
                            19
                            <span className='trend green'>
                                <CaretUpOutlined className="trendIcon" />
                                33
                            </span>
                        </div>
                    </div>
                    <div className='info'>
                        <div className="left-text">
                            小程序用户数
                        </div>
                        <div className="right-num">
                            0
                            <span className='trend green'>
                                <CaretUpOutlined className="trendIcon" />
                                33
                            </span>
                        </div>
                    </div> */}
                </div>
                <div className="dataBox">
                    <div className="title">内容数据数据<QuestionCircleOutlined className="tipIcon" /></div>
                    <div className="centerNum">
                        <div className='num'>
                            {activeData.activeCount}
                            {
                                !!activeData.addActiveCount &&
                                <span className='trend green'>
                                    <CaretUpOutlined className="trendIcon" />
                                    {activeData.addActiveCount}
                                </span>
                            }
                        </div>
                        <div className="num-tip">内容总数</div>
                    </div>
                    <div className='info'>
                        <div className="left-text">
                            内容浏览量总和
                        </div>
                        <div className="right-num">
                            { activeData.pv }
                            {   !!activeData.addPv &&
                                <span className='trend green'>
                                    <CaretUpOutlined className="trendIcon" />
                                    {activeData.addPv}
                                </span>
                            }
                        </div>
                    </div>
                    <div className='info'>
                        <div className="left-text">
                            内容浏览人数总和
                        </div>
                        <div className="right-num">
                            { activeData.uv }
                            {
                                !!activeData.addUv && <span className='trend green'>
                                    <CaretUpOutlined className="trendIcon" />
                                    33
                                </span>
                            }
                            
                        </div>
                    </div>
                    <div className='info'>
                        <div className="left-text">
                            内容分享量总和
                        </div>
                        <div className="right-num">
                            {activeData.shareCount}
                            {
                                !!activeData.addShareCount && <span className='trend green'>
                                    <CaretUpOutlined className="trendIcon" />
                                    33
                                </span>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom-chart">
                <div className="chartBox leftChart">
                    <div className="top-info">
                        <div className='title'>
                            内容传播数据分布<QuestionCircleOutlined className="tipIcon" />
                        </div>
                        <div className="timeSelect">
                            {
                                timeListMap.map((time) => {
                                    return <span 
                                        className={contentTime === time.key ? 'active' : ''}
                                        onClick={() => {
                                            setContentTime(time.key)
                                        }}
                                        key={time.key}>
                                            {time.txt}
                                        </span>
                                })
                            }
                        </div>
                    </div>
                    <div className='chart-content'>
                        <Menu mode='horizontal' defaultSelectedKeys={[tab.key]}>
                            {
                                chartListMap.map((tab) => 
                                    (
                                        <Menu.Item onClick={() => {
                                            tabChange(tab)
                                        }} key={tab.key}>
                                            {tab.title}
                                        </Menu.Item>
                                    )
                                )
                            }
                        </Menu>
                        <div className='chart' ref={chartRef}>
                        </div>
                    </div>
                </div>
                <div className="chartBox rightChart">
                    <div className="top-info">
                        <div className="title">内容排行榜<QuestionCircleOutlined className="tipIcon" /></div>
                        <div className="timeSelect">
                            {
                                timeListMap.map((time) => {
                                    return (
                                        <span 
                                            className={rankTime === time.key ? 'active' : ''}
                                            onClick={() => {
                                                setRankTime(time.key)
                                            }}
                                            key={time.key}>
                                                {time.txt}
                                        </span>
                                        )
                                })
                            }
                        </div>
                    </div>
                    <div className='content'>
                        <Tabs defaultActiveKey={[rank]} onChange={(key) => {
                            setRank(key)
                        }}>
                            {
                                rankListMap.map(time => {
                                    return (
                                        <TabPane tab={time.title} key={time.key}>
                                            <p className='top'>
                                                <span>内容名称</span>
                                                <span>总量</span>
                                            </p>
                                            <ul>
                                                {
                                                    rankData[time.key].length ? rankData[time.key].map((item, index) => {
                                                        return (
                                                            <li key={index}>
                                                                <span className="rank">{index + 1}</span>
                                                                <span className='name'>{item.name}</span>
                                                                <span className='count'>{item.count}</span>
                                                            </li>
                                                        )
                                                    }): <li>暂无数据</li>
                                                }
                                               
                                            </ul>
                                        </TabPane>
                                    )
                                })
                            }
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Test