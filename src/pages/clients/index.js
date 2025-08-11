import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeftOutlined, RightOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ClientsPage = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // Mock客户数据
  const mockClients = [
    { id: 1, name: '莫婉柠', phone: '', gender: '女' },
    { id: 2, name: '袁泳琳', phone: '13532302366', gender: '女' },
    { id: 3, name: '曹师嘉', phone: '19986918688', gender: '男' },
    { id: 4, name: '傅凯佳', phone: '18028937823', gender: '男' },
    { id: 5, name: '茅中宇', phone: '852 62197169', gender: '男' },
    { id: 6, name: '徐迪青', phone: '852 97904761', gender: '男' },
    { id: 7, name: '袁泳琳', phone: '13532302366', gender: '女' },
    { id: 8, name: '陆治良', phone: '13989398965', gender: '男' },
    { id: 9, name: '王静贤', phone: '13185911179', gender: '女' },
    { id: 10, name: '李明华', phone: '13800138000', gender: '男' },
    { id: 11, name: '张小红', phone: '13900139000', gender: '女' },
    { id: 12, name: '王大强', phone: '13700137000', gender: '男' },
    { id: 13, name: '刘美丽', phone: '13600136000', gender: '女' },
    { id: 14, name: '陈建国', phone: '13500135000', gender: '男' },
    { id: 15, name: '赵雅芳', phone: '13400134000', gender: '女' },
    { id: 16, name: '孙志强', phone: '13300133000', gender: '男' },
    { id: 17, name: '周慧敏', phone: '13200132000', gender: '女' },
    { id: 18, name: '吴建华', phone: '13100131000', gender: '男' },
    { id: 19, name: '郑小燕', phone: '13000130000', gender: '女' },
    { id: 20, name: '冯大伟', phone: '12900129000', gender: '男' },
    { id: 21, name: '何美玲', phone: '12800128000', gender: '女' },
    { id: 22, name: '韩志明', phone: '12700127000', gender: '男' },
    { id: 23, name: '曹丽娜', phone: '12600126000', gender: '女' },
    { id: 24, name: '邓建军', phone: '12500125000', gender: '男' },
    { id: 25, name: '许雅琴', phone: '12400124000', gender: '女' },
    { id: 26, name: '蒋大明', phone: '12300123000', gender: '男' },
    { id: 27, name: '沈小丽', phone: '12200122000', gender: '女' },
    { id: 28, name: '韩志华', phone: '12100121000', gender: '男' },
    { id: 29, name: '钱美红', phone: '12000120000', gender: '女' },
    { id: 30, name: '孙建国', phone: '11900119000', gender: '男' },
    { id: 31, name: '李雅芳', phone: '11800118000', gender: '女' },
    { id: 32, name: '张志强', phone: '11700117000', gender: '男' },
    { id: 33, name: '王慧敏', phone: '11600116000', gender: '女' }
  ];

  // 模拟API加载数据
  const loadClients = useCallback(async (pageNum) => {
    setLoading(true);
    
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const pageSize = 10;
    const startIndex = (pageNum - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const newClients = mockClients.slice(startIndex, endIndex);
    
    if (pageNum === 1) {
      setClients(newClients);
    } else {
      setClients(prev => [...prev, ...newClients]);
    }
    
    setHasMore(endIndex < mockClients.length);
    setLoading(false);
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
    // 可以跳转到客户详情页面
    console.log('点击客户:', client);
  };

  return (
    <ClientsContainer>
      <SubHeader>
        <HeaderTitle>我的客户 ({mockClients.length})</HeaderTitle>
        <SubTitle>客户来自预约单自动存入</SubTitle>
      </SubHeader>

      <ClientsList>
        {clients.map((client, index) => (
          <ClientItem key={`${client.id}-${index}`} onClick={() => handleClientClick(client)}>
            <ClientInfo>
              <ClientName>{client.name}</ClientName>
              {client.phone && <ClientPhone>{client.phone}</ClientPhone>}
            </ClientInfo>
            <ClientRight>
              <ClientGender>{client.gender}</ClientGender>
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