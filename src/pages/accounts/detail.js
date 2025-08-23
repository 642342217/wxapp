import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Dialog } from 'antd-mobile';
import styled from 'styled-components';

const AccountDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [account, setAccount] = useState(null);

  useEffect(() => {
    // 从路由state中获取账户信息
    if (location.state && location.state.account) {
      setAccount(location.state.account);
    }
  }, [location.state]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleModifyAccount = () => {
    Dialog.show({
      title: '修改提示',
      content: (
        <div>
          <div style={{ 
            fontSize: '16px', 
            color: '#333', 
            lineHeight: '1.5', 
            marginBottom: '30px' 
          }}>
            如果您要修改收款账户信息，请重新申请新账户。审批成功后，信息将更新
          </div>
          <div style={{ 
            display: 'flex', 
            gap: '15px' 
          }}>
            <button
              style={{
                flex: 1,
                padding: '12px',
                backgroundColor: '#f5f5f5',
                color: '#333',
                border: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                cursor: 'pointer'
              }}
              onClick={() => {
                Dialog.clear();
              }}
            >
              知道了
            </button>
            <button
              style={{
                flex: 1,
                padding: '12px',
                backgroundColor: '#1890ff',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                cursor: 'pointer'
              }}
              onClick={() => {
                Dialog.clear();
                navigate('/accounts/add');
              }}
            >
              新增账户
            </button>
          </div>
        </div>
      ),
      closeOnAction: false,
      actions: []
    });
  };

  const getStatusText = (status) => {
    return status === 1 ? '激活' : '失效';
  };

  const getStatusColor = (status) => {
    return status === 1 ? '#52c41a' : '#ff4d4f';
  };

  const getStatusBgColor = (status) => {
    return status === 1 ? '#f6ffed' : '#fff2f0';
  };

  const getStatusDescription = (status) => {
    return status === 1 ? '已激活的收款银行账户' : '该账户已经失效，可以申请新的银行账户';
  };

  const formatDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return '';
    const date = new Date(dateTimeStr);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  if (!account) {
    return (
      <Container>
        <Header>
          <BackButton onClick={handleBack}>
            <ArrowLeftOutlined />
          </BackButton>
          <Title>详情</Title>
        </Header>
        <LoadingText>加载中...</LoadingText>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        {/* <BackButton onClick={handleBack}>
          <ArrowLeftOutlined />
        </BackButton> */}
        <Title>详情</Title>
      </Header>

      <Content>
        <DetailSection>
          <SectionTitle>支持币种</SectionTitle>
          <CurrencyContainer>
            <CurrencyTag active>HKD</CurrencyTag>
          </CurrencyContainer>
        </DetailSection>

        <DetailSection>
          <SectionTitle>收款账户状态</SectionTitle>
          <StatusContainer>
            <StatusBadge 
              color={getStatusColor(account.status)}
              bgColor={getStatusBgColor(account.status)}
            >
              {getStatusText(account.status)}
            </StatusBadge>
            <StatusDescription>
              {getStatusDescription(account.status)}
            </StatusDescription>
          </StatusContainer>
        </DetailSection>

        <DetailSection>
          <SectionTitle>账户名称</SectionTitle>
          <DetailValue>{account.account}</DetailValue>
        </DetailSection>

        {/* <DetailSection>
          <SectionTitle>账号</SectionTitle>
          <DetailValue>{account.fastNum}</DetailValue>
        </DetailSection> */}

        <DetailSection>
          <SectionTitle>银行名称</SectionTitle>
          <DetailValue>{account.bank}</DetailValue>
        </DetailSection>

        {/* <DetailSection>
          <SectionTitle>银行地址</SectionTitle>
          <DetailValue>未填写</DetailValue>
        </DetailSection> */}

        {/* <DetailSection>
          <SectionTitle>SWIFT代码</SectionTitle>
          <DetailValue>{account.swiftCode || 'AABLHKHH'}</DetailValue>
        </DetailSection> */}

        <DetailSection>
          <SectionTitle>转数快</SectionTitle>
          <DetailValue>{account.fastNum}</DetailValue>
        </DetailSection>

        <DetailSection>
          <SectionTitle>创建时间</SectionTitle>
          <DetailValue>{formatDateTime(account.createTime)}</DetailValue>
        </DetailSection>

        {/* {account.status !== 1 && (
          <DetailSection>
            <SectionTitle>修改原因</SectionTitle>
            <DetailValue>上个账户不用了</DetailValue>
          </DetailSection>
        )} */}

        {/* <DetailSection>
          <SectionTitle>协议文件</SectionTitle>
          <LinkText>查看协议文件</LinkText>
        </DetailSection> */}
      </Content>

      <BottomButton onClick={handleModifyAccount}>
        修改账户信息
      </BottomButton>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  color: #333;
  cursor: pointer;
  padding: 5px;
  margin-right: 15px;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

const Content = styled.div`
  padding: 20px;
`;

const DetailSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  min-height: 24px;
`;

const SectionTitle = styled.div`
  font-size: 16px;
  color: #333;
  font-weight: 500;
  flex-shrink: 0;
`;

const DetailValue = styled.div`
  font-size: 16px;
  color: #666;
  text-align: right;
  flex: 1;
  margin-left: 20px;
`;

const CurrencyContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const CurrencyTag = styled.div`
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  background-color: ${props => props.active ? '#ff4d4f' : '#1890ff'};
  color: white;
`;

const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const StatusBadge = styled.div`
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.color};
  background-color: ${props => props.bgColor};
  margin-bottom: 5px;
`;

const StatusDescription = styled.div`
  font-size: 14px;
  color: #999;
  text-align: right;
`;

const LinkText = styled.div`
  font-size: 16px;
  color: #1890ff;
  text-align: right;
  cursor: pointer;
  text-decoration: underline;
`;

const BottomButton = styled.button`
  width: calc(100% - 40px);
  margin: 20px;
  padding: 15px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background-color: #40a9ff;
  }
`;

const LoadingText = styled.div`
  padding: 50px 20px;
  text-align: center;
  font-size: 16px;
  color: #999;
`;



export default AccountDetailPage;