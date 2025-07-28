import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

/**
 * 主布局组件
 * 实现移动端优先的响应式设计
 * 在PC端设置最大宽度，内容区居中展示，其他区域用背景图填充
 */
const MainLayout = () => {
  return (
    <AppContainer>
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
    </AppContainer>
  );
};

// 应用容器 - 在PC端会显示背景
const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  
  /* PC端样式 */
  @media screen and (min-width: 768px) {
    background-image: url('../../assets/images/bg-pattern.svg');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
  }
`;

// 内容包装器 - 在PC端会限制最大宽度
const ContentWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
  
  /* PC端样式 */
  @media screen and (min-width: 768px) {
    max-width: 414px; /* 移动设备标准宽度 */
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }
`;

export default MainLayout;