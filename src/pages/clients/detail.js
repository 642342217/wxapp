import React, { useEffect, useState } from 'react';
import { ArrowLeftOutlined, RightOutlined } from '@ant-design/icons';
import { message } from 'antd';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { apiService } from '../../utils/api'


const ClientDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [clientData, setClientData] = useState({});

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    apiService.getCustomerDetail({ customId: id })
      .then(res => {
        console.log(res, 'chjrrr')
        const { code, data: { customBaseInfo, customWorkInfo } } = res || {};
        if (res.code === 0) {
          setClientData({ customBaseInfo, customWorkInfo });
        }
      })
      .catch(err => {
        message.error("网络错误，请刷新重试")
      })
  }, [])

  // 格式化日期
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN');
  };

  // 性别映射
  const getGenderText = (gender) => {
    const genderMap = { 1: '男', 2: '女' };
    return genderMap[gender] || '';
  };

  // 吸烟状态映射
  const getSmokeText = (smoke) => {
    const smokeMap = { 1: '吸烟', 0: '不吸烟' };
    return smokeMap[smoke] || '';
  };

  // 学历映射
  const getDegreeText = (degree) => {
    const degreeMap = { 
      0: '大专或以上', 1: '中学', 2: '小学或以下'
    };
    return degreeMap[degree] || '';
  };

  // 婚姻状况映射
  const getMaritalStatusText = (maritalStatus) => {
    const maritalMap = { 0: '未婚', 1: '已婚', 2: '离异', 3: '丧偶' };
    return maritalMap[maritalStatus] || '';
  };

  // Mock客户详细数据
  // const clientData = {
  //   name: '莫婉柠',
  //   englishName: '',
  //   idNumber: 'Y441012391',
  //   idAddress: '',
  //   entryDocType: '港澳通行证',
  //   docNumber: '',
  //   address: '',
  //   postcode: '',
  //   phone: '',
  //   nationality: '',
  //   birthDate: '',
  //   gender: '女',
  //   height: '',
  //   weight: '',
  //   smoking: '不吸烟',
  //   maritalStatus: '',
  //   education: '',
  //   email: '',
  //   companyName: '',
  //   companyAddress: '',
  //   monthlyIncome: '',
  //   monthlyExpense: '',
  //   liquidAssets: '',
  //   businessNature: '',
  //   position: '',
  //   workYears: ''
  // };

  // 判断是否有值
  const hasValue = (value) => {
    return value !== null && value !== undefined && value !== '';
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
              <FormValue placeholder={!hasValue(clientData.customBaseInfo?.name)}>{clientData.customBaseInfo?.name || '请输入中文姓名'}</FormValue>
            </FormRow>
            <FormRow>
              <FormLabel>英文姓名</FormLabel>
              <FormValue placeholder={!hasValue(clientData.customBaseInfo?.nameEn)}>{clientData.customBaseInfo?.nameEn || '请输入客户英文姓名'}</FormValue>
            </FormRow>
            <FormRow>
              <FormLabel>身份证号码</FormLabel>
              <FormValue placeholder={!hasValue(clientData.customBaseInfo?.number)}>{clientData.customBaseInfo?.number || '请输入身份证号码'}</FormValue>
            </FormRow>
            <FormRow>
              <FormLabel>身份证地址</FormLabel>
              <FormValue placeholder={!hasValue(clientData.customBaseInfo?.address)}>{clientData.customBaseInfo?.address || '请输入身份证地址'}</FormValue>
            </FormRow>
            <FormRow>
              <FormLabel>入港证件类型</FormLabel>
              <FormValue hasArrow>{{ 1: '港澳通行证', 2: '护照'}[clientData.customBaseInfo?.hkType] || "请选择入港证件类型"} <RightOutlined /></FormValue>
            </FormRow>
            <FormRow>
              <FormLabel>证件号码</FormLabel>
              <FormValue placeholder={!hasValue(clientData.customBaseInfo?.hkNum)}>{clientData.customBaseInfo?.hkNum || '请输入证件号码'}</FormValue>
            </FormRow>
            <FormRow>
              <FormLabel>通讯地址</FormLabel>
              <FormValue placeholder={!hasValue(clientData.customBaseInfo?.callAddress)}>{clientData.customBaseInfo?.callAddress || '请输入通讯地址'}</FormValue>
            </FormRow>
            <FormRow>
              <FormLabel>邮编</FormLabel>
              <FormValue placeholder={!hasValue(clientData.customBaseInfo?.zip)}>{clientData.customBaseInfo?.zip || '请输入邮编'}</FormValue>
            </FormRow>
            <FormRow>
              <FormLabel>联系电话</FormLabel>
              <FormValue placeholder={!hasValue(clientData.customBaseInfo?.phone)}>{clientData.customBaseInfo?.phone || '请输入联系电话'}</FormValue>
            </FormRow>
            <FormRow>
              <FormLabel>国籍</FormLabel>
              <FormValue placeholder={!hasValue(clientData.customBaseInfo?.country)}>{clientData.customBaseInfo?.country || '请输入国籍'}</FormValue>
            </FormRow>
            <FormRow>
              <FormLabel>出生日期</FormLabel>
              <FormValue hasArrow placeholder={!hasValue(formatDate(clientData.customBaseInfo?.birthday))}>{formatDate(clientData.customBaseInfo?.birthday) || '请选择出生日期'} <RightOutlined /></FormValue>
            </FormRow>
            <FormRow>
              <FormLabel>性别</FormLabel>
              <FormValue hasArrow placeholder={!hasValue(getGenderText(clientData.customBaseInfo?.gender))}>{getGenderText(clientData.customBaseInfo?.gender) || '请选择性别'} <RightOutlined /></FormValue>
            </FormRow>
            <FormRow>
              <FormLabel>身高</FormLabel>
              <FormValue placeholder={!hasValue(clientData.customBaseInfo?.high)}>{clientData.customBaseInfo?.high ? `${clientData.customBaseInfo.high} CM` : '请输入身高 CM'}</FormValue>
            </FormRow>
            <FormRow>
              <FormLabel>体重</FormLabel>
              <FormValue placeholder={!hasValue(clientData.customBaseInfo?.weigh)}>{clientData.customBaseInfo?.weigh ? `${clientData.customBaseInfo.weigh} KG` : '请输入体重 KG'}</FormValue>
            </FormRow>
            <FormRow>
              <FormLabel>是否吸烟</FormLabel>
              <FormValue hasArrow>{getSmokeText(clientData.customBaseInfo?.smoke) || '请选择是否吸烟'} <RightOutlined /></FormValue>
            </FormRow>
            <FormRow>
              <FormLabel>婚姻状况</FormLabel>
              <FormValue hasArrow placeholder={!hasValue(getMaritalStatusText(clientData.customBaseInfo?.maritalStatus))}>{getMaritalStatusText(clientData.customBaseInfo?.maritalStatus) || '请选择婚姻状况'} <RightOutlined /></FormValue>
            </FormRow>
            <FormRow>
              <FormLabel>教育程度</FormLabel>
              <FormValue hasArrow placeholder={!hasValue(getDegreeText(clientData.customBaseInfo?.degree))}>{getDegreeText(clientData.customBaseInfo?.degree) || '请选择教育程度'} <RightOutlined /></FormValue>
            </FormRow>
            <FormRow>
              <FormLabel>Email邮箱</FormLabel>
              <FormValue placeholder={!hasValue(clientData.customBaseInfo?.email)}>{clientData.customBaseInfo?.email || '请输入Email邮箱'}</FormValue>
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
              <FormValue placeholder={!hasValue(clientData.customWorkInfo?.company)}>{clientData.customWorkInfo?.company || '请输入公司名称'}</FormValue>
            </FormRow>
            <FormRow>
              <FormLabel>公司地址</FormLabel>
              <FormValue placeholder={!hasValue(clientData.customWorkInfo?.address)}>{clientData.customWorkInfo?.address || '请输入公司地址'}</FormValue>
            </FormRow>
            <FormRow>
              <FormLabel>现每月收入</FormLabel>
              <FormValue placeholder={!hasValue(clientData.customWorkInfo?.salary)}>{clientData.customWorkInfo?.salary ? `${Number(clientData.customWorkInfo.salary).toFixed(2)} HKD` : '请输入现每月收入 HKD'}</FormValue>
            </FormRow>
            <FormRow>
              <FormLabel>现每月支出</FormLabel>
              <FormValue placeholder={!hasValue(clientData.customWorkInfo?.consume)}>{clientData.customWorkInfo?.consume ? `${Number(clientData.customWorkInfo.consume).toFixed(2)} HKD` : '请输入现每月支出 HKD'}</FormValue>
            </FormRow>
            <FormRow>
              <FormLabel>流动资产总额</FormLabel>
              <FormValue placeholder={!hasValue(clientData.customWorkInfo?.liquidAsset)}>{clientData.customWorkInfo?.liquidAsset ? `${clientData.customWorkInfo.liquidAsset} HKD` : '请输入流动资产总额 HKD'}</FormValue>
            </FormRow>
            <FormRow>
              <FormLabel>公司业务性质</FormLabel>
              <FormValue placeholder={!hasValue(clientData.customWorkInfo?.companyType)}>{clientData.customWorkInfo?.companyType || '请输入公司业务性质'}</FormValue>
            </FormRow>
            <FormRow>
              <FormLabel>职位及职责</FormLabel>
              <FormValue placeholder={!hasValue(clientData.customWorkInfo?.office)}>{clientData.customWorkInfo?.office || '请输入职位及职责'}</FormValue>
            </FormRow>
            <FormRow>
              <FormLabel>现职工作年限</FormLabel>
              <FormValue placeholder={!hasValue(clientData.customWorkInfo?.seniority)}>{clientData.customWorkInfo?.seniority ? `${clientData.customWorkInfo.seniority}年` : '请输入现职工作年限'}</FormValue>
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