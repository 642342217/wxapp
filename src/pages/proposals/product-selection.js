import React, { useState, useEffect } from 'react';
import { Button, message } from 'antd';
import { ArrowLeftOutlined, CheckOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../utils/api'

const ProductSelectionPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productLoading, setProductLoading] = useState(false);

  // 分页状态
  const [categoryPage, setCategoryPage] = useState({
    current: 1,
    size: 10,
    total: 0,
    pages: 1,
    hasMore: true
  });

  const [productPage, setProductPage] = useState({
    current: 1,
    size: 10,
    total: 0,
    pages: 1,
    hasMore: true
  });

  useEffect(() => {
    loadCategories(1, true);
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      loadProducts(1, true);
    }
  }, [selectedCategory]);

  // 加载产品分类
  const loadCategories = async (pageNum = 1, reset = false) => {
    if (loading) return;
    
    setLoading(true);
    try {
      const res = await apiService.getSpuPage({ 
        pageNum: pageNum.toString(), 
        pageSize: categoryPage.size.toString() 
      });
      
      if (res.code === 0) {
        const newCategories = res.data.records.map(item => ({
          id: item.id,
          name: item.name,
          shortName: item.shortName,
          icon: item.icon
        }));
        
        setCategories(prev => reset ? newCategories : [...prev, ...newCategories]);
        setCategoryPage({
          current: res.data.current,
          size: res.data.size,
          total: res.data.total,
          pages: res.data.pages,
          hasMore: res.data.current < res.data.pages
        });
        
        // 默认选择第一个分类
        if (reset && newCategories.length > 0 && !selectedCategory) {
          setSelectedCategory(newCategories[0].id);
        }
      }
    } catch (error) {
      console.error('加载产品分类失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 加载产品列表
  const loadProducts = async (pageNum = 1, reset = false) => {
    if (productLoading || !selectedCategory) return;
    
    setProductLoading(true);
    try {
      const res = await apiService.getSpuSkuPage({ 
        pageNum: pageNum.toString(), 
        pageSize: productPage.size.toString(),
        spuId: selectedCategory.toString()
      });
      
      if (res.code === 0) {
        const newProducts = res.data.records.map(item => ({
          id: item.id,
          name: `${item.name}-${item.year}年`,
          type: item.type === 1 ? '储蓄险' : '其他险种',
          age: item.age,
          year: item.year,
          ageRange: item.age
        }));
        
        setProducts(prev => reset ? newProducts : [...prev, ...newProducts]);
        setProductPage({
          current: res.data.current,
          size: res.data.size,
          total: res.data.total,
          pages: res.data.pages,
          hasMore: res.data.current < res.data.pages
        });
      }
    } catch (error) {
      console.error('加载产品列表失败:', error);
    } finally {
      setProductLoading(false);
    }
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedProduct(null);
    setProducts([]);
    setProductPage({
      current: 1,
      size: 10,
      total: 0,
      pages: 1,
      hasMore: true
    });
  };

  // 分类列表滚动加载
  const handleCategoryScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollHeight - scrollTop <= clientHeight + 50 && categoryPage.hasMore && !loading) {
      loadCategories(categoryPage.current + 1, false);
    }
  };

  // 产品列表滚动加载
  const handleProductScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollHeight - scrollTop <= clientHeight + 50 && productPage.hasMore && !productLoading) {
      loadProducts(productPage.current + 1, false);
    }
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
          <CategoryList onScroll={handleCategoryScroll}>
            {categories.map((category) => (
              <CategoryItem
                key={category.id}
                selected={selectedCategory === category.id}
                onClick={() => handleCategorySelect(category.id)}
              >
                <CategoryName>{category.name}</CategoryName>
                <CategoryRegion>{category.shortName}</CategoryRegion>
              </CategoryItem>
            ))}
            {loading && <LoadingText>加载中...</LoadingText>}
          </CategoryList>
        </CategoryPanel>

        {/* 右侧产品列表 */}
        <ProductPanel>
          <ProductList onScroll={handleProductScroll}>
            {productLoading && products.length === 0 ? (
              <LoadingText>加载中...</LoadingText>
            ) : (
              <>
                {products.map((product) => (
                  <ProductItem
                    key={product.id}
                    selected={selectedProduct?.id === product.id}
                    onClick={() => handleProductSelect(product)}
                  >
                    <ProductContent>
                      <SelectIcon selected={selectedProduct?.id === product.id}>
                        {selectedProduct?.id === product.id && <CheckOutlined />}
                      </SelectIcon>
                      <ProductDetails>
                        <ProductTitle>{product.name}</ProductTitle>
                        <ProductInfo>
                          <ProductType>{product.type}</ProductType>
                          <ProductAge>{product.ageRange}</ProductAge>
                        </ProductInfo>
                      </ProductDetails>
                    </ProductContent>
                  </ProductItem>
                ))}
                {productLoading && products.length > 0 && <LoadingText>加载更多...</LoadingText>}
              </>
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
  width: 100px;
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

const ProductContent = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
`;

const ProductDetails = styled.div`
  flex: 1;
  margin-left: 15px;
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
  flex-shrink: 0;
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
  z-index: 100;
  display: flex;
  background-color: transparent;
  justify-content: center;
  
  @media screen and (min-width: 768px) {
    max-width: 414px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const NextButton = styled(Button)`
  width: auto;
  min-width: 280px;
  height: 60px;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 600;
  background: linear-gradient(135deg, #2468F2 0%, #1890ff 100%);
  border: none;
  box-shadow: 0 4px 12px rgba(36, 104, 242, 0.3);
  line-height: 1.2;
  padding: 0 30px;
  
  &:hover {
    background: linear-gradient(135deg, #1890ff 0%, #2468F2 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(36, 104, 242, 0.4);
  }
`;

export default ProductSelectionPage;