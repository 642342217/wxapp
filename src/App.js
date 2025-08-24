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
import ProductSelectionPage from './pages/proposals/product-selection';
import PoliciesPage from './pages/policies';
import PolicyDetailPage from './pages/policies/detail';
import ClientsPage from './pages/clients';
import ClientDetailPage from './pages/clients/detail';
import Materials from './pages/materials';
import CompanyDetail from './pages/materials/company-detail';
import AccountsPage from './pages/accounts';
import AddAccountPage from './pages/accounts/add';
import AccountDetailPage from './pages/accounts/detail';
import ProtectedRoute from './components/ProtectedRoute';

// 导入全局样式
import './styles/global.less';
import './App.css';

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <Routes>
          {/* 登录页面 - 不需要保护 */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* 主布局下的受保护路由 */}
          <Route element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/proposals" element={<ProposalsPage />} />
            <Route path="/proposals/product-selection" element={<ProductSelectionPage />} />
            <Route path="/policies/:id" element={<PolicyDetailPage />} />
            <Route path="/policies" element={<PoliciesPage />} />
            <Route path="/my-clients" element={<ClientsPage />} />
            <Route path="/clients/:id" element={<ClientDetailPage />} />
            <Route path="/materials" element={<Materials />} />
            <Route path="/materials/company/:id" element={<CompanyDetail />} />
            <Route path="/accounts" element={<AccountsPage />} />
            <Route path="/accounts/add" element={<AddAccountPage />} />
            <Route path="/accounts/:id" element={<AccountDetailPage />} />
          </Route>
          
          {/* 默认重定向到dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
