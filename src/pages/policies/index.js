import React, { useState } from 'react';
import { Input, Button, message } from 'antd';
import { SearchOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const PoliciesPage = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [filteredPolicies, setFilteredPolicies] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // 模拟保单数据
  const policyData = [
    {
      id: '3808772002',
      status: '核保中',
      statusType: 'processing',
      type: '港险',
      productName: '宏掌傳承保障計劃-5年',
      company: '宏利保险',
      clientName: '袁泳琳',
      amount: '$10,000 USD',
      date: '2025-07-25 15:10:42',
      referrer: '万承 (孟策)'
    },
    {
      id: 'G684830803',
      status: '已生效',
      statusType: 'active',
      type: '港险',
      productName: '「盈御多元货币计划3」-5年',
      company: '友邦保险',
      clientName: '曹师嘉',
      amount: '$30,000 USD',
      date: '2025-06-30 10:43:43',
      referrer: '万承 (孟策)'
    },
    {
      id: '3808460392',
      status: '冷静期过',
      statusType: 'expired',
      type: '港险',
      productName: '宏掌傳承保障計劃-5年',
      company: '宏利保险',
      clientName: '傅凯佳',
      amount: '$5,000 USD',
      date: '2025-06-13 16:51:40',
      referrer: '万承 (孟策)'
    },
    {
      id: 'B634336001',
      status: '核保中',
      statusType: 'processing',
      type: '港险',
      productName: '活享储蓄计划-5年',
      company: '友邦保险',
      clientName: '茅中宇',
      amount: '$100,000 USD',
      date: '2025-04-28 14:28:45',
      referrer: '万承 (孟策)'
    },
    {
      id: 'B634335345',
      status: '冷静期过',
      statusType: 'expired',
      type: '港险',
      productName: '活享储蓄计划-5年',
      company: '友邦保险',
      clientName: '李明',
      amount: '$50,000 USD',
      date: '2025-03-15 09:30:20',
      referrer: '万承 (孟策)'
    }
  ];

  // 处理搜索
  const handleSearch = () => {
    if (!searchValue.trim()) {
      message.warning('请输入客户姓名');
      return;
    }
    
    const filtered = policyData.filter(policy => 
      policy.clientName.includes(searchValue.trim())
    );
    
    setFilteredPolicies(filtered);
    setShowSearchResults(true);
    
    if (filtered.length === 0) {
      message.info('未找到相关保单');
    }
  };

  // 清空搜索
  const handleClear = () => {
    setSearchValue('');
    setFilteredPolicies([]);
    setShowSearchResults(false);
  };

  // 按回车搜索
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const displayPolicies = showSearchResults ? filteredPolicies : policyData;

  return (
    <PoliciesContainer>
      {/* 固定顶部搜索栏 */}
      <SearchHeader>
        <SearchContainer>
          <SearchInput
            placeholder="请输入客户持有人姓名"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={handleKeyPress}
            prefix={<SearchOutlined />}
          />
          <SearchButton type="primary" onClick={handleSearch}>
            搜索
          </SearchButton>
          <ClearButton onClick={handleClear}>
            清空
          </ClearButton>
        </SearchContainer>
        <ResultsCount>
            {showSearchResults ? `${filteredPolicies.length} 条查询结果` : `${policyData.length} 条查询结果`}
        </ResultsCount>
      </SearchHeader>

      <ContentArea>
        {/* 搜索结果统计 */}
        {/* <ResultsHeader>
          <ResultsCount>
            {showSearchResults ? `${filteredPolicies.length} 条查询结果` : `${policyData.length} 条查询结果`}
          </ResultsCount>
          {showSearchResults && (
            <ClearFilters onClick={handleClear}>
              清空筛选条件
            </ClearFilters>
          )}
        </ResultsHeader> */}

        {/* 保单列表 */}
        <PoliciesList>
          {displayPolicies.map((policy) => (
            <PolicyCard key={policy.id} onClick={() => navigate(`/policies/${policy.id}`)}>
              <PolicyHeader>
                <PolicyId>{policy.id}</PolicyId>
                <StatusBadge statusType={policy.statusType}>
                  {policy.status}
                </StatusBadge>
              </PolicyHeader>
              
              <PolicyContent>
                <PolicyRow>
                  <TypeTag>{policy.type}</TypeTag>
                  <ProductName>{policy.productName}</ProductName>
                </PolicyRow>
                
                <PolicyRow>
                  <CompanyTag>{policy.company}</CompanyTag>
                  <ClientName>{policy.clientName}</ClientName>
                  <Amount>{policy.amount}</Amount>
                </PolicyRow>
              </PolicyContent>
              
              <PolicyFooter>
                <DateText>{policy.date}</DateText>
                <ReferrerText>转介人：{policy.referrer}</ReferrerText>
              </PolicyFooter>
            </PolicyCard>
          ))}
        </PoliciesList>
      </ContentArea>

      {/* 底部导航 */}
      <BottomNavigation>
        <NavItem onClick={() => navigate('/dashboard')}>
          <UserOutlined />
          <NavText>资料</NavText>
        </NavItem>
        <NavItem>
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
    </PoliciesContainer>
  );
};

