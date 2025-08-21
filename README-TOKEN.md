# Token管理配置说明

## 功能概述

已完成完整的token管理系统，包括token存储、自动添加请求头、路由保护和登出清理功能。

## 主要功能

### 1. Token管理工具 (`src/utils/api.js`)



### 2. 自动请求头添加

所有API请求会自动在请求头中添加token：


### 3. 登录流程 (`src/pages/login/index.js`)

登录成功后自动保存token：


### 4. 路由保护 (`src/components/ProtectedRoute.js`)

创建了路由守卫组件，未登录用户自动跳转到登录页：


### 5. 登出功能 (`src/pages/profile/index.js`)

登出时自动清除token：


## 安全特性

### 401未授权处理
当API返回401状态码时，自动清除token并跳转到登录页：


### 路由保护
所有需要认证的页面都被ProtectedRoute组件保护：
- `/dashboard`
- `/profile`
- `/proposals`
- `/policies`
- `/my-clients`
- `/clients/:id`

## 使用流程

1. **用户登录** → 后端返回token → 自动保存到localStorage
2. **访问页面** → 路由守卫检查token → 有token则允许访问
3. **API请求** → 自动在请求头添加token → 后端验证身份
4. **token过期** → 后端返回401 → 自动清除token并跳转登录页
5. **用户登出** → 手动清除token → 跳转到登录页

## 存储方式

Token存储在浏览器的localStorage中，键名为 `auth_token`。

## 注意事项

1. Token在登录成功后自动保存
2. 所有API请求自动携带token
3. Token过期或无效时自动清理并重定向
4. 登出时手动清除token
5. 刷新页面时token会自动从localStorage恢复