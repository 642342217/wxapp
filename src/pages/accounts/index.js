import React, { useState, useEffect, useCallback } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../utils/api';

const AccountsPage = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // 加载银行账户数据
  const loadAccounts = useCallback(async (pageNum) => {
    setLoading(true);
    
    try {
      const params = {
        pageSize: "10",
        pageNum: (pageNum - 1).toString()
      };
      
      const response = await apiService.getAccounts(params);
      
      if (response.code === 0) {
        const { data } = response;
        const newAccounts = data.records || [];
        
        if (pageNum === 1) {
          setAccounts(newAccounts);
        } else {
          setAccounts(prev => [...prev, ...newAccounts]);
        }
        
        setHasMore(newAccounts.length === 10);
      } else {
        console.error('获取银行账户列表失败:', response.msg);
      }
    } catch (error) {
      console.error('获取银行账户列表错误:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // 初始加载
  useEffect(() => {
    loadAccounts(1);
  }, [loadAccounts]);

  // 滚动加载更多
  const handleScroll = useCallback(() => {
    if (loading || !hasMore) return;
    
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || window.innerHeight;
    
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadAccounts(nextPage);
    }
  }, [loading, hasMore, page, loadAccounts]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleAddAccount = () => {
    navigate('/accounts/add');
  };

  const getStatusText = (status) => {
    return status === 1 ? '激活' : '失效';
  };

  const getStatusColor = (status) => {
    return status === 1 ? '#52c41a' : '#ff4d4f';
  };

  return (
    <AccountsContainer>
      <Header>
        <HeaderTitle>我的收款银行账户</HeaderTitle>
        <AddButton onClick={handleAddAccount}>
          <PlusOutlined />
          新增收款账户
        </AddButton>
      </Header>

      <AccountsList>
        {accounts.map((account, index) => (
          <AccountItem key={account.id || index}>
            <AccountHeader>
              <BankName>{account.bankName}</BankName>
              <Status color={getStatusColor(account.status)}>
                {getStatusText(account.status)}
              </Status>
            </AccountHeader>
            
            <AccountNumber>{account.accountNumber}</AccountNumber>
            <AccountName>{account.accountName}</AccountName>
            
            <CurrencyTags>
              {account.supportCurrency && account.supportCurrency.split(',').map((currency, idx) => (
                <CurrencyTag key={idx} currency={currency.trim()}>
                  {currency.trim()}
                </CurrencyTag>
              ))}
            </CurrencyTags>
          </AccountItem>
        ))}
      </AccountsList>

      {loading && (
        <LoadingContainer>
          <LoadingText>加载中...</LoadingText>
        </LoadingContainer>
      )}

      {!hasMore && accounts.length > 0 && (
        <NoMoreContainer>
          <NoMoreText>没有更多了</NoMoreText>
        </NoMoreContainer>
      )}
    </AccountsContainer>
  );
};

// 样式组件
const AccountsContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 16px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #40a9ff;
  }
`;

const AccountsList = styled.div`
  padding: 10px;
`;

const AccountItem = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const AccountHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const BankName = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;

const Status = styled.div`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  color: white;
  background-color: ${props => props.color};
`;

const AccountNumber = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  letter-spacing: 1px;
`;

const AccountName = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
`;

const CurrencyTags = styled.div`
  display: flex;
  gap: 8px;
`;

const CurrencyTag = styled.div`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  color: white;
  background-color: ${props => props.currency === 'HKD' ? '#ff4d4f' : '#1890ff'};
`;

const LoadingContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const LoadingText = styled.div`
  font-size: 14px;
  color: #999;
`;

const NoMoreContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const NoMoreText = styled.div`
  font-size: 14px;
  color: #999;
`;

export default AccountsPage;