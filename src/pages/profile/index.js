import React from 'react';
import { Typography, Divider } from 'antd';
import { UserOutlined, LockOutlined, BankOutlined, DeleteOutlined, LogoutOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { tokenManager } from '../../utils/api';
import useUserStore from '../../store/userStore';

const { Text } = Typography;

const Profile = () => {
  const navigate = useNavigate();
  const { userInfo, clearUserInfo } = useUserStore();

  const handleLogout = () => {
    // 清除token
    tokenManager.clearToken();
    // 清除用户信息
    clearUserInfo();
    // 跳转到登录页
    navigate('/login');
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <ProfileContainer>
      <ContentArea>
        <Header>
          <LogoContainer>
            <LogoImage src="/logo192.png" alt="小润领跑" />
            <LogoText>小润领跑</LogoText>
            <LogoSubtext>RUNNING LIFE</LogoSubtext>
          </LogoContainer>
        </Header>

        <IdSection>
          <IdText>ID: {userInfo.id || 'N/A'}</IdText>
        </IdSection>

        <UserCard>
          <UserName>{userInfo.name || '用户'}</UserName>
        </UserCard>

        <MenuSection>
          <MenuItem onClick={() => handleNavigation('/my-clients')}>
            <MenuIcon>
              <UserOutlined />
            </MenuIcon>
            <MenuText>我的客户</MenuText>
          </MenuItem>
          <MenuItem onClick={() => handleNavigation('/change-password')}>
            <MenuIcon>
              <LockOutlined />
            </MenuIcon>
            <MenuText>修改密码</MenuText>
          </MenuItem>
          <MenuItem onClick={() => handleNavigation('/accounts')}>
            <MenuIcon>
              <BankOutlined />
            </MenuIcon>
            <MenuText>收款银行账户</MenuText>
          </MenuItem>
          <MenuItem onClick={() => handleNavigation('/clear-cache')}>
            <MenuIcon>
              <DeleteOutlined />
            </MenuIcon>
            <MenuText>清除缓存</MenuText>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <MenuIcon>
              <LogoutOutlined />
            </MenuIcon>
            <MenuText>安全登出</MenuText>
          </MenuItem>
        </MenuSection>

        <FooterSection>
          <FooterText>小润PC自助平台，请打开浏览器，输入网址</FooterText>
          <FooterLink>business.rlifehk.com</FooterLink>
          <VersionText>VERSION</VersionText>
          <VersionNumber>v1.37</VersionNumber>
        </FooterSection>
      </ContentArea>
      
      <BottomNavigation>
        <NavItem onClick={() => handleNavigation('/dashboard')}>
          <UserOutlined />
          <NavText>资料</NavText>
        </NavItem>
        <NavItem onClick={() => handleNavigation('/dashboard')}>
          <NavIconGroup>
            <NavIconDot />
            <NavIconDot />
            <NavIconDot />
            <NavIconDot />
          </NavIconGroup>
          <NavText>工作台</NavText>
        </NavItem>
        <NavItem $isActive={true}>
          <LogoutOutlined style={{ color: '#2468F2' }} />
          <NavText style={{ color: '#2468F2' }}>我的</NavText>
        </NavItem>
      </BottomNavigation>
    </ProfileContainer>
  );
};

// 样式组件
const ProfileContainer = styled.div`
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

const IdSection = styled.div`
  padding: 10px 15px;
  background-color: #f5f5f5;
`;

const IdText = styled.div`
  font-size: 14px;
  color: #999;
`;

const UserCard = styled.div`
  background-color: white;
  padding: 20px;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserName = styled.div`
  font-size: 20px;
  font-weight: 500;
`;

const MenuSection = styled.div`
  background-color: white;
  margin-bottom: 15px;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #f0f0f0;
  &:last-child {
    border-bottom: none;
  }
`;

const MenuIcon = styled.div`
  font-size: 20px;
  margin-right: 15px;
  color: #333;
`;

const MenuText = styled.div`
  font-size: 16px;
  color: #333;
`;

const FooterSection = styled.div`
  padding: 20px;
  text-align: center;
`;

const FooterText = styled.div`
  font-size: 12px;
  color: #999;
  margin-bottom: 5px;
`;

const FooterLink = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
`;

const VersionText = styled.div`
  font-size: 10px;
  color: #ccc;
  text-transform: uppercase;
`;

const VersionNumber = styled.div`
  font-size: 12px;
  color: #999;
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
  cursor: pointer;
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
  background-color: #999;
  border-radius: 2px;
`;

export default Profile;