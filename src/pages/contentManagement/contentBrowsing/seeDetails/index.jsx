import { Drawer, Button } from 'antd';
import { useState, useEffect } from 'react';
import TableView from '~components/Table'
import { activeDetails, getDetailsFile } from '~request/api/activity';
import moment from 'moment'

import './index.scss'
const SeeData = (props) => {
    const { seeDetailsFlag, setSeeDetailsFlag, currentNode, setCurrentNode } = props
    const columns = [
        {
            title: '机构名称',
            dataIndex: 'companyName'
        },
        {
            title: '机构代码',
            dataIndex: 'companyId'
        },
        {
            title: '员工工号',
            dataIndex: 'jobId'
        },
        {
            title: '员工姓名',
            dataIndex: 'staffName'
        },
        {
            title: '客户微信昵称',
            dataIndex: 'nickName'
        },
        {
            title: '客户电话',
            dataIndex: 'phone'
        },
        {
            title: '客户真实姓名',
            dataIndex: 'name'
        },
        {
            title: '首次进入时间',
            dataIndex: 'startTime',
            render(h) {
                return moment(h).format('YYYY-MM-DD HH:SS')
            }
        },
        {
            title: '最后进入时间',
            dataIndex: 'endTime',
            render(h) {
                return moment(h).format('YYYY-MM-DD HH:SS')
            },
        }
    ]
    const [tableData, setTableData] = useState([])

    /**
     * @method onClose
     * @description 关闭
     */
    const onClose = () => {
        setSeeDetailsFlag(false)
        setCurrentNode(null)
    }
    useEffect(() => {
        getList()
    }, [])

    const getList = async () => {
        let res = await activeDetails({
            activeId: currentNode.activeId,
        })
        if(res.code === 0){
            setTableData(res.data.list)
        }
    }

    const getExportFile = async () => {
        let res = await getDetailsFile({
            activeId: currentNode.activeId,
        })
        if(res.code === 0){
            saveFile(res.data, '数据')
        }
    }

    function base64ToArrayBuffer(base64) {
        var binary_string = window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }

    const saveFile = (file, filename) => {
        const ieKit = /(?:ms|\()(ie)\s([\w\.]+)|trident|(edge|edgios|edga|edg)/i.test(window.navigator.userAgent)
        const blobData = new Blob([base64ToArrayBuffer(file)], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
        })
        if (ieKit) {
            navigator.msSaveBlob && navigator.msSaveBlob(blobData, filename)
        } else {
            const objectURL = window.URL.createObjectURL(blobData)
            const save_link = document.createElement('a')
            const event = document.createEvent('MouseEvents')
            save_link.href = objectURL
            save_link.download = filename + '.xlsx'
            event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
            save_link.dispatchEvent(event)
            window.URL.revokeObjectURL(objectURL)
        }
    }

    return (
        <Drawer
            className='seeData'
            width={900}
            title={currentNode.title}
            onClose={onClose}
            visible={seeDetailsFlag}
        >
            <div className="topOptions">
                <div className=''>
                    <Button onClick={() => {
                        getExportFile()
                    }}>导出数据</Button>
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