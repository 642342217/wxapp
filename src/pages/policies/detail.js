import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserOutlined, ClockCircleOutlined, CheckCircleOutlined, FileTextOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const PolicyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 模拟保单详细数据
  const policyDetailData = {
    '3808772002': {
      id: '3808772002',
      status: '核保中',
      statusType: 'processing',
      type: '港险',
      productName: '宏掌傳承保障計劃-5年',
      company: '宏利保险',
      clientName: '袁泳琳',
      amount: '$10,000 USD',
      firstYearAmount: '$49,249.20 USD',
      date: '2025-07-25 15:10:42',
      referrer: '万承 (孟策)',
      paymentStatus: '未缴费',
      relatedOrder: '关联预约单'
    },
    'G684830803': {
      id: 'G684830803',
      status: '已生效',
      statusType: 'active',
      type: '港险',
      productName: '「盈御多元货币计划3」-5年',
      company: '友邦保险',
      clientName: '曹师嘉',
      amount: '$30,000 USD',
      firstYearAmount: '$30,000 USD',
      date: '2025-06-30 10:43:43',
      referrer: '万承 (孟策)',
      paymentStatus: '已缴费',
      relatedOrder: '关联预约单'
    }
  };

  const policy = policyDetailData[id] || policyDetailData['3808772002'];

  const statusSteps = [
    { 
      key: 'pre', 
      label: '预核保', 
      icon: <UserOutlined style={{ fontSize: '16px' }} />, 
      active: true,
      bgColor: '#e6f7ff',
      iconColor: '#1890ff',
      showConnector: true,
      connectorActive: policy.statusType === 'processing' || policy.statusType === 'active' || policy.statusType === 'expired'
    },
    { 
      key: 'processing', 
      label: '核保中', 
      icon: <ClockCircleOutlined style={{ fontSize: '16px' }} />, 
      active: policy.statusType === 'processing' || policy.statusType === 'active' || policy.statusType === 'expired',
      bgColor: '#1890ff',
      iconColor: '#fff',
      isHighlight: policy.statusType === 'processing',
      showConnector: true,
      connectorActive: policy.statusType === 'active' || policy.statusType === 'expired'
    },
    { 
      key: 'active', 
      label: '已生效', 
      icon: <CheckCircleOutlined style={{ fontSize: '16px' }} />, 
      active: policy.statusType === 'active' || policy.statusType === 'expired',
      bgColor: '#f0f0f0',
      iconColor: '#999',
      showConnector: true,
      connectorActive: policy.statusType === 'expired'
    },
    { 
      key: 'expired', 
      label: '冷静期过', 
      icon: <CheckCircleOutlined style={{ fontSize: '16px' }} />, 
      active: policy.statusType === 'expired',
      bgColor: '#f0f0f0',
      iconColor: '#999',
      showConnector: false
    }
  ];

  return (
    <DetailContainer>
      {/* 状态流程 */}
      <StatusFlow>
        {statusSteps.map((step, index) => (
          <StatusStep key={step.key}>
            <StatusIconWrapper 
              bgColor={step.isHighlight ? '#1890ff' : step.bgColor}
              iconColor={step.isHighlight ? '#fff' : step.iconColor}
            >
              {step.icon}
            </StatusIconWrapper>
            <StatusLabel active={step.isHighlight}>{step.label}</StatusLabel>
            {index < statusSteps.length - 1 && step.showConnector && (
              <StatusConnector active={step.connectorActive} />
            )}
          </StatusStep>
        ))}
      </StatusFlow>



        <CardHeader>
          <StatusIconLarge>
            <ClockCircleOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
          </StatusIconLarge>
          <StatusTitle>保司核保中</StatusTitle>
        </CardHeader>

      {/* 保单信息卡片 */}
      <PolicyCard>

        <PolicyInfo>
          <InfoHeader>
            <MyTitle>
              <PolicyNumber>PA104342</PolicyNumber>
              <DetailTitle>详细信息</DetailTitle>
            </MyTitle>
          </InfoHeader>

          <InfoGrid>
            <InfoRow>
              <InfoLabel>保单类型</InfoLabel>
              <InfoValue>
                <TypeTag>{policy.type}</TypeTag>
              </InfoValue>
            </InfoRow>

            <InfoRow>
              <InfoLabel>保单号</InfoLabel>
              <InfoValue>{policy.id}</InfoValue>
            </InfoRow>

            <InfoRow>
              <InfoLabel>年缴保费</InfoLabel>
              <InfoValue>{policy.amount}</InfoValue>
            </InfoRow>

            <InfoRow>
              <InfoLabel>首年应缴保费</InfoLabel>
              <InfoValue>{policy.firstYearAmount}</InfoValue>
            </InfoRow>

            <InfoRow>
              <InfoLabel>渠道顾问</InfoLabel>
              <InfoValue>{policy.referrer}</InfoValue>
            </InfoRow>

            <InfoRow>
              <InfoLabel>缴费状态</InfoLabel>
              <InfoValue>{policy.paymentStatus}</InfoValue>
            </InfoRow>

            <InfoRow>
              <InfoLabel>状态</InfoLabel>
              <InfoValue>
                <StatusBadge statusType={policy.statusType}>
                  {policy.status}
                </StatusBadge>
              </InfoValue>
            </InfoRow>

            <InfoRow>
              <InfoLabel>关联预约单</InfoLabel>
              <InfoValue style={{ color: '#1890ff' }}>{policy.relatedOrder}</InfoValue>
            </InfoRow>

            <InfoRow>
              <InfoLabel>创建日期</InfoLabel>
              <InfoValue>{policy.date}</InfoValue>
            </InfoRow>
          </InfoGrid>
        </PolicyInfo>
      </PolicyCard>

      {/* 重要日期 */}
      <SectionCard>
        <SectionHeader>
          <SectionTitle>重要日期</SectionTitle>
        </SectionHeader>
        <SectionContent>
          <InfoGrid>
            <InfoRow>
              <InfoLabel>首年缴费日</InfoLabel>
              <InfoValue>暂无</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>保司核保通过日</InfoLabel>
              <InfoValue>暂无</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>生效日</InfoLabel>
              <InfoValue>暂无</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>冷静期</InfoLabel>
              <InfoValue>暂无</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>续费日</InfoLabel>
              <InfoValue>暂无</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>签发日</InfoLabel>
              <InfoValue>暂无</InfoValue>
            </InfoRow>
          </InfoGrid>
        </SectionContent>
      </SectionCard>

      {/* 产品计划 */}
      <SectionCard>
        <SectionHeader>
          <SectionTitle>产品计划</SectionTitle>
        </SectionHeader>
        <SectionContent>
          <InfoGrid>
            <InfoRow>
              <InfoLabel>保司</InfoLabel>
              <InfoValue>宏利（香港）</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>产品</InfoLabel>
              <InfoValue>宏掌傳承保障計劃-5年</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>年期</InfoLabel>
              <InfoValue>5</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>定价方式</InfoLabel>
              <InfoValue>年缴保费</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>货币种类</InfoLabel>
              <InfoValue>美元USD</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>保额</InfoLabel>
              <InfoValue>未填写</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>年缴保费</InfoLabel>
              <InfoValue>$10,000 USD</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>缴费频率</InfoLabel>
              <InfoValue>年</InfoValue>
            </InfoRow>
          </InfoGrid>
        </SectionContent>
      </SectionCard>

      {/* 持有人 */}
      <SectionCard>
        <SectionHeader>
          <SectionTitle>持有人</SectionTitle>
        </SectionHeader>
        <SectionContent>
          <InfoGrid>
            <InfoRow>
              <InfoLabel>中文姓名</InfoLabel>
              <InfoValue>袁泳琳</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>英文姓名</InfoLabel>
              <InfoValue>女</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>性别</InfoLabel>
              <InfoValue>女</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>出生日期</InfoLabel>
              <InfoValue>1997-05-28</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>国籍</InfoLabel>
              <InfoValue></InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>身高</InfoLabel>
              <InfoValue></InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>体重</InfoLabel>
              <InfoValue></InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>身份证号</InfoLabel>
              <InfoValue>R8954780J</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>身份证签发地</InfoLabel>
              <InfoValue></InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>出生日期</InfoLabel>
              <InfoValue>1997-05-28</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>入境证件类型</InfoLabel>
              <InfoValue>港澳通行证</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>入境证件号码</InfoLabel>
              <InfoValue>R8954780J</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>通讯语言</InfoLabel>
              <InfoValue>否</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>婚姻状况</InfoLabel>
              <InfoValue>已婚</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>教育程度</InfoLabel>
              <InfoValue>1997-05-28</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>通讯地址</InfoLabel>
              <InfoValue>东莞市东城区中信凯旋国际13栋</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>联系电话</InfoLabel>
              <InfoValue>13532302366</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Email</InfoLabel>
              <InfoValue>434103628@qq.com</InfoValue>
            </InfoRow>
          </InfoGrid>
        </SectionContent>
      </SectionCard>

      {/* 受保人 */}
      <SectionCard>
        <SectionHeader>
          <SectionTitle>受保人</SectionTitle>
        </SectionHeader>
        <SectionContent>
          <InfoGrid>
            <InfoRow>
              <InfoLabel>中文姓名</InfoLabel>
              <InfoValue>袁泳琳</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>英文姓名</InfoLabel>
              <InfoValue></InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>性别</InfoLabel>
              <InfoValue></InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>出生日期</InfoLabel>
              <InfoValue></InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>国籍</InfoLabel>
              <InfoValue></InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>身高</InfoLabel>
              <InfoValue></InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>体重</InfoLabel>
              <InfoValue></InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>身份证号</InfoLabel>
              <InfoValue>Y441012391</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>身份证签发地</InfoLabel>
              <InfoValue></InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>出生日期</InfoLabel>
              <InfoValue></InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>入境证件类型</InfoLabel>
              <InfoValue></InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>入境证件号码</InfoLabel>
              <InfoValue></InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>通讯语言</InfoLabel>
              <InfoValue></InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>婚姻状况</InfoLabel>
              <InfoValue></InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>教育程度</InfoLabel>
              <InfoValue></InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>通讯地址</InfoLabel>
              <InfoValue></InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>联系电话</InfoLabel>
              <InfoValue></InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Email</InfoLabel>
              <InfoValue></InfoValue>
            </InfoRow>
          </InfoGrid>
        </SectionContent>
      </SectionCard>

      {/* 法定收益人/信托人 */}
      <SectionCard>
        <SectionHeader>
          <SectionTitle>法定收益人/信托人</SectionTitle>
        </SectionHeader>
        <SectionContent>
          <InfoGrid>
            <InfoRow>
              <InfoLabel>持有人是否法定受益人</InfoLabel>
              <InfoValue></InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>公司名称</InfoLabel>
              <InfoValue>东莞市正兴投资管理有限公司</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>公司业务性质</InfoLabel>
              <InfoValue>投资顾问</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>公司地址</InfoLabel>
              <InfoValue>广东省东莞市东城街道东纵大道2号</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>职位及职责</InfoLabel>
              <InfoValue></InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>收入</InfoLabel>
              <InfoValue></InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>支出</InfoLabel>
              <InfoValue></InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>流动资产</InfoLabel>
              <InfoValue></InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>工作性质</InfoLabel>
              <InfoValue></InfoValue>
            </InfoRow>
          </InfoGrid>
        </SectionContent>
      </SectionCard>

      {/* 底部提示 */}
      <BottomTip>没有更多了</BottomTip>
    </DetailContainer>
  );
};

