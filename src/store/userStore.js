import { create } from 'zustand';
import { apiService } from '../utils/api';

const useUserStore = create((set, get) => ({
  // 用户信息状态
  userInfo: {
    id: '',
    name: '',
    greeting: '',
    weatherIcon: '☀️'
  },
  loading: false,
  error: null,
  isInitialized: false,

  // 获取问候语的辅助函数
  getGreeting: () => {
    const hour = new Date().getHours();
    if (hour < 12) return '上午好';
    if (hour < 18) return '下午好';
    return '晚上好';
  },

  // 获取用户信息
  fetchUserInfo: async () => {
    const { loading, isInitialized } = get();
    
    // 如果正在加载或已经初始化，则不重复调用
    if (loading || isInitialized) {
      return;
    }
    
    set({ loading: true, error: null });
    
    try {
      const response = await apiService.getUserInfo();
      if (response.code === 0) {
        const { getGreeting } = get();
        set({
          userInfo: {
            id: response.data.id || response.data.userId || '',
            name: response.data.name || response.data.username || '用户',
            greeting: getGreeting(),
            weatherIcon: '☀️'
          },
          loading: false,
          isInitialized: true
        });
      } else {
        throw new Error(response.msg || '获取用户信息失败');
      }
    } catch (error) {
      console.error('获取用户信息失败:', error);
      const { getGreeting } = get();
      set({
        userInfo: {
          id: '',
          name: '用户',
          greeting: getGreeting(),
          weatherIcon: '☀️'
        },
        loading: false,
        error: error.message,
        isInitialized: true
      });
    }
  },

  // 清除用户信息
  clearUserInfo: () => {
    set({
      userInfo: {
        id: '',
        name: '',
        greeting: '',
        weatherIcon: '☀️'
      },
      loading: false,
      error: null,
      isInitialized: false
    });
  },

  // 更新用户信息
  updateUserInfo: (newUserInfo) => {
    set(state => ({
      userInfo: { ...state.userInfo, ...newUserInfo }
    }));
  }
}));

export default useUserStore;