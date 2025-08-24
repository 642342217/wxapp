import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { apiService } from '../../utils/api'

const Materials = () => {
  const navigate = useNavigate();
  const [insuranceCompanies, setInsuranceCompanies] = useState([]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  useEffect(() => {
    apiService.getCompanyPage()
      .then(res => {
        console.log(res, 'chjrerrr')
        if (res.code === 0) {
          const data = res.data.map(item => ({ ...item, name: item.shortName, logo: item.icon }))
          setInsuranceCompanies(data);
        }
      })
  }, [])
  // 保险公司数据
  // const insuranceCompanies = [
  //   { id: 1, name: '友邦', logo: '🏢', color: '#E11D48' },
  //   { id: 2, name: '周大福', logo: '💎', color: '#059669' },
  //   { id: 3, name: '保诚', logo: '👤', color: '#DC2626' },
  //   { id: 4, name: '安盛', logo: '🔷', color: '#1D4ED8' },
  //   { id: 5, name: '宏利', logo: '🏛️', color: '#059669' },
  //   { id: 6, name: '万通', logo: '🔵', color: '#1E40AF' },
  //   { id: 7, name: '富卫', logo: '🛡️', color: '#374151' },
  //   { id: 8, name: '永明', logo: '☀️', color: '#F59E0B' },
  //   { id: 9, name: '立桥', logo: '🌟', color: '#7C3AED' },
  //   { id: 10, name: '保柏', logo: '🏥', color: '#0EA5E9' },
  //   { id: 11, name: '微蓝', logo: '🔷', color: '#3B82F6' },
  //   { id: 12, name: '安达', logo: '🔵', color: '#06B6D4' },
  //   { id: 13, name: '忠意', logo: '🦁', color: '#DC2626' },
  //   { id: 14, name: '苏黎世', logo: '🔷', color: '#1E40AF' },
  //   { id: 15, name: '太保', logo: '🔵', color: '#1D4ED8' },
  //   { id: 16, name: '國壽', logo: '🏛️', color: '#059669' },
  //   { id: 17, name: '中银', logo: '🏦', color: '#DC2626' },
  //   { id: 18, name: '太平', logo: '🌲', color: '#059669' }
  // ];

  return (
    <MaterialsContainer>
      <ContentArea>
        {/* 顶部标题区域 */}
        <HeaderSection>
          <HeaderTitle>2025 Q3</HeaderTitle>
          <HeaderSubtitle>最新资讯，丰收季节</HeaderSubtitle>
        </HeaderSection>

        {/* 各保司资料 */}
        <CompanySection>
          <SectionTitle>各保司资料</SectionTitle>
          <CompanyGrid>
            {insuranceCompanies.map(company => (
              <CompanyItem key={company.id}>
                <CompanyLogo style={{ backgroundColor: company.color }}>
                  {company.logo}
                </CompanyLogo>
                <CompanyName>{company.name}</CompanyName>
              </CompanyItem>
            ))}
          </CompanyGrid>
        </CompanySection>
      </ContentArea>
      
      <BottomNavigation>
        <NavItem $isActive={true}>
          <UserOutlined style={{ color: '#2468F2' }} />
          <NavText style={{ color: '#2468F2' }}>资料</NavText>
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
        <NavItem onClick={() => handleNavigation('/profile')}>
          <LogoutOutlined />
          <NavText>我的</NavText>
        </NavItem>
      </BottomNavigation>
    </MaterialsContainer>
  );
};

// 样式组件
const MaterialsContainer = styled.div`
  min-height: 100vh;
  background-color:rgb(242, 240, 240);
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ContentArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-bottom: 60px;
`;

const HeaderSection = styled.div`
  padding: 40px 20px 20px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const HeaderTitle = styled.h1`
  font-size: 48px;
  font-weight: bold;
  color: #333;
  margin: 0;
  line-height: 1;
`;

const HeaderSubtitle = styled.p`
  font-size: 18px;
  color: #666;
  margin: 8px 0 0 0;
  opacity: 0.9;
`;

const HeaderActions = styled.div`
  position: absolute;
  top: 40px;
  right: 20px;
  display: flex;
  gap: 15px;
`;

const ActionButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const CompanySection = styled.div`
  background: white;
  margin: 30px 20px;
  padding-top: 8px;
  border-radius: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 15px;
  font-weight: 600;
  color: #333;
  padding: 2px 4px;
  border-radius: 15px;

  width: 100px;
  margin: 20px auto;
  text-align: center;
  background: rgb(242, 240, 240);
`;

const CompanyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  padding: 0 30px 30px;
  background: transparent;
  margin: 0;
  border-radius: 0;
`;

const CompanyItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const CompanyLogo = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-bottom: 6px;
`;

const CompanyName = styled.span`
  font-size: 12px;
  color: #333;
  text-align: center;
  font-weight: 500;
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
  
  @media screen and (min-width: 768px) {
    max-width: 414px;
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

export default Materials;