// 样式组件
const DetailContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-top: 120px;
`;

const StatusFlow = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 30px 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  @media screen and (min-width: 768px) {
    max-width: 414px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const StatusStep = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 1;
`;

const StatusIconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  background-color: ${props => props.bgColor};
  color: ${props => props.iconColor};
`;

const StatusLabel = styled.div`
  font-size: 12px;
  color: ${props => props.active ? '#1890ff' : '#666'};
  font-weight: ${props => props.active ? '600' : '400'};
  text-align: center;
`;

const StatusConnector = styled.div`
  position: absolute;
  top: 20px;
  left: 70%;
  width: 60%;
  height: 2px;
  background-color: ${props => props.active ? '#1890ff' : '#e8e8e8'};
  z-index: 1;
`;



const PolicyCard = styled.div`
  background-color: white;
  margin: 15px;
  border-radius: 8px;
  overflow: hidden;
`;

const CardHeader = styled.div`
  background-color: white;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
`;

const StatusIconLarge = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e6f7ff;
`;

const StatusTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

const PolicyInfo = styled.div`
  padding: 20px;
`;

const InfoHeader = styled.div`
  // border-bottom: 1px solid #f0f0f0;
  // padding-bottom: 20px;
`;

const MyTitle = styled.div`
  display: flex;
  align-items: baseline;
  flex-direction: column;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    left: -10px;
    top: 0;
    bottom: 0;
    width: 3px;
    background-color: #1890ff;
  }
`;

