import './index.scss'
import { CaretRightOutlined, CaretLeftOutlined, SearchOutlined, CaretDownOutlined } from '@ant-design/icons'
import { useState } from 'react/cjs/react.development'
import { Input, Tree } from 'antd'

const FieldManagement = () => {
    const [isShrink, setIsShrink] = useState(false)

    const treeData = [
        {
            title: '保险场景运营',
            key: '0-0',
            children: [
                {
                    title: '客户体验',
                    key: '0-0-0'
                }
            ],
        },
        {
            title: '保险场景运营',
            key: '1-0',
            children: [
                {
                    title: '客户体验',
                    key: '1-0-0'
                }
            ],
        },
    ];

    /**
     * @method handlerShrink
     * @description 点击是否隐藏左侧搜索
     */
    const handlerShrink = () => {
        setIsShrink(!isShrink)
    }

    return (
        <div className='field'>
            <div className={`${!isShrink ? 'left-search left-search-show' : 'left-search-hide'}`}>
                {
                    !isShrink &&
                    <div className="search-container">
                    <div className="top-search">
                        <Input prefix={<SearchOutlined />} placeholder='搜索部门' />
                    </div>
                    <div className='bottom-content'>
                        <Tree
                            switcherIcon={<CaretDownOutlined />}
                            className='searchTree'
                            defaultExpandAll
                            treeData={treeData}
                        />
                    </div>
                </div>
                }
            </div>
            <div className='right-table'>
                <div
                    className={`shrink ${!isShrink ? 'hideIcon' : 'showIcon'}`}
                    onClick={handlerShrink}
                >
                    {
                        isShrink ?
                            <CaretRightOutlined />
                            :
                            <>
                                <CaretLeftOutlined />
                                <div className='line'></div>
                            </>
                    }
                </div>
            </div>
        </div>
    )
}

export default FieldManagement