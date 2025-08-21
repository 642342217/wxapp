# Webpack代理配置说明

## 配置概述

已成功配置webpack代理转发，将前端API请求转发到后端服务器 `https://wctest.mynatapp.cc`。

## 配置文件

### 1. setupProxy.js
位置：`src/setupProxy.js`



### 2. API工具文件
位置：`src/utils/api.js`

提供了统一的API调用方法，包括GET、POST、PUT、DELETE等。

## 使用方法

### 基本用法



### 在React组件中使用



## 代理规则

- 所有以 `/api` 开头的请求会被转发到 `https://wctest.mynatapp.cc`
- 例如：`/api/user/info` → `https://wctest.mynatapp.cc/api/user/info`
- 支持HTTPS，启用了changeOrigin确保跨域正常工作

## 注意事项

1. 确保后端服务器 `https://wctest.mynatapp.cc` 可访问
2. 代理配置只在开发环境生效（npm start）
3. 生产环境需要在服务器层面配置代理或直接调用后端API
4. 如需修改后端地址，只需更新 `setupProxy.js` 中的 `target` 字段

## 启动项目



项目启动后，所有API请求将自动通过代理转发到配置的后端服务器。