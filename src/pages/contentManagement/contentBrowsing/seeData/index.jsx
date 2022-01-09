import { Drawer, Radio } from 'antd';
import { useState, useEffect } from 'react';
import TableView from '~components/Table'
import { getActiveData } from '~request/api/activity';
import './index.scss'
const SeeData = (props) => {
    const { seeDataFlag, setSeeDataFlag, currentNode, setCurrentNode } = props
    const columns = [
        {
            title: '机构名称',
            dataIndex: 'company'
        },
        {
            title: '所属营业区'
        },
        {
            title: '浏览量',
            dataIndex: 'viewDataPV'
        },
        {
            title: '浏览人数',
            dataIndex: 'viewDataUV'
        },
        {
            title: '分享量',
            dataIndex: 'shareDataPV'
        },
        {
            title: '分享人数',
            dataIndex: 'shareDataUV'
        },
        {
            title: '留资人数',
            dataIndex: 'stayMsgDataUV'
        }
    ];
    const viewOptions = [
        { value: 0, label: '公司视角' },
        { value: 1, label: '员工视角' }
    ]

    const [viewVal, setViewVal] = useState(0)
    const [tableData, setTableData] = useState([])

    useEffect(() => {
        getList()
    }, [viewVal])


    /**
     * @method onClose
     * @description 关闭
     */
    const onClose = () => {
        setSeeDataFlag(false)
        setCurrentNode(null)
    }

    const getList = async () => {
        let res = await getActiveData({
            activeId: currentNode.activeId,
            type: viewVal
        })
        if(res.code === 0){
            res.data.list.map(item => {
                item.viewDataPV = item.viewData.pv
                item.viewDataUV = item.viewData.uv
                item.shareDataPV = item.shareData.pv
                item.shareDataUV = item.shareData.uv
                item.stayMsgDataUV = item.stayMsgData.uv
            })
            setTableData([
                ...res.data.list
            ])
        }
    }

    return (
        <Drawer
            className='seeData'
            width={900}
            title={currentNode.title}
            onClose={onClose}
            visible={seeDataFlag}
        >
            <div className="topOptions">
                <div className=''>
                    <Radio.Group
                        options={viewOptions}
                        onChange={e => setViewVal(e.target.value)}
                        value={viewVal}
                        optionType="button"
                        buttonStyle="solid"
                    />
                </div>
            </div>
            <div className='tableBox'>
                    <TableView
                        columns={columns}
                        data={{data: tableData}}
                        setPage={null}
                    />
                </div>
        </Drawer>
    )
}

export default SeeData