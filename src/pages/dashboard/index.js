import React from 'react';
import { Button, Card, Typography, Space, Row, Col, Badge } from 'antd';
import { UserOutlined, CalendarOutlined, FileTextOutlined, SwapOutlined, LogoutOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const Dashboard = () => {
  const navigate = useNavigate();
  
  // 模拟用户数据
  const userData = {
    name: '万承 (孟策)',
    greeting: '下午好',
    weatherIcon: '☀️'
  };

  // 模拟保单数据
  const policyData = [
    {
      id: '3808772002',
      status: '核保中',
      type: '港险',
      name: '宏掌傳承保障計劃-5年',
      company: '宏利保险',
      agent: '袁泳琳',
      amount: '$10,000 USD',
      date: '2025-07-25 15:10:42',
      referrer: '万承 (孟策)'
    },
    {
      id: 'G684830803',
      status: '已生效',
      type: '港险',
      name: '「盈御多元货币计划3」-5年',
      company: '友邦保险',
      agent: '曹师嘉',
      amount: '$30,000 USD',
      date: '2025-06-30 10:43:43',
      referrer: '万承 (孟策)'
    }
  ];

  const handleLogout = () => {
    // 登出逻辑
    navigate('/login');
  };

  return (
    <DashboardContainer>
      <ContentArea>
        <Header>
          <LogoContainer>
            <LogoImage src="/logo192.png" alt="小润领跑" />
            <LogoText>小润领跑</LogoText>
            <LogoSubtext>RUNNING LIFE</LogoSubtext>
          </LogoContainer>
        </Header>

        <WelcomeCard>
          <GreetingSection>
            <GreetingText>{userData.greeting} {userData.weatherIcon}</GreetingText>
            <UserName>{userData.name}</UserName>
          </GreetingSection>
        </WelcomeCard>

        <MenuSection>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <MenuCard>
                <IconCircle style={{ backgroundColor: 'rgba(36, 104, 242, 0.1)' }}>
                  <FileTextOutlined style={{ color: '#2468F2' }} />
                </IconCircle>
                <MenuText>建议书</MenuText>
              </MenuCard>
            </Col>
            <Col span={6}>
              <MenuCard>
                <IconCircle style={{ backgroundColor: 'rgba(36, 104, 242, 0.1)' }}>
                  <CalendarOutlined style={{ color: '#2468F2' }} />
                </IconCircle>
                <MenuText>预约管理</MenuText>
              </MenuCard>
            </Col>
            <Col span={6}>
              <MenuCard>
                <IconCircle style={{ backgroundColor: 'rgba(36, 104, 242, 0.1)' }}>
                  <FileTextOutlined style={{ color: '#2468F2' }} />
                </IconCircle>
                <MenuText>保单管理</MenuText>
              </MenuCard>
            </Col>
            <Col span={6}>
              <MenuCard>
                <IconCircle style={{ backgroundColor: 'rgba(36, 104, 242, 0.1)' }}>
                  <SwapOutlined style={{ color: '#2468F2' }} />
                </IconCircle>
                <MenuText>产品对比</MenuText>
              </MenuCard>
            </Col>
          </Row>
        </MenuSection>

        <ActionButtonsSection>
          <ActionButton>
            <PlusIcon>+</PlusIcon>
            <ActionText>新预约</ActionText>
          </ActionButton>
          <ActionButton>
            <PlusIcon>+</PlusIcon>
            <ActionText>新建议书</ActionText>
          </ActionButton>
        </ActionButtonsSection>

        <PolicySection>
          <SectionHeader>
            <SectionTitle>保单动态</SectionTitle>
            <ViewMoreLink>更多 &gt;</ViewMoreLink>
          </SectionHeader>
          
          {policyData.map(policy => (
            <PolicyCard key={policy.id}>
              <PolicyHeader>
                <PolicyId>{policy.id}</PolicyId>
                <PolicyStatus status={policy.status}>{policy.status}</PolicyStatus>
              </PolicyHeader>
              <PolicyContent>
                <PolicyTypeTag>{policy.type}</PolicyTypeTag>
                <PolicyName>{policy.name}</PolicyName>
                <PolicyCompany>{policy.company}</PolicyCompany>
                <PolicyAgent>{policy.agent}</PolicyAgent>
                <PolicyAmount>{policy.amount}</PolicyAmount>
              </PolicyContent>
              <PolicyFooter>
                <PolicyDate>{policy.date}</PolicyDate>
                <PolicyReferrer>转介人: {policy.referrer}</PolicyReferrer>
              </PolicyFooter>
            </PolicyCard>
          ))}
        </PolicySection>
      </ContentArea>
      
      <BottomNavigation>
        <NavItem>
          <UserOutlined />
          <NavText>资料</NavText>
        </NavItem>
        <NavItem $isActive={true}>
          <NavIconGroup>
            <NavIconDot />
            <NavIconDot />
            <NavIconDot />
            <NavIconDot />
          </NavIconGroup>
          <NavText>工作台</NavText>
        </NavItem>
        <NavItem onClick={() => navigate('/profile')}>
          <LogoutOutlined />
          <NavText>我的</NavText>
        </NavItem>
      </BottomNavigation>
    </DashboardContainer>
  );
};

// 样式组件
const DashboardContainer = styled.div`
  padding: 0;
  min-height: 100vh;
  background-color: var(--background-color, #f0f8ff);
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ContentArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-bottom: 60px; /* 为底部导航留出空间 */
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 15px;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  height: 40px;
  margin-right: 10px;
`;

const LogoText = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #000;
  line-height: 1.2;
`;

const LogoSubtext = styled.div`
  font-size: 10px;
  color: #666;
  margin-left: 5px;
  text-transform: uppercase;
`;

const WelcomeCard = styled.div`
  padding: 20px;
  background-color: #2468F2;
  color: white;
  margin-bottom: 20px;
`;

const GreetingSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const GreetingText = styled.div`
  font-size: 16px;
  margin-bottom: 5px;
`;

const UserName = styled.div`
  font-size: 24px;
  font-weight: 500;
`;

const MenuSection = styled.div`
  padding: 0 15px;
  margin-bottom: 20px;
`;

const MenuCard = styled.div`
  background-color: white;
  height: 80px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`;

const IconCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
  
  .anticon {
    font-size: 20px;
  }
`;

const MenuText = styled.div`
  font-size: 12px;
  color: #333;
`;

const ActionButtonsSection = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 0 15px;
  margin-bottom: 20px;
`;

const ActionButton = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  padding: 10px 15px;
  border-radius: 20px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`;

const PlusIcon = styled.div`
  width: 20px;
  height: 20px;
  background-color: #2468F2;
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  font-size: 16px;
  line-height: 1;
`;

const ActionText = styled.div`
  font-size: 14px;
  color: #333;
`;

const PolicySection = styled.div`
  padding: 0 15px;
  margin-bottom: 20px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const SectionTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;

const ViewMoreLink = styled.a`
  font-size: 14px;
  color: #2468F2;
  text-decoration: none;
`;

const PolicyCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`;

const PolicyHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const PolicyId = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

const PolicyStatus = styled.div`
  font-size: 14px;
  color: ${props => props.status === '核保中' ? '#2468F2' : props.status === '已生效' ? '#52c41a' : '#333'};
`;

const PolicyContent = styled.div`
  margin-bottom: 10px;
`;

const PolicyTypeTag = styled.span`
  display: inline-block;
  background-color: #f9f0e6;
  color: #d48806;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  margin-right: 10px;
  margin-bottom: 5px;
`;

const PolicyName = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
`;

const PolicyCompany = styled.div`
  display: inline-block;
  background-color: #f0f5ff;
  color: #2468F2;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  margin-right: 10px;
`;

const PolicyAgent = styled.div`
  display: inline-block;
  font-size: 14px;
  color: #666;
`;

const PolicyAmount = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #333;
  text-align: right;
  margin-top: 5px;
`;

const PolicyFooter = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #999;
`;

const PolicyDate = styled.div``;

const PolicyReferrer = styled.div``;


const BottomNavigation = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background-color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.05);
  z-index: 10;
  
  /* PC端样式 */
  @media screen and (min-width: 768px) {
    max-width: 414px; /* 移动设备标准宽度 */
    left: 50%;
    transform: translateX(-50%);
  }
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${props => props.$isActive ? '#2468F2' : '#999'};
  font-size: 20px;
`;

const NavText = styled.div`
  font-size: 12px;
  margin-top: 2px;
`;

const NavIconGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 2px;
  width: 20px;
  height: 20px;
`;

const NavIconDot = styled.div`
  width: 8px;
  height: 8px;
  background-color: #2468F2;
  border-radius: 2px;
`;

export default Dashboard;