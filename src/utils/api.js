// API基础配置
const API_BASE_URL = '/api'; // 使用代理转发，所有/api请求会被转发到https://wctest.mynatapp.cc

// Token管理
const TOKEN_KEY = 'auth_token';

export const tokenManager = {
  // 设置token
  setToken: (token) => {
    localStorage.setItem(TOKEN_KEY, token);
  },
  
  // 获取token
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },
  
  // 清除token
  clearToken: () => {
    localStorage.removeItem(TOKEN_KEY);
  },
  
  // 检查是否有token
  hasToken: () => {
    return !!localStorage.getItem(TOKEN_KEY);
  }
};

// 通用请求方法
const request = async (url, options = {}) => {
  const defaultOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const config = { ...defaultOptions, ...options };
  
  // 自动添加token到请求头
  const token = tokenManager.getToken();
  if (token) {
    config.headers.token = token;
  }

  // 如果有请求体且不是FormData，则转换为JSON字符串
  if (config.body && !(config.body instanceof FormData)) {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, config);
    console.log(response, 'chj00000')
    
    if (!response.ok) {
      // 如果是401未授权，清除token
      if (response.status === 401) {
        tokenManager.clearToken();
        // 可以在这里添加跳转到登录页的逻辑
        window.location.href = '/login';
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API请求错误:', error);
    throw error;
  }
};

// GET请求
export const get = (url, params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;
  return request(fullUrl);
};

// POST请求
export const post = (url, data = {}) => {
  return request(url, {
    method: 'POST',
    body: data,
  });
};

// PUT请求
export const put = (url, data = {}) => {
  return request(url, {
    method: 'PUT',
    body: data,
  });
};

// DELETE请求
export const del = (url) => {
  return request(url, {
    method: 'DELETE',
  });
};

// 示例API调用函数
export const apiService = {
  // 获取用户信息
  getUserInfo: () => post('/auth/user/info'),
  
  // 获取客户列表
  getClients: (params) => get('/clients', params),
  
  // 获取保单列表
  getPolicies: (params) => get('/policies', params),
  
  // 获取提案列表
  getProposals: (params) => get('/proposals', params),
  
  // 登录
  login: (credentials) => post('/auth/user/login', credentials),

  // 获取验证码 - 使用fetch获取响应头中的captchaKey和图片数据
  getCaptcha: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `/common/captcha/get?${queryString}` : '/common/captcha/get';
    
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    
    // 自动添加token到请求头
    const token = tokenManager.getToken();
    if (token) {
      config.headers.token = token;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}${url}`, config);
      
      if (!response.ok) {
        if (response.status === 401) {
          tokenManager.clearToken();
          window.location.href = '/login';
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // 获取响应头中的captchaKey
      const captchaKey = response.headers.get('captchaKey');
      
      // 获取图片数据
      const imageBlob = await response.blob();
      
      // 创建图片URL
      const imageUrl = URL.createObjectURL(imageBlob);
      
      // 返回包含captchaKey和图片URL的对象
      return {
        captchaKey,
        imageUrl,
        imageBlob
      };
    } catch (error) {
      console.error('获取验证码失败:', error);
      throw error;
    }
  },

  // 获取银行账户
  getAccounts: (params) => post('/app/account/page', params),

  addAccount: (params) => post('/app/account/add', params),

  // 获取我的客户列表
  getCustomers: (params) => post('/app/custom/page', params),

  getCustomerDetail: (params) => post('/app/custom/info', params),

  getCompanyPage: (params) => post('/app/company/list', params),

  // 获取保司详情
  getCompanyDetail: (params) => post('/app/company/info', params),

  // 获取保司资料分类
  getCompanyCategories: (params) => post('/app/company/article/category/list', params),

  // 获取保司资料列表
  getCompanyMaterials: (params) => post('/app/company/article/page', params),
  
  // 登出
  logout: () => post('/auth/logout'),


  getProposalsPage: (params) => post('/app/proposal/page', params),


  getSpuPage: (params) => post('/app/spu/page', params),

  getSpuSkuPage: (params) => post('/app/spu/sku/page', params),

  getSpuHotSkuPage: (params) => post('/app/spu/sku/hot/page', params),

  getSkuConfig: (params) => post('/app/spu/sku/info', params),

  

};

export default apiService;