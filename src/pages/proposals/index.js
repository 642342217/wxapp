import React, { useState } from 'react';
import { Button, message } from 'antd';
import { PlusOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ProposalsPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // 建议书数据，严格按照图片内容
  const proposalData = [
    {
      id: 1,
      title: '环宇盈活储蓄保险计划-5年',
      insured: 'Valued Client / 女 / 40岁',
      premium: '$20,000 USD',
      status: '已成功',
      statusType: 'success',
      date: '2025-07-15 16:29:16',
      pdfUrl: 'https://example.com/api/pdf/1'
    },
    {
      id: 2,
      title: '环宇盈活储蓄保险计划-5年',
      insured: 'Valued Client / 女 / 40岁',
      premium: '$20,000 USD',
      status: '已成功',
      statusType: 'success',
      date: '2025-07-15 16:28:20',
      pdfUrl: 'https://example.com/api/pdf/2'
    },
    {
      id: 3,
      title: '环宇盈活储蓄保险计划-5年',
      insured: 'Valued Client / 女 / 40岁',
      premium: '$30,000 USD',
      status: '失败',
      statusType: 'failed',
      date: '2025-07-15 16:27:13',
      pdfUrl: 'https://example.com/api/pdf/3'
    },
    {
      id: 4,
      title: '环宇盈活储蓄保险计划-5年',
      insured: 'Valued Client / 女 / 40岁',
      premium: '$30,000 USD',
      status: '已成功',
      statusType: 'success',
      date: '2025-07-15 16:26:24',
      pdfUrl: 'https://example.com/api/pdf/4'
    },
    {
      id: 5,
      title: '环宇盈活储蓄保险计划-5年',
      insured: 'Valued Client / 女 / 40岁',
      premium: '$30,000 USD',
      status: '已成功',
      statusType: 'success',
      date: '2025-07-15 16:25:30',
      pdfUrl: 'https://example.com/api/pdf/5'
    }
  ];

  // 处理PDF下载
  const handleDownloadPDF = async (proposal) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/proposals/${proposal.id}/pdf`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${proposal.title}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        message.success('PDF下载成功');
      } else {
        window.open(proposal.pdfUrl, '_blank');
        message.success('PDF已在新窗口打开');
      }
    } catch (error) {
      console.error('下载PDF失败:', error);
      window.open(proposal.pdfUrl, '_blank');
      message.info('PDF已在新窗口打开');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    message.info('跳转到新建建议书页面');
  };

  return (
    <ProposalsContainer>
      <ContentArea>
        {/* 顶部新建按钮 */}
        <CreateButtonContainer>
          <CreateButton 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={handleCreateNew}
            size="large"
          >
            新建建议书
          </CreateButton>
        </CreateButtonContainer>

        {/* 建议书列表 */}
        <ProposalsList>
          {proposalData.map((proposal) => (
            <ProposalCard 
              key={proposal.id}
              onClick={() => handleDownloadPDF(proposal)}
              disabled={loading}
            >
              <CardHeader>
                <ProposalTitle>{proposal.title}</ProposalTitle>
                <StatusBadge statusType={proposal.statusType}>
                  {proposal.status}
                </StatusBadge>
              </CardHeader>
              
              <CardContent>
                <InfoRow>
                  <InfoLabel>受保人：</InfoLabel>
                  <InfoValue>{proposal.insured}</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>年缴保费：</InfoLabel>
                  <InfoValue>{proposal.premium}</InfoValue>
                </InfoRow>
              </CardContent>
              
              <CardFooter>
                <DateText>{proposal.date}</DateText>
              </CardFooter>
            </ProposalCard>
          ))}
        </ProposalsList>
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
    </ProposalsContainer>
  );
};

// 样式组件
const ProposalsContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ContentArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-top: 90px;
  padding-bottom: 60px;
`;

const CreateButtonContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 20px 15px 0;
  background-color: #f5f5f5;
  z-index: 1000;
  // box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  @media screen and (min-width: 768px) {
    max-width: 414px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const CreateButton = styled(Button)`
  width: 100%;
  height: 50px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  background: linear-gradient(135deg, #2468F2 0%, #1890ff 100%);
  border: none;
  box-shadow: 0 4px 12px rgba(36, 104, 242, 0.3);
  
  &:hover {
    background: linear-gradient(135deg, #1890ff 0%, #2468F2 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(36, 104, 242, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const ProposalsList = styled.div`
  padding: 0 15px 20px;
`;

const ProposalCard = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
`;

const ProposalTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  line-height: 1.4;
  flex: 1;
  margin-right: 15px;
`;

const StatusBadge = styled.div`
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  
  ${props => props.statusType === 'success' ? `
    background-color: #f6ffed;
    color: #52c41a;
    border: 1px solid #b7eb8f;
  ` : `
    background-color: #fff2f0;
    color: #ff4d4f;
    border: 1px solid #ffccc7;
  `}
`;

const CardContent = styled.div`
  margin-bottom: 15px;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoLabel = styled.span`
  font-size: 14px;
  color: #666;
  margin-right: 8px;
  min-width: 80px;
`;

const InfoValue = styled.span`
  font-size: 14px;
  color: #333;
  font-weight: 500;
`;

const CardFooter = styled.div`
  border-top: 1px solid #f0f0f0;
  padding-top: 12px;
`;

const DateText = styled.div`
  font-size: 12px;
  color: #999;
`;



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

export default ProposalsPage;