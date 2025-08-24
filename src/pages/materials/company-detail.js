import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { apiService } from '../../utils/api';

const CompanyDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [companyInfo, setCompanyInfo] = useState({});
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(0);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // 获取保司详情
  useEffect(() => {
    apiService.getCompanyDetail({ companyId: id })
      .then(res => {
        if (res.code === 0) {
          setCompanyInfo(res.data);
        }
      })
      .catch(error => {
        console.error('Failed to fetch company detail:', error);
      });
  }, [id]);

  // 获取分类列表
  useEffect(() => {
    apiService.getCompanyCategories({ companyId: id })
      .then(res => {
        if (res.code === 0) {
          setCategories(res.data);
          if (res.data.length > 0) {
            setActiveCategory(res.data[0].id);
          }
        }
      })
      .catch(error => {
        console.error('Failed to fetch categories:', error);
      });
  }, [id]);

  // 获取资料列表
  const fetchMaterials = useCallback((categoryId, pageNum = 1, isRefresh = false) => {
    if (loading) return;
    
    setLoading(true);
    apiService.getCompanyMaterials({
      companyId: id,
      categoryId,
      page: pageNum + "",
      pageSize: "10"
    })
      .then(res => {
        if (res.code === 0) {
          const newMaterials = res.data.records || [];
          if (isRefresh || pageNum === 1) {
            setMaterials(newMaterials);
          } else {
            setMaterials(prev => [...prev, ...newMaterials]);
          }
          // 使用接口返回的分页信息判断是否还有更多数据
          setHasMore(res.data.current < res.data.pages);
          setPage(pageNum);
        }
      })
      .catch(error => {
        console.error('Failed to fetch materials:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, loading]);

  // 切换分类
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setPage(1);
    fetchMaterials(categoryId, 1, true);
  };

  // 加载更多
  const handleLoadMore = () => {
    // if (hasMore && !loading) {
    //   fetchMaterials(activeCategory, page + 1);
    // }
  };

  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      if (scrollTop + windowHeight >= documentHeight - 100) {
        handleLoadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleLoadMore]);

  // 初始加载资料
  useEffect(() => {
    if (activeCategory) {
      fetchMaterials(activeCategory, 1, true);
    }
  }, [activeCategory]);

  const handleBack = () => {
    navigate(-1);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <Container>
      {/* 头部信息 */}
      <Header>
        <BackButton onClick={handleBack}>
          <ArrowLeftOutlined />
        </BackButton>
        <CompanyInfo>
          <CompanyLogo>
            <img src={companyInfo.logo || companyInfo.icon} alt={companyInfo.name} />
          </CompanyLogo>
          <CompanyDetails>
            <CompanyName>{companyInfo.name || companyInfo.shortName}</CompanyName>
            <MaterialCount>相关资料 ({materials.length})</MaterialCount>
          </CompanyDetails>
        </CompanyInfo>
      </Header>

      {/* 分类标签 */}
      <CategoryTabs>
        {categories.map(category => (
          <CategoryTab
            key={category.id}
            active={activeCategory === category.id}
            onClick={() => handleCategoryChange(category.id)}
          >
            {category.name}
          </CategoryTab>
        ))}
      </CategoryTabs>

      {/* 资料列表 */}
      <MaterialsList>
        {materials.map((material, index) => (
          <MaterialItem key={`${material.id}-${index}`}>
            <MaterialContent>
              <MaterialTitle>{material.name}</MaterialTitle>
              <MaterialMeta>
                <MaterialDate>{formatDate(material.createTime)}</MaterialDate>
              </MaterialMeta>
            </MaterialContent>
            <MaterialIcon>
              <img src={material.icon} alt={material.name} />
            </MaterialIcon>
          </MaterialItem>
        ))}
        
        {loading && (
          <LoadingText>加载中...</LoadingText>
        )}
        
        {!hasMore && materials.length > 0 && (
          <LoadingText>没有更多数据了</LoadingText>
        )}
      </MaterialsList>
    </Container>
  );
};

// 样式组件
const Container = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const Header = styled.div`
  background: white;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const BackButton = styled.div`
  font-size: 20px;
  color: #333;
  cursor: pointer;
  padding: 5px;
`;

const CompanyInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CompanyLogo = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const CompanyDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const CompanyName = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

const MaterialCount = styled.div`
  font-size: 14px;
  color: #999;
  margin-top: 2px;
`;

const CategoryTabs = styled.div`
  background: white;
  padding: 0 20px;
  display: flex;
  gap: 20px;
  border-bottom: 1px solid #f0f0f0;
`;

const CategoryTab = styled.div`
  padding: 15px 0;
  font-size: 16px;
  color: ${props => props.active ? '#2468F2' : '#666'};
  border-bottom: 2px solid ${props => props.active ? '#2468F2' : 'transparent'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: #2468F2;
  }
`;

const MaterialsList = styled.div`
  background: white;
  margin-top: 10px;
`;

const MaterialItem = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  
  &:hover {
    background-color: #f9f9f9;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const MaterialContent = styled.div`
  flex: 1;
`;

const MaterialTitle = styled.div`
  font-size: 16px;
  color: #333;
  font-weight: 500;
  margin-bottom: 8px;
  line-height: 1.4;
`;

const MaterialMeta = styled.div`
  display: flex;
  align-items: center;
`;

const MaterialDate = styled.div`
  font-size: 14px;
  color: #999;
`;

const MaterialIcon = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 15px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }
`;



const LoadingText = styled.div`
  text-align: center;
  padding: 20px;
  color: #999;
  font-size: 14px;
`;

export default CompanyDetail;