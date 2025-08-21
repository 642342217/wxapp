import React, { useEffect } from 'react';
import { Button, Card, Typography, Space, Row, Col, Badge } from 'antd';
import { UserOutlined, CalendarOutlined, FileTextOutlined, SwapOutlined, LogoutOutlined, LineChartOutlined, UnorderedListOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../store/userStore';
import backImage from '../../assets/images/back.jpg'; // 路径根据你的文件结构调整


const { Title, Text } = Typography;

const Dashboard = () => {
  const navigate = useNavigate();
  
  // 使用 zustand 全局状态
  const { userInfo, loading, fetchUserInfo } = useUserStore();

  // 获取用户信息
  useEffect(() => {
    // 只有当用户信息为空时才获取用户信息
    if (!userInfo.name) {
      fetchUserInfo();
    }
  }, [userInfo.name]);

  // 模拟建议书数据
  const proposalData = [
    {
      id: 'Valued Client',
      title: '万通危疾加护保（优越版）— 25年期',
      status: '已成功',
      client: 'Valued Client'
    },
    {
      id: 'Valued Client',
      title: '环宇盈活储蓄保险计划-5年',
      status: '已成功',
      client: 'Valued Client'
    },
    {
      id: 'Valued Client',
      title: '「爱伴航」-25年',
      status: '已成功',
      client: 'Valued Client'
    }
  ];

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

        <MenuSection>
          <WelcomeCard>
          <GreetingSection>
            <GreetingText>{userInfo.greeting} {userInfo.weatherIcon}</GreetingText>
            <UserName>{userInfo.name}</UserName>
          </GreetingSection>
        </WelcomeCard>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <MenuCard onClick={() => navigate('/proposals')}>
                <IconCircle>
                  <LineChartOutlined />
                </IconCircle>
                <MenuText>建议书</MenuText>
              </MenuCard>
            </Col>
            <Col span={12}>
              <MenuCard onClick={() => navigate('/policies')}>
                <IconCircle>
                  <UnorderedListOutlined />
                </IconCircle>
                <MenuText>保单管理</MenuText>
              </MenuCard>
            </Col>
          </Row>
        </MenuSection>

        {/* <ActionButtonsSection>
          <ActionButton>
            <PlusIcon>+</PlusIcon>
            <ActionText>新预约</ActionText>
          </ActionButton>
          <ActionButton>
            <PlusIcon>+</PlusIcon>
            <ActionText>新建议书</ActionText>
          </ActionButton>
        </ActionButtonsSection> */}

        <ProposalSection>
          <SectionHeader>
            <SectionTitle>建议书</SectionTitle>
            <ViewMoreLink onClick={() => navigate('/proposals')}>更多 &gt;</ViewMoreLink>
          </SectionHeader>
          
          {proposalData.map((proposal, index) => (
            <ProposalCard key={index}>
              <ProposalHeader>
                <ProposalClient>{proposal.client}</ProposalClient>
                <ProposalStatus>{proposal.status}</ProposalStatus>
              </ProposalHeader>
              <ProposalTitle>{proposal.title}</ProposalTitle>
            </ProposalCard>
          ))}
        </ProposalSection>

        <PolicySection>
          <SectionHeader>
            <SectionTitle>保单动态</SectionTitle>
            <ViewMoreLink>更多 &gt;</ViewMoreLink>
          </SectionHeader>
          
          {policyData.map(policy => (
            <PolicyCard key={policy.id}>
              <PolicyHeader>
                <PolicyId>
                  {policy.id}
                </PolicyId>
                <PolicyStatus status={policy.status}>{policy.status}</PolicyStatus>
              </PolicyHeader>
              <PolicyContent>
                <PolicyItem>
                  <PolicyTypeTag>{policy.type}</PolicyTypeTag>
                  <PolicyName>{policy.name}</PolicyName>
                </PolicyItem>
                <PolicyItem style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
                  <PolicyItem>
                    <PolicyCompany>{policy.company}</PolicyCompany>
                    <PolicyAgent>{policy.agent}</PolicyAgent>
                  </PolicyItem>
                  <PolicyAmount>{policy.amount}</PolicyAmount>
                </PolicyItem>
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
  justify-content: space-between;
  align-items: center;
  padding: 20px 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
`;

const LogoImage = styled.img`
  height: 45px;
  margin-right: 12px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const LogoText = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: white;
  line-height: 1.2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const LogoSubtext = styled.div`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.8);
  margin-left: 8px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;
`;

const WelcomeCard = styled.div`
  padding: 25px 20px;
  color: white;
  margin: 15px;
  position: relative;
`;

const GreetingSection = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
`;

const GreetingText = styled.div`
  font-size: 16px;
  margin-bottom: 8px;
  opacity: 0.9;
  font-weight: 400;
`;

const UserName = styled.div`
  font-size: 30px;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const MenuSection = styled.div`
  background: url(${backImage});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  padding: 0 10px 25px;
  margin-bottom: 20px;
  position: relative;
  min-height: 200px;
`;

const MenuCard = styled.div`
  background: transparent;
  height: 90px;
  border-radius: 26px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const IconCircle = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  background: rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  
  .anticon {
    font-size: 22px !important;
    color: white !important;
    transition: all 0.3s ease;
  }
  
  ${MenuCard}:hover & {
    background: rgba(255, 255, 255, 0.4);
    transform: scale(1.1);
    
    .anticon {
      color: white !important;
    }
  }
`;

const MenuText = styled.div`
  font-size: 13px;
  color: white;
  font-weight: 500;
  transition: all 0.3s ease;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  
  ${MenuCard}:hover & {
    color: white;
    font-weight: 600;
  }
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
  border-left: 4px solid #2468F2;
  padding-left: 10px;
`;

const ViewMoreLink = styled.a`
  font-size: 14px;
  color: #2468F2;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
`;

const PolicyCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 15px 0;
  margin-bottom: 15px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`;

const PolicyHeader = styled.div`
  display: flex;
  padding: 0 15px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
`;

const PolicyId = styled.div`
  font-size: 16px;
  font-weight: 500;
  background: linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(244, 226, 175) 70%); 
`;

const PolicyStatus = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: ${props => props.status === '核保中' ? '#2468F2' : props.status === '已生效' ? '#52c41a' : '#333'};
`;

const PolicyContent = styled.div`
  margin-bottom: 10px;
  padding: 0 15px;  
`;

const PolicyItem = styled.div`
  display: flex;
  align-items: center;
`;

const PolicyTypeTag = styled.span`
  display: inline-block;
  background-color: rgb(177, 6, 6);
  color: #fff;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  margin-right: 10px;
  margin-bottom: 5px;
`;

const PolicyName = styled.div`
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 5px;
`;

const PolicyCompany = styled.div`
  display: inline-block;
  background-color:rgb(253, 241, 207);
  color:rgb(237, 154, 10);
  padding: 2px 8px;
  border-radius: 8px;
  font-size: 12px;
  margin-right: 10px;
`;

const PolicyAgent = styled.div`
  display: inline-block;
  font-size: 12px;
  background-color:rgb(205, 226, 245);
  color:rgb(5, 57, 247);
    border-radius: 8px;
  padding: 2px 8px;

`;

const PolicyAmount = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #333;
  text-align: right;
`;

const PolicyFooter = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #999;
  padding: 6px 15px 0;
`;

const PolicyDate = styled.div`
  color: #000;
`;

const PolicyReferrer = styled.div``;

const ProposalSection = styled.div`
  padding: 0 15px;
  margin-bottom: 20px;
`;

const ProposalCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`;

const ProposalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ProposalClient = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;

const ProposalStatus = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: #52c41a;
`;

const ProposalTitle = styled.div`
  font-size: 14px;
  color: #666;
  line-height: 1.4;
`;

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