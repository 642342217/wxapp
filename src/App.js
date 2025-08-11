import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

// 导入布局和页面组件
import MainLayout from './layouts/MainLayout';
import LoginPage from './pages/login';
import Dashboard from './pages/dashboard';
import Profile from './pages/profile';
import ProposalsPage from './pages/proposals';
import PoliciesPage from './pages/policies';
import PolicyDetailPage from './pages/policies/detail';
import ClientsPage from './pages/clients';

// 导入全局样式
import './styles/global.less';
import './App.css';

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <Routes>
          {/* 主布局下的路由 */}
          <Route element={<MainLayout />}>
            {/* 登录页面 */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/proposals" element={<ProposalsPage />} />
            <Route path="/policies/:id" element={<PolicyDetailPage />} />
            <Route path="/policies" element={<PoliciesPage />} />
            <Route path="/my-clients" element={<ClientsPage />} />
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
