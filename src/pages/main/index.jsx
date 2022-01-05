import './index.scss'
import { QuestionCircleOutlined, CaretUpOutlined } from '@ant-design/icons'

const Test = () => {

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
                    <div className="title">用户数据<QuestionCircleOutlined className="tipIcon" /></div>
                    <div className="centerNum">
                        <div className='num'>
                            336
                            <span className='trend green'>
                                <CaretUpOutlined className="trendIcon" />
                                33
                            </span>
                        </div>
                        <div className="num-tip">用户总数</div>
                    </div>
                    <div className='info'>
                        <div className="left-text">
                            已验证手机号用户数
                        </div>
                        <div className="right-num">
                            0
                            <span className='trend green'>
                                <CaretUpOutlined className="trendIcon" />
                                33
                            </span>
                        </div>
                    </div>
                    <div className='info'>
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
                    </div>
                </div>
                <div className="dataBox">
                    <div className="title">内容数据数据<QuestionCircleOutlined className="tipIcon" /></div>
                    <div className="centerNum">
                        <div className='num'>
                            336
                            <span className='trend green'>
                                <CaretUpOutlined className="trendIcon" />
                                33
                            </span>
                        </div>
                        <div className="num-tip">内容总数</div>
                    </div>
                    <div className='info'>
                        <div className="left-text">
                            内容浏览量总和
                        </div>
                        <div className="right-num">
                            0
                            <span className='trend green'>
                                <CaretUpOutlined className="trendIcon" />
                                33
                            </span>
                        </div>
                    </div>
                    <div className='info'>
                        <div className="left-text">
                            内容浏览人数总和
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
                            内容分享量总和
                        </div>
                        <div className="right-num">
                            0
                            <span className='trend green'>
                                <CaretUpOutlined className="trendIcon" />
                                33
                            </span>
                        </div>
                    </div>
                </div>
                <div className="dataBox">
                    <div className="title">渠道数据<QuestionCircleOutlined className="tipIcon" /></div>
                    <div className="centerNum">
                        <div className='num'>
                            336
                            <span className='trend green'>
                                <CaretUpOutlined className="trendIcon" />
                                33
                            </span>
                        </div>
                        <div className="num-tip">进行中任务总数</div>
                    </div>
                    <div className='info'>
                        <div className="left-text">
                            已发布任务总数
                        </div>
                        <div className="right-num">
                            0
                            <span className='trend green'>
                                <CaretUpOutlined className="trendIcon" />
                                33
                            </span>
                        </div>
                    </div>
                    <div className='info'>
                        <div className="left-text">
                            平均任务领取率
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
                            自有渠道总数
                        </div>
                        <div className="right-num">
                            0
                            <span className='trend green'>
                                <CaretUpOutlined className="trendIcon" />
                                33
                            </span>
                        </div>
                    </div>
                    <div className='info'>
                        <div className="left-text">
                            制码总数
                        </div>
                        <div className="right-num">
                            0
                            <span className='trend green'>
                                <CaretUpOutlined className="trendIcon" />
                                33
                            </span>
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
                            <span>今日</span>
                            <span>近七天</span>
                            <span>近30天</span>
                            <span className='active'>累计</span>
                        </div>
                    </div>

                </div>
                <div className="chartBox rightChart">
                    <div className="title">内容排行榜<QuestionCircleOutlined className="tipIcon" /></div>
                </div>
            </div>
        </div>
    )
}

export default Test