import React from 'react';
import ReactDOM from 'react-dom';

import '~static/css/base.scss'
import Page from './page';

import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN';



ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Page />
  </ConfigProvider>,
  document.getElementById('root')
);