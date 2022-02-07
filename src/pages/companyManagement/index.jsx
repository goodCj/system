import { useState } from "react";
import { useEffect } from "react";
import TableView from '~components/Table'
import { companyList } from "~request/api/company";
import { Button, message } from 'antd'
import './index.scss'
import AddNewP from "./addNew";
import DeleteCompanyM from "./deleteCompany";

const CompanyManagement = () => {
    const columns = [
        {
            title: '公司id',
            dataIndex: 'id'
        },
        {
            title: '公司名称',
            dataIndex: 'companyName'
        },
        {
            title: '操作',
            render: (text, data) => {
                return (
                    <>
                        <span className='actions edit' style={{ cursor: 'pointer' }} onClick={() => openDeleteM(data)}>删除</span>
                    </>
                )
            }
        }
    ];
    const [addNewFlag, setAddNewFlag] = useState(false)
    const [companyData, setCompanyData] = useState({
        data: [],
        total: 0
    })
    const [companyDataOptions, setCompanyDataOptions] = useState({
        count: 10,
        offset: 0
    })
    const [deleteFlag, setDeleteFlag] = useState(false)
    const [deleteCompany, setDeleteCompany] = useState()
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    useEffect(() => {
        getCompanylist()
    }, [companyDataOptions])

     /**
     * @method deleteUser
     * @description 删除用户
     */
      const openDeleteM = (data) => {
        let currentCompany = JSON.parse(localStorage.getItem('currentCompany'))
        if(userInfo.role !== 0 && currentCompany.id === data.id) {
            message.warning('当前公司已被选择，不能删除！')
            return
        }
        setDeleteCompany(data)
        setDeleteFlag(true)
    }

    /**
     * @method getCompanylist
     * @description 获取公司列表
     */
    const getCompanylist = async () => {
        let res = await companyList({
            ...companyDataOptions
        })
        if(res.code === 0){
            setCompanyData({
                data: res.data.list,
                total: res.data.count
            })
        }
    }

    return (
        <div className="company">
            {/* 添加新用户 */}
            {
                addNewFlag && <AddNewP { ...{addNewFlag, setAddNewFlag,setCompanyDataOptions } }></AddNewP>
            }
            {/* 删除新用户 */}
            {
                deleteFlag && <DeleteCompanyM {...{ deleteFlag, setDeleteFlag, deleteCompany, getCompanylist }}></DeleteCompanyM>
            }
            <div className="topOptions">
                <Button
                    className='addNewP'
                    type="primary"
                    onClick={() => { setAddNewFlag(true) }}
                >新增公司</Button>
            </div>
            <div className='tableBox'>
                <TableView
                    columns={columns}
                    data={companyData}
                    setPage={setCompanyDataOptions}
                />
            </div>
        </div>
    )
}

export default CompanyManagement