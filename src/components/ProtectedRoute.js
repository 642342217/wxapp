import React from 'react';
import { Navigate } from 'react-router-dom';
import { tokenManager } from '../utils/api';

const ProtectedRoute = ({ children }) => {
  const hasToken = tokenManager.hasToken();
  
  if (!hasToken) {
    // 如果没有token，重定向到登录页
    return <Navigate to="/login" replace />;
  }
  
  // 如果有token，渲染子组件
  return children;
};

export default ProtectedRoute;