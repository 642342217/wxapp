import React from 'react';
import { Button, Card, Typography, Space, Row, Col } from 'antd';
import { UserOutlined, AppstoreOutlined, SettingOutlined, BellOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 登出逻辑
    navigate('/login');
  };

  return (
    <DashboardContainer>
      <Header>
        <Title level={4}>小润领跑</Title>
        <BellOutlined style={{ fontSize: '20px' }} />
      </Header>

      <WelcomeCard>
        <Space direction="vertical" size="small">
          <Text>欢迎回来</Text>
          <Title level={4} style={{ margin: 0 }}>张经理</Title>
        </Space>
        <LogoutButton type="link" onClick={handleLogout}>退出登录</LogoutButton>
      </WelcomeCard>

      <MenuSection>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <MenuCard>
              <UserOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
              <MenuText>个人中心</MenuText>
            </MenuCard>
          </Col>
          <Col span={8}>
            <MenuCard>
              <AppstoreOutlined style={{ fontSize: '24px', color: '#52c41a' }} />
              <MenuText>应用管理</MenuText>
            </MenuCard>
          </Col>
          <Col span={8}>
            <MenuCard>
              <SettingOutlined style={{ fontSize: '24px', color: '#faad14' }} />
              <MenuText>系统设置</MenuText>
            </MenuCard>
          </Col>
        </Row>
      </MenuSection>

      <DataSection>
        <Title level={5}>数据概览</Title>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <DataCard>
              <DataTitle>今日订单</DataTitle>
              <DataValue>128</DataValue>
            </DataCard>
          </Col>
          <Col span={12}>
            <DataCard>
              <DataTitle>待处理</DataTitle>
              <DataValue>26</DataValue>
            </DataCard>
          </Col>
          <Col span={12}>
            <DataCard>
              <DataTitle>本月销售额</DataTitle>
              <DataValue>¥25,678</DataValue>
            </DataCard>
          </Col>
          <Col span={12}>
            <DataCard>
              <DataTitle>用户总数</DataTitle>
              <DataValue>1,286</DataValue>
            </DataCard>
          </Col>
        </Row>
      </DataSection>
    </DashboardContainer>
  );
};

// 样式组件
const DashboardContainer = styled.div`
  padding: 20px;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const WelcomeCard = styled(Card)`
  margin-bottom: 24px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .ant-card-body {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 16px;
  }
`;

const LogoutButton = styled(Button)`
  padding: 0;
`;

const MenuSection = styled.div`
  margin-bottom: 24px;
`;

const MenuCard = styled.div`
  background-color: white;
  height: 90px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const MenuText = styled.div`
  margin-top: 8px;
  font-size: 14px;
`;

const DataSection = styled.div`
  margin-bottom: 24px;
`;

const DataCard = styled(Card)`
  border-radius: 8px;
  height: 100px;
  
  .ant-card-body {
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const DataTitle = styled.div`
  color: #8c8c8c;
  font-size: 14px;
`;

const DataValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #262626;
`;

export default Dashboard;