const PolicyNumber = styled.div`
  color: #999;
  font-size: 12px;
`;

const DetailTitle = styled.div`
  // color: #1890ff;
  font-size: 16px;
  font-weight: 600;
  position: relative;
`;

const InfoGrid = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px dotted #e8e8e8;
  
  &:last-child {
    border-bottom: none;
  }
`;

const InfoLabel = styled.div`
  color: #666;
  font-size: 14px;
  min-width: 100px;
`;

const InfoValue = styled.div`
  color: #333;
  font-size: 14px;
  font-weight: 500;
  text-align: right;
  flex: 1;
`;

const TypeTag = styled.span`
  background-color: #dc2626;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
`;

const StatusBadge = styled.div`
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  display: inline-block;
  
  ${props => {
    switch(props.statusType) {
      case 'processing':
        return `
          background-color: #e6f7ff;
          color: #1890ff;
          border: 1px solid #91d5ff;
        `;
      case 'active':
        return `
          background-color: #f6ffed;
          color: #52c41a;
          border: 1px solid #b7eb8f;
        `;
      case 'expired':
        return `
          background-color: #fff2f0;
          color: #ff4d4f;
          border: 1px solid #ffccc7;
        `;
      default:
        return `
          background-color: #f5f5f5;
          color: #666;
          border: 1px solid #d9d9d9;
        `;
    }
  }}
`;

const SectionCard = styled.div`
  background-color: white;
  margin: 15px;
  border-radius: 8px;
  overflow: hidden;
`;

const SectionHeader = styled.div`
  padding: 15px 20px;
  // border-bottom: 1px solid #f0f0f0;
`;

const SectionTitle = styled.div`
  color: #333;
  font-size: 16px;
  font-weight: 600;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: -10px;
    top: 0;
    bottom: 0;
    width: 3px;
    background-color: #1890ff;
  }
`;

const SectionContent = styled.div`
  padding: 0 20px 20px;
`;

const BottomTip = styled.div`
  text-align: center;
  color: #999;
  font-size: 14px;
  padding: 30px 0;
  margin-bottom: 20px;
`;

export default PolicyDetailPage;