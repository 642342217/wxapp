import React from 'react';
import { ArrowLeftOutlined, RightOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

const ClientDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleBack = () => {
    navigate(-1);
  };

  // Mock客户详细数据
  const clientData = {
    name: '莫婉柠',
    englishName: '',
    idNumber: 'Y441012391',
    idAddress: '',
    entryDocType: '港澳通行证',
    docNumber: '',
    address: '',
    postcode: '',
    phone: '',
    nationality: '',
    birthDate: '',
    gender: '女',
    height: '',
    weight: '',
    smoking: '不吸烟',
    maritalStatus: '',
    education: '',
    email: '',
    companyName: '',
    companyAddress: '',
    monthlyIncome: '',
    monthlyExpense: '',
    liquidAssets: '',
    businessNature: '',
    position: '',
    workYears: ''
  };

  return (
    <DetailContainer>

      {/* 基本信息 */}
      <SectionCard>
        <SectionHeader>
          <SectionTitle>基本信息</SectionTitle>
        </SectionHeader>
        <SectionContent>
          <FormGrid>
            <FormRow>
              <FormLabel>中文姓名</FormLabel>
              <FormValue>{clientData.name || '莫婉柠'}</FormValue>
            </FormRow>
            <FormRow>
              <FormLabel>英文姓名</FormLabel>
              <FormValue placeholder>请输入客户英文姓名</FormValue>
            </FormRow>
            <FormRow>
              <FormLabel>身份证号码</FormLabel>
              <FormValue>{clientData.idNumber}</FormValue>
            </FormRow>
            <FormRow>
              <FormLabel>身份证地址</FormLabel>
              <FormValue placeholder>请输入身份证地址</FormValue>
            </FormRow>
            <FormRow>
              <FormLabel>入港证件类型</FormLabel>
              <FormValue hasArrow>{clientData.entryDocType} <RightOutlined /></FormValue>
            </FormRow>
            <FormRow>
              <FormLabel>证件号码</FormLabel>
              <FormValue placeholder>请输入证件号码</FormValue>
            </FormRow>
            <FormRow>
              <FormLabel>通讯地址</FormLabel>
              <FormValue placeholder>请输入通讯地址</FormValue>
            </FormRow>
            <FormRow>
              <FormLabel>邮编</FormLabel>
              <FormValue placeholder>请输入邮编</FormValue>
            </FormRow>
            <FormRow>
              <FormLabel>联系电话</FormLabel>
              <FormValue placeholder>请输入联系电话</FormValue>
            </FormRow>
            <FormRow>
              <FormLabel>国籍</FormLabel>
              <FormValue placeholder>请输入国籍</FormValue>
            </FormRow>
            <FormRow>
              <FormLabel>出生日期</FormLabel>
              <FormValue hasArrow placeholder>请选择出生日期 <RightOutlined /></FormValue>
            </FormRow>
            <FormRow>
              <FormLabel>性别</FormLabel>
              <FormValue hasArrow>{clientData.gender} <RightOutlined /></FormValue>
            </FormRow>
            <FormRow>
              <FormLabel>身高</FormLabel>
              <FormValue placeholder>请输入身高 CM</FormValue>
            </FormRow>
            <FormRow>
              <FormLabel>体重</FormLabel>
              <FormValue placeholder>请输入体重 KG</FormValue>
            </FormRow>
            <FormRow>
              <FormLabel>是否吸烟</FormLabel>
              <FormValue hasArrow>{clientData.smoking} <RightOutlined /></FormValue>
            </FormRow>
            <FormRow>
              <FormLabel>婚姻状况</FormLabel>
              <FormValue hasArrow placeholder>请选择婚姻状况 <RightOutlined /></FormValue>
            </FormRow>
            <FormRow>
              <FormLabel>教育程度</FormLabel>
              <FormValue hasArrow placeholder>请选择教育程度 <RightOutlined /></FormValue>
            </FormRow>
            <FormRow>
              <FormLabel>Email邮箱</FormLabel>
              <FormValue placeholder>请输入Email邮箱</FormValue>
            </FormRow>
          </FormGrid>
        </SectionContent>
      </SectionCard>

      {/* 职业及财务状况 */}
      <SectionCard>
        <SectionHeader>
          <SectionTitle>职业及财务状况</SectionTitle>
          <SectionSubtitle>* 18周岁以下客户人员无需主要填写</SectionSubtitle>
        </SectionHeader>
        <SectionContent>
          <FormGrid>
            <FormRow>
              <FormLabel>公司名称</FormLabel>
              <FormValue placeholder>请输入公司名称</FormValue>
            </FormRow>
            <FormRow>
              <FormLabel>公司地址</FormLabel>
              <FormValue placeholder>请输入公司地址</FormValue>
            </FormRow>
            <FormRow>
              <FormLabel>现每月收入</FormLabel>
              <FormValue placeholder>请输入现每月收入 HKD</FormValue>
            </FormRow>
            <FormRow>
              <FormLabel>现每月支出</FormLabel>
              <FormValue placeholder>请输入现每月支出 HKD</FormValue>
            </FormRow>
            <FormRow>
              <FormLabel>流动资产总额</FormLabel>
              <FormValue placeholder>请输入流动资产总额 HKD</FormValue>
            </FormRow>
            <FormRow>
              <FormLabel>公司业务性质</FormLabel>
              <FormValue placeholder>请输入公司业务性质</FormValue>
            </FormRow>
            <FormRow>
              <FormLabel>职位及职责</FormLabel>
              <FormValue placeholder>请输入职位及职责</FormValue>
            </FormRow>
            <FormRow>
              <FormLabel>现职工作年限</FormLabel>
              <FormValue placeholder>请输入现职工作年限</FormValue>
            </FormRow>
          </FormGrid>
        </SectionContent>
      </SectionCard>
    </DetailContainer>
  );
};

// 样式组件
const DetailContainer = styled.div`
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

const BackButton = styled.div`
  font-size: 20px;
  color: #333;
  cursor: pointer;
  padding: 5px;
`;

const HeaderTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

const SectionCard = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
`;

const SectionHeader = styled.div`
  padding: 15px 20px;
  border-bottom: 1px solid #f0f0f0;
  text-align: center;
`;

const SectionTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
`;

const SectionSubtitle = styled.div`
  font-size: 12px;
  color: #999;
`;

const SectionContent = styled.div`
  padding: 0;
`;

const FormGrid = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormRow = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const FormLabel = styled.div`
  width: 100px;
  font-size: 14px;
  color: #333;
  flex-shrink: 0;
`;

const FormValue = styled.div`
  flex: 1;
  font-size: 14px;
  color: ${props => props.placeholder ? '#ccc' : '#333'};
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 5px;
  
  ${props => props.hasArrow && `
    cursor: pointer;
  `}
`;

export default ClientDetailPage;