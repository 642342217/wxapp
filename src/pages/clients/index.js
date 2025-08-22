import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeftOutlined, RightOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../utils/api'

const ClientsPage = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // 加载客户数据
  const loadClients = useCallback(async (pageNum) => {
    setLoading(true);
    
    try {
      const params = {
        pageSize: "10",
        pageNum: (pageNum - 1).toString() // 转换为从0开始的页码
      };
      
      const response = await apiService.getCustomers(params);
      
      if (response.code === 0) {
        const { data } = response;
        const newClients = data.records || [];
        
        if (pageNum === 1) {
          setClients(newClients);
        } else {
          setClients(prev => [...prev, ...newClients]);
        }
        
        // 根据返回的数据判断是否还有更多
        setHasMore(newClients.length === 10);
      } else {
        console.error('获取客户列表失败:', response.msg);
      }
    } catch (error) {
      console.error('获取客户列表错误:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // 初始加载
  useEffect(() => {
    loadClients(1);
  }, [loadClients]);

  // 滚动加载更多
  const handleScroll = useCallback(() => {
    if (loading || !hasMore) return;
    
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || window.innerHeight;
    
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadClients(nextPage);
    }
  }, [loading, hasMore, page, loadClients]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);



  const handleClientClick = (client) => {
    // 跳转到客户详情页面
    navigate(`/clients/${client.id}`);
  };

  return (
    <ClientsContainer>
      <SubHeader>
        <HeaderTitle>我的客户</HeaderTitle>
        <SubTitle>客户来自预约单自动存入</SubTitle>
      </SubHeader>

      <ClientsList>
        {clients.map((client, index) => (
          <ClientItem key={client.id} onClick={() => handleClientClick(client)}>
            <ClientInfo>
              <ClientName>{client.name || client.customerName}</ClientName>
              {client.phone && <ClientPhone>{client.phone}</ClientPhone>}
            </ClientInfo>
            <ClientRight>
              <ClientGender>{{ 1: '男', 0: '女' }[client.gender]}</ClientGender>
              <ArrowIcon>
                <RightOutlined />
              </ArrowIcon>
            </ClientRight>
          </ClientItem>
        ))}
      </ClientsList>

      {loading && (
        <LoadingContainer>
          <LoadingText>加载中...</LoadingText>
        </LoadingContainer>
      )}

      {!hasMore && clients.length > 0 && (
        <NoMoreContainer>
          <NoMoreText>没有更多了</NoMoreText>
        </NoMoreContainer>
      )}
    </ClientsContainer>
  );
};

// 样式组件
const ClientsContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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

const SubHeader = styled.div`
  padding: 15px 20px;
  background-color: white;
  border-bottom: 1px solid #f0f0f0;
`;

const SubTitle = styled.div`
  font-size: 14px;
  color: #999;
`;

const ClientsList = styled.div`
  background-color: white;
  margin-top: 10px;
`;

const ClientItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #f8f9fa;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const ClientInfo = styled.div`
  flex: 1;
`;

const ClientName = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 5px;
`;

const ClientPhone = styled.div`
  font-size: 14px;
  color: #999;
`;

const ClientRight = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ClientGender = styled.div`
  font-size: 14px;
  color: #666;
`;

const ArrowIcon = styled.div`
  font-size: 14px;
  color: #ccc;
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

export default ClientsPage;