// 样式组件
const PoliciesContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
`;

const SearchHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: white;
  padding: 20px 15px 15px;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  @media screen and (min-width: 768px) {
    max-width: 414px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const SearchTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const SearchInput = styled(Input)`
  flex: 1;
  height: 40px;
  border-radius: 8px;
  
  .ant-input {
    border-radius: 8px;
  }
`;

const SearchButton = styled(Button)`
  height: 40px;
  padding: 0 20px;
  border-radius: 8px;
  font-weight: 500;
`;

const ClearButton = styled(Button)`
  height: 40px;
  padding: 0 15px;
  border-radius: 8px;
  color: #666;
`;

const ContentArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-top: 120px;
  padding-bottom: 60px;
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #f5f5f5;
`;

const ResultsCount = styled.div`
  font-size: 14px;
  color: #333;
  font-weight: 500;
  margin-top: 10px;
`;

const PoliciesList = styled.div`
  padding: 0 15px;
`;

const PolicyCard = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const PolicyHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
`;

const PolicyId = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

const StatusBadge = styled.div`
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  
  ${props => {
    switch(props.statusType) {
      case 'processing':
        return `
          background-color: #e6f7ff;
          color: #1890ff;
          border: 1px solid #91d5ff;
        `;
      case 'active':
        return `
          background-color: #f6ffed;
          color: #52c41a;
          border: 1px solid #b7eb8f;
        `;
      case 'expired':
        return `
          background-color: #fff2f0;
          color: #ff4d4f;
          border: 1px solid #ffccc7;
        `;
      default:
        return `
          background-color: #f5f5f5;
          color: #666;
          border: 1px solid #d9d9d9;
        `;
    }
  }}
`;

const PolicyContent = styled.div`
  margin-bottom: 15px;
`;

const PolicyRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  flex-wrap: wrap;
  gap: 10px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const TypeTag = styled.span`
  background-color: #b91c1c;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
`;

const ProductName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  flex: 1;
`;

const CompanyTag = styled.span`
  background-color: #fef3c7;
  color: #d97706;
  padding: 2px 8px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
`;

const ClientName = styled.span`
  background-color: #dbeafe;
  color: #2563eb;
  padding: 2px 8px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
`;

const Amount = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-left: auto;
`;

const PolicyFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #999;
  padding-top: 10px;
  border-top: 1px solid #f0f0f0;
`;

const DateText = styled.div`
  color: #333;
`;

const ReferrerText = styled.div``;

const BottomNavigation = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  
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
  color: #999;
  font-size: 20px;
  cursor: pointer;
  transition: color 0.3s ease;
  
  &:hover {
    color: #2468F2;
  }
`;

const NavText = styled.div`
  font-size: 12px;
  margin-top: 4px;
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

export default PoliciesPage;