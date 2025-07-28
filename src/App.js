import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

// 导入布局和页面组件
import MainLayout from './layouts/MainLayout';
import LoginPage from './pages/login';
import Dashboard from './pages/dashboard';

// 导入全局样式
import './styles/global.css';
import './App.css';

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <Routes>
          {/* 登录页面 */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* 主布局下的路由 */}
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* 可以添加更多路由 */}
          </Route>
          
          {/* 默认重定向到登录页 */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
