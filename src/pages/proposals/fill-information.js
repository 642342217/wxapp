import React, { useState, useEffect } from 'react';
import { Button, Input, Radio, Select, message, DatePicker } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { apiService } from '../../utils/api';
import moment from 'moment';

const { Option } = Select;

const FillInformationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedProduct = location.state?.selectedProduct;

  const [formConfig, setFormConfig] = useState([]);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  // 获取表单配置
  useEffect(() => {
    const fetchFormConfig = async () => {
      try {
        setLoading(true);
        // 这里需要传入实际的 SKU ID，暂时使用示例参数
        const response = await apiService.getSkuConfig({ skuId: selectedProduct?.id || 1 });
        
        if (response.code === 0 && response.data?.respData) {
          setFormConfig(response.data.respData);
          
          // 初始化表单数据
          const initialData = {};
          response.data.respData.forEach(section => {
            section.fields.forEach(field => {
              initialData[`${section.code}_${field.name}`] = field.value || '';
            });
          });
          setFormData(initialData);
        }
      } catch (error) {
        console.error('获取表单配置失败:', error);
        message.error('获取表单配置失败');
      } finally {
        setLoading(false);
      }
    };

    fetchFormConfig();
  }, [selectedProduct]);

  const handleInputChange = (fieldKey, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldKey]: value
    }));
  };

  // 渲染不同类型的表单字段
  const renderField = (field, sectionCode) => {
    const fieldKey = `${sectionCode}_${field.name}`;
    const fieldValue = formData[fieldKey];

    if (!field.canEdit) {
      return (
        <InfoRow key={fieldKey}>
          <InfoLabel>{field.label}</InfoLabel>
          <InfoValue>{field.value}</InfoValue>
        </InfoRow>
      );
    }

    switch (field.type) {
      case 'input':
        return (
          <FormRow key={fieldKey}>
            <FormLabel required={field.required}>{field.label}</FormLabel>
            <FormInput
              placeholder={field.placeholder}
              value={fieldValue}
              onChange={(e) => handleInputChange(fieldKey, e.target.value)}
            />
          </FormRow>
        );

      case 'number':
        return (
          <FormRow key={fieldKey}>
            <FormLabel required={field.required}>{field.label}</FormLabel>
            <FormInput
              type="number"
              placeholder={field.placeholder}
              value={fieldValue}
              onChange={(e) => handleInputChange(fieldKey, e.target.value)}
            />
          </FormRow>
        );

      case 'select':
        return (
          <FormRow key={fieldKey}>
            <FormLabel required={field.required}>{field.label}</FormLabel>
            <Select
              placeholder={field.placeholder}
              style={{ width: '100%' }}
              value={fieldValue}
              onChange={(value) => handleInputChange(fieldKey, value)}
            >
              {field.options?.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.name}
                </Option>
              ))}
            </Select>
          </FormRow>
        );

      case 'radio':
        return (
          <InfoRow key={fieldKey}>
            <InfoLabel>{field.label}</InfoLabel>
            <CurrencyContainer>
              <Radio.Group 
                value={fieldValue}
                onChange={(e) => handleInputChange(fieldKey, e.target.value)}
              >
                {field.options?.map(option => (
                  <Radio key={option} value={option}>{option}</Radio>
                ))}
              </Radio.Group>
            </CurrencyContainer>
          </InfoRow>
        );

      case 'date':
        return (
          <FormRow key={fieldKey}>
            <FormLabel required={field.required}>{field.label}</FormLabel>
            <DatePicker
              style={{ width: '100%' }}
              placeholder={field.placeholder}
              value={fieldValue ? moment(fieldValue) : null}
              onChange={(date) => handleInputChange(fieldKey, date ? date.format('YYYY-MM-DD') : '')}
            />
          </FormRow>
        );

      default:
        return null;
    }
  };

  const handleSubmit = () => {
    // 验证必填字段
    const requiredFields = [];
    formConfig.forEach(section => {
      section.fields.forEach(field => {
        if (field.required && field.canEdit) {
          const fieldKey = `${section.code}_${field.name}`;
          if (!formData[fieldKey]) {
            requiredFields.push(field.label);
          }
        }
      });
    });

    if (requiredFields.length > 0) {
      message.error(`请填写完整信息: ${requiredFields.join(', ')}`);
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

  if (loading) {
    return (
      <Container>
        <div style={{ textAlign: 'center', padding: '50px' }}>加载中...</div>
      </Container>
    );
  }

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
        {formConfig.map((section) => (
          <SectionCard key={section.code}>
            <SectionTitle>{section.title}</SectionTitle>
            {section.fields.map(field => renderField(field, section.code))}
          </SectionCard>
        ))}
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