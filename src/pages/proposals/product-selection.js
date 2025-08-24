import React, { useState, useEffect } from 'react';
import { Button, message } from 'antd';
import { ArrowLeftOutlined, CheckOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ProductSelectionPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // 模拟产品目录数据
  const mockCategories = [
    { id: 1, name: '热门产品', region: '' },
    { id: 2, name: '友邦保险', region: '香港' },
    { id: 3, name: '周大福人寿', region: '香港' },
    { id: 4, name: '保诚保险', region: '香港' },
    { id: 5, name: '安盛保险', region: '香港' },
    { id: 6, name: '宏利保险', region: '香港' },
    { id: 7, name: '万通保险', region: '香港' },
    { id: 8, name: '富卫人寿', region: '香港' },
        { id: 9, name: '万通保险', region: '香港' },
    { id: 10, name: '万通保险', region: '香港' },
    { id: 11, name: '万通保险', region: '香港' },
    { id: 12, name: '万通保险', region: '香港' },
    { id: 13, name: '万通保险', region: '香港' },

  ];

  // 模拟产品数据
  const mockProducts = {
    1: [
      {
        id: 1,
        name: '环宇盈活储蓄保险计划-1年',
        type: '储蓄险',
        ageRange: '0岁 - 80岁',
        company: '友邦（香港）',
        logo: 'aia'
      },
      {
        id: 2,
        name: '环宇盈活储蓄保险计划-5年',
        type: '储蓄险',
        ageRange: '0岁 - 75岁',
        company: '友邦（香港）',
        logo: 'aia'
      }
    ],
    2: [
      {
        id: 3,
        name: '环宇盈活储蓄保险计划-1年',
        type: '储蓄险',
        ageRange: '0岁 - 80岁',
        company: '友邦（香港）',
        logo: 'aia'
      },
      {
        id: 4,
        name: '环宇盈活储蓄保险计划-5年',
        type: '储蓄险',
        ageRange: '0岁 - 75岁',
        company: '友邦（香港）',
        logo: 'aia'
      }
    ]
  };

  useEffect(() => {
    // 模拟从后端获取产品目录
    setCategories(mockCategories);
    // 默认选择第一个分类
    if (mockCategories.length > 0) {
      setSelectedCategory(mockCategories[0]);
    }
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      // 模拟从后端获取具体产品
      setLoading(true);
      setTimeout(() => {
        setProducts(mockProducts[selectedCategory.id] || []);
        setLoading(false);
      }, 300);
    }
  }, [selectedCategory]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedProduct(null); // 重置选中的产品
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  const handleNext = () => {
    if (selectedProduct) {
      message.success(`已选择产品：${selectedProduct.name}`);
      // 这里可以跳转到下一步页面
    }
  };

  const handleBack = () => {
    navigate('/proposals');
  };

  return (
    <Container>
      {/* 顶部导航 */}
      <Header>
        <BackButton onClick={handleBack}>
          <ArrowLeftOutlined />
        </BackButton>
        <Title>新建建议书</Title>
      </Header>

      {/* 步骤指示器 */}
      <StepsContainer>
        <StepItem active>
          <StepIcon active>
            <CheckOutlined />
          </StepIcon>
          <StepText active>选择产品</StepText>
        </StepItem>
        <StepLine />
        <StepItem>
          <StepIcon>2</StepIcon>
          <StepText>填写信息</StepText>
        </StepItem>
        <StepLine />
        <StepItem>
          <StepIcon>3</StepIcon>
          <StepText>制作</StepText>
        </StepItem>
      </StepsContainer>

      {/* 主要内容区域 */}
      <ContentArea>
        {/* 左侧产品目录 */}
        <CategoryPanel>
          <CategoryList>
            {categories.map((category) => (
              <CategoryItem
                key={category.id}
                selected={selectedCategory?.id === category.id}
                onClick={() => handleCategorySelect(category)}
              >
                <CategoryName>{category.name}</CategoryName>
                {category.region && (
                  <CategoryRegion>{category.region}</CategoryRegion>
                )}
              </CategoryItem>
            ))}
          </CategoryList>
        </CategoryPanel>

        {/* 右侧产品列表 */}
        <ProductPanel>
          <ProductList>
            {loading ? (
              <LoadingText>加载中...</LoadingText>
            ) : (
              products.map((product) => (
                <ProductItem
                  key={product.id}
                  selected={selectedProduct?.id === product.id}
                  onClick={() => handleProductSelect(product)}
                >
                  <ProductHeader>
                    <ProductTitle>{product.name}</ProductTitle>
                    <SelectIcon selected={selectedProduct?.id === product.id}>
                      {selectedProduct?.id === product.id && <CheckOutlined />}
                    </SelectIcon>
                  </ProductHeader>
                  <ProductInfo>
                    <ProductType>{product.type}</ProductType>
                    <ProductAge>{product.ageRange}</ProductAge>
                  </ProductInfo>
                  <ProductCompany>
                    <CompanyLogo logo={product.logo} />
                    <CompanyName>{product.company}</CompanyName>
                  </ProductCompany>
                </ProductItem>
              ))
            )}
          </ProductList>
        </ProductPanel>
      </ContentArea>

      {/* 底部按钮 */}
      {selectedProduct && (
        <BottomButton>
          <NextButton type="primary" onClick={handleNext}>
            已选择 {selectedProduct.name}
            <br />
            下一步
          </NextButton>
        </BottomButton>
      )}
    </Container>
  );
};

// 样式组件
const Container = styled.div`
  height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 100;
`;

const BackButton = styled.div`
  font-size: 20px;
  color: #333;
  cursor: pointer;
  margin-right: 15px;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #333;
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
  
  ${props => props.active ? `
    background-color: #2468F2;
    color: white;
  ` : `
    background-color: #f0f0f0;
    color: #999;
  `}
`;

const StepText = styled.div`
  font-size: 12px;
  color: ${props => props.active ? '#2468F2' : '#999'};
  font-weight: ${props => props.active ? '600' : '400'};
`;

const StepLine = styled.div`
  width: 60px;
  height: 2px;
  background-color: #f0f0f0;
  margin: 0 20px 20px;
`;

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
  min-height: 0;
`;

const CategoryPanel = styled.div`
  width: 150px;
  background-color: white;
  border-right: 1px solid #f0f0f0;
`;

const CategoryList = styled.div`
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  
  /* 隐藏滚动条 */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const CategoryItem = styled.div`
  padding: 20px 15px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  ${props => props.selected ? `
    background-color: #f0f7ff;
    border-left: 4px solid #2468F2;
  ` : `
    &:hover {
      background-color: #f9f9f9;
    }
  `}
`;

const CategoryName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
`;

const CategoryRegion = styled.div`
  font-size: 12px;
  color: #2468F2;
`;

const ProductPanel = styled.div`
  flex: 1;
  background-color: white;
`;

const ProductList = styled.div`
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 10px;
  
  /* 隐藏滚动条 */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const LoadingText = styled.div`
  text-align: center;
  padding: 40px;
  color: #999;
`;

const ProductItem = styled.div`
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 12px;
  border: 2px solid ${props => props.selected ? '#2468F2' : '#f0f0f0'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #2468F2;
    box-shadow: 0 4px 12px rgba(36, 104, 242, 0.1);
  }
`;

const ProductHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const ProductTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  line-height: 1.4;
  flex: 1;
`;

const SelectIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid ${props => props.selected ? '#2468F2' : '#d9d9d9'};
  background-color: ${props => props.selected ? '#2468F2' : 'white'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

const ProductInfo = styled.div`
  margin-bottom: 12px;
`;

const ProductType = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
`;

const ProductAge = styled.div`
  font-size: 14px;
  color: #666;
`;

const ProductCompany = styled.div`
  display: flex;
  align-items: center;
`;

const CompanyLogo = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  margin-right: 8px;
  background-color: ${props => props.logo === 'aia' ? '#e6f7ff' : '#f0f0f0'};
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::after {
    content: '${props => props.logo === 'aia' ? 'A' : 'C'}';
    font-size: 12px;
    font-weight: 600;
    color: ${props => props.logo === 'aia' ? '#1890ff' : '#666'};
  }
`;

const CompanyName = styled.div`
  font-size: 14px;
  color: #333;
`;

const BottomButton = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 15px 20px;
  background-color: white;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
  
  @media screen and (min-width: 768px) {
    max-width: 414px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const NextButton = styled(Button)`
  width: 100%;
  height: 60px;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 600;
  background: linear-gradient(135deg, #2468F2 0%, #1890ff 100%);
  border: none;
  box-shadow: 0 4px 12px rgba(36, 104, 242, 0.3);
  line-height: 1.2;
  
  &:hover {
    background: linear-gradient(135deg, #1890ff 0%, #2468F2 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(36, 104, 242, 0.4);
  }
`;

export default ProductSelectionPage;