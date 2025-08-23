import React, { useState } from 'react';
import { ArrowLeftOutlined, FileTextOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../utils/api';

const AddAccountPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    supportCurrency: ['HKD'], // 默认选中HKD和USD
    accountName: '',
    changeReason: '',
    accountNumber: '',
    transferCode: '',
    swiftCode: '',
    bankName: '',
    bankAddress: ''
  });

  const [errors, setErrors] = useState({});

  const handleBack = () => {
    navigate('/accounts');
  };

  const handleCurrencyChange = (currency) => {
    console.log(currency, 'chjcccc',formData)
    setFormData(prev => ({
      ...prev,
      supportCurrency: prev.supportCurrency.includes(currency)
        ? prev.supportCurrency.filter(c => c !== currency)
        : [...prev.supportCurrency, currency]
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // 清除该字段的错误
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (formData.supportCurrency.length === 0) {
      newErrors.supportCurrency = '请选择支持币种';
    }
    
    if (!formData.accountName.trim()) {
      newErrors.accountName = '请填写账户名称';
    }
    
    if (!formData.changeReason.trim()) {
      newErrors.changeReason = '请填写更换账户原因';
    }
    
    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = '请填写账号';
    }
    
    if (!formData.swiftCode.trim()) {
      newErrors.swiftCode = '请填写SWIFT代码';
    }
    
    if (!formData.bankName.trim()) {
      newErrors.bankName = '请填写银行名称';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const submitData = {
        ...formData,
        supportCurrency: formData.supportCurrency.join(',')
      };
      
      const response = await apiService.addAccount(submitData);
      
      if (response.code === 0) {
        // 提交成功，返回列表页面
        navigate('/accounts');
      } else {
        alert(response.msg || '提交失败，请重试');
      }
    } catch (error) {
      console.error('提交银行账户错误:', error);
      alert('提交失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleViewAgreement = () => {
    // 查看协议文件的逻辑
    alert('查看协议文件功能待实现');
  };

  return (
    <AddAccountContainer>
      <Header>
        <BackButton onClick={handleBack}>
          <ArrowLeftOutlined />
        </BackButton>
        <HeaderTitle>收款银行账户信息详情</HeaderTitle>
      </Header>

      <FormContainer>
        <FormSection>
          <FormLabel required>支持币种</FormLabel>
          <CurrencyContainer>
            <CurrencyOption 
              selected={formData.supportCurrency.includes('HKD')}
              onClick={() => handleCurrencyChange('HKD')}
            >
              <CheckIcon selected={formData.supportCurrency.includes('HKD')}>✓</CheckIcon>
              HKD
            </CurrencyOption>
          </CurrencyContainer>
          {errors.supportCurrency && <ErrorText>{errors.supportCurrency}</ErrorText>}
        </FormSection>

        <FormSection>
          <FormLabel required>账户名称</FormLabel>
          <FormInput
            placeholder="请填写账户收款人户名"
            value={formData.accountName}
            onChange={(e) => handleInputChange('accountName', e.target.value)}
            $error={!!errors.accountName}
          />
          {errors.accountName && <ErrorText>{errors.accountName}</ErrorText>}
        </FormSection>

        <FormSection>
          <FormLabel required>更换账户原因</FormLabel>
          <FormTextArea
            placeholder="更换账户的原因简要说明"
            value={formData.changeReason}
            onChange={(e) => handleInputChange('changeReason', e.target.value)}
            $error={!!errors.changeReason}
          />
          {errors.changeReason && <ErrorText>{errors.changeReason}</ErrorText>}
        </FormSection>

        <FormSection>
          <FormLabel required>账号</FormLabel>
          <FormInput
            placeholder="请填写收款银行卡账号"
            value={formData.accountNumber}
            onChange={(e) => handleInputChange('accountNumber', e.target.value)}
            $error={!!errors.accountNumber}
          />
          {errors.accountNumber && <ErrorText>{errors.accountNumber}</ErrorText>}
        </FormSection>

        <FormSection>
          <FormLabel>转数快</FormLabel>
          <FormInput
            placeholder="请填写转数快账号（选填）"
            value={formData.transferCode}
            onChange={(e) => handleInputChange('transferCode', e.target.value)}
          />
        </FormSection>

        <FormSection>
          <FormLabel required>SWIFT代码</FormLabel>
          <FormInput
            placeholder="请输入SWIFT代码，例如:CHASUS333"
            value={formData.swiftCode}
            onChange={(e) => handleInputChange('swiftCode', e.target.value)}
            $error={!!errors.swiftCode}
          />
          {errors.swiftCode && <ErrorText>{errors.swiftCode}</ErrorText>}
        </FormSection>

        <FormSection>
          <FormLabel required>银行名称</FormLabel>
          <FormInput
            placeholder="请填写账户银行名称"
            value={formData.bankName}
            onChange={(e) => handleInputChange('bankName', e.target.value)}
            $error={!!errors.bankName}
          />
          {errors.bankName && <ErrorText>{errors.bankName}</ErrorText>}
        </FormSection>

        <FormSection>
          <FormLabel>银行地址</FormLabel>
          <FormInput
            placeholder="请填写银行地址（选填）"
            value={formData.bankAddress}
            onChange={(e) => handleInputChange('bankAddress', e.target.value)}
          />
        </FormSection>

        <AgreementSection>
          <AgreementButton onClick={handleViewAgreement}>
            <FileTextOutlined />
            查看协议文件
          </AgreementButton>
        </AgreementSection>

        <SubmitButton onClick={handleSubmit} disabled={loading}>
          {loading ? '提交中...' : '提交'}
        </SubmitButton>
      </FormContainer>
    </AddAccountContainer>
  );
};

// 样式组件
const AddAccountContainer = styled.div`
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
  margin-right: 15px;
  padding: 5px;
`;

const HeaderTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

const FormContainer = styled.div`
  padding: 20px;
`;

const FormSection = styled.div`
  margin-bottom: 25px;
`;

const FormLabel = styled.div`
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
  
  ${props => props.required && `
    &::before {
      content: '*';
      color: #ff4d4f;
      margin-right: 4px;
    }
  `}
`;

const FormInput = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid ${props => props.$error ? '#ff4d4f' : '#d9d9d9'};
  border-radius: 6px;
  font-size: 16px;
  background-color: white;
  
  &::placeholder {
    color: #bfbfbf;
  }
  
  &:focus {
    outline: none;
    border-color: #1890ff;
  }
`;

const FormTextArea = styled.textarea`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid ${props => props.$error ? '#ff4d4f' : '#d9d9d9'};
  border-radius: 6px;
  font-size: 16px;
  background-color: white;
  min-height: 80px;
  resize: vertical;
  
  &::placeholder {
    color: #bfbfbf;
  }
  
  &:focus {
    outline: none;
    border-color: #1890ff;
  }
`;

const CurrencyContainer = styled.div`
  display: flex;
  gap: 15px;
`;

const CurrencyOption = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 15px;
  border: 2px solid ${props => props.selected ? '#1890ff' : '#d9d9d9'};
  border-radius: 6px;
  cursor: pointer;
  background-color: ${props => props.selected ? '#e6f7ff' : 'white'};
  color: ${props => props.selected ? '#1890ff' : '#333'};
  font-weight: ${props => props.selected ? '500' : 'normal'};
  transition: all 0.2s ease;
`;

const CheckIcon = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.selected ? '#1890ff' : 'transparent'};
  border: 2px solid ${props => props.selected ? '#1890ff' : '#d9d9d9'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
`;

const ErrorText = styled.div`
  color: #ff4d4f;
  font-size: 14px;
  margin-top: 5px;
`;

const AgreementSection = styled.div`
  margin: 30px 0;
  text-align: center;
`;

const AgreementButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background-color: white;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  font-size: 16px;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #1890ff;
    color: #1890ff;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover:not(:disabled) {
    background-color: #40a9ff;
  }
  
  &:disabled {
    background-color: #d9d9d9;
    cursor: not-allowed;
  }
`;

export default AddAccountPage;