import React, { useState } from 'react';
import { Button, Input, Radio, Select, message } from 'antd';
import { ArrowLeftOutlined, CheckOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

const { Option } = Select;

const FillInformationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedProduct = location.state?.selectedProduct;

  const [formData, setFormData] = useState({
    annualPremium: '',
    beneficiaryName: 'Valued Client',
    gender: '',
    smoking: '',
    residence: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // 验证必填字段
    if (!formData.annualPremium || !formData.gender || !formData.smoking || !formData.residence) {
      message.error('请填写完整信息');
      return;
    }
    
    message.success('信息提交成功');
    // 跳转到制作页面
    navigate('/proposals/create', { 
      state: { 
        selectedProduct,
        formData 
      } 
    });
  };

  const handleBack = () => {
    navigate('/proposals/product-selection');
  };

  return (
    <Container>
      {/* 步骤指示器 */}
      <StepsContainer>
        <StepItem>
          <StepIcon completed>
            <CheckOutlined />
          </StepIcon>
          <StepText completed>选择产品</StepText>
        </StepItem>
        <StepLine completed />
        <StepItem>
          <StepIcon active>
            <CheckOutlined />
          </StepIcon>
          <StepText active>填写信息</StepText>
        </StepItem>
        <StepLine />
        <StepItem>
          <StepIcon>3</StepIcon>
          <StepText>制作</StepText>
        </StepItem>
      </StepsContainer>

      {/* 主要内容区域 */}
      <ContentArea>
        {/* 产品信息 */}
        <SectionCard>
          <SectionTitle>产品信息</SectionTitle>
          
          <InfoRow>
            <InfoLabel>保司</InfoLabel>
            <InfoValue>友邦（香港）</InfoValue>
          </InfoRow>
          
          <InfoRow>
            <InfoLabel>产品名称</InfoLabel>
            <InfoValue>环宇盈活储蓄保险计划-1年</InfoValue>
          </InfoRow>
          
          <InfoRow>
            <InfoLabel>年期</InfoLabel>
            <InfoValue>1年</InfoValue>
          </InfoRow>
          
          <InfoRow>
            <InfoLabel>货币单位</InfoLabel>
            <CurrencyContainer>
              <Radio.Group defaultValue="USD">
                <Radio value="USD">USD</Radio>
                <Radio value="HKD">HKD</Radio>
              </Radio.Group>
            </CurrencyContainer>
          </InfoRow>
          
          <InfoRow>
            <InfoLabel>年缴保费/保额</InfoLabel>
            <InfoValue>年缴保费 ></InfoValue>
          </InfoRow>
          
          <FormRow>
            <FormLabel required>年缴保费</FormLabel>
            <FormInput
              placeholder="请输入金额"
              value={formData.annualPremium}
              onChange={(e) => handleInputChange('annualPremium', e.target.value)}
            />
          </FormRow>
        </SectionCard>

        {/* 受保人信息 */}
        <SectionCard>
          <SectionTitle>受保人信息</SectionTitle>
          
          <InfoRow>
            <InfoLabel>姓名</InfoLabel>
            <InfoValue>Valued Client</InfoValue>
          </InfoRow>
          
          <FormRow>
            <FormLabel required>性别</FormLabel>
            <Select
              placeholder="请选择性别"
              style={{ width: '100%' }}
              value={formData.gender}
              onChange={(value) => handleInputChange('gender', value)}
            >
              <Option value="male">男</Option>
              <Option value="female">女</Option>
            </Select>
          </FormRow>
          
          <FormRow>
            <FormLabel required>是否吸烟</FormLabel>
            <Select
              placeholder="请选择是否吸烟"
              style={{ width: '100%' }}
              value={formData.smoking}
              onChange={(value) => handleInputChange('smoking', value)}
            >
              <Option value="no">否</Option>
              <Option value="yes">是</Option>
            </Select>
          </FormRow>
          
          <FormRow>
            <FormLabel required>居住地</FormLabel>
            <Select
              placeholder="请选择居住地"
              style={{ width: '100%' }}
              value={formData.residence}
              onChange={(value) => handleInputChange('residence', value)}
            >
              <Option value="hongkong">香港</Option>
              <Option value="mainland">中国大陆</Option>
              <Option value="other">其他</Option>
            </Select>
          </FormRow>
        </SectionCard>
      </ContentArea>

      {/* 底部按钮 */}
      <BottomButton>
        <SubmitButton type="primary" onClick={handleSubmit}>
          提交
        </SubmitButton>
      </BottomButton>
      
      {/* 制作提示 */}
      <TipText>您今日已经制作 1/12 份建议书</TipText>
    </Container>
  );
};

// 样式组件
const Container = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 120px;
`;

const StepsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: white;
  margin-bottom: 10px;
`;

const StepItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StepIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  
  ${props => {
    if (props.active) {
      return `
        background-color: #2468F2;
        color: white;
      `;
    } else if (props.completed) {
      return `
        background-color: #52c41a;
        color: white;
      `;
    } else {
      return `
        background-color: #f0f0f0;
        color: #999;
      `;
    }
  }}
`;

const StepText = styled.div`
  font-size: 12px;
  font-weight: ${props => (props.active || props.completed) ? '600' : '400'};
  color: ${props => {
    if (props.active) return '#2468F2';
    if (props.completed) return '#52c41a';
    return '#999';
  }};
`;

const StepLine = styled.div`
  width: 60px;
  height: 2px;
  margin: 0 20px 20px;
  background-color: ${props => props.completed ? '#52c41a' : '#f0f0f0'};
`;

const ContentArea = styled.div`
  padding: 0 20px;
`;

const SectionCard = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 15px;
`;

const SectionTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  padding-left: 10px;
  border-left: 4px solid #2468F2;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const InfoLabel = styled.div`
  font-size: 16px;
  color: #666;
`;

const InfoValue = styled.div`
  font-size: 16px;
  color: #333;
  font-weight: 500;
`;

const CurrencyContainer = styled.div`
  .ant-radio-group {
    .ant-radio-wrapper {
      margin-right: 20px;
    }
    
    .ant-radio-checked .ant-radio-inner {
      border-color: #2468F2;
      background-color: #2468F2;
    }
  }
`;

const FormRow = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.div`
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
  
  ${props => props.required && `
    &::before {
      content: '*';
      color: #ff4d4f;
      margin-right: 4px;
    }
  `}
`;

const FormInput = styled(Input)`
  height: 44px;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
  font-size: 16px;
  
  &:focus {
    border-color: #2468F2;
    box-shadow: 0 0 0 2px rgba(36, 104, 242, 0.2);
  }
`;

const BottomButton = styled.div`
  position: fixed;
  bottom: 60px;
  left: 0;
  right: 0;
  padding: 0 20px;
  display: flex;
  justify-content: center;
  
  @media screen and (min-width: 768px) {
    max-width: 414px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const SubmitButton = styled(Button)`
  width: 100%;
  max-width: 350px;
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
`;

const TipText = styled.div`
  position: fixed;
  bottom: 20px;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 14px;
  color: #999;
  
  @media screen and (min-width: 768px) {
    max-width: 414px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export default FillInformationPage;