import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, MobileOutlined, KeyOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logoSvg from '../../assets/images/logo.svg';

const LoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginType, setLoginType] = useState('password'); // 'password' 或 'sms'

  const handleLogin = async (values) => {
    try {
      setLoading(true);
      // 这里可以添加实际的登录逻辑
      console.log('登录信息:', values);
      
      // 模拟登录成功
      setTimeout(() => {
        message.success('登录成功');
        navigate('/dashboard');
        setLoading(false);
      }, 1000);
    } catch (error) {
      message.error('登录失败，请重试');
      setLoading(false);
    }
  };

  const toggleLoginType = () => {
    setLoginType(loginType === 'password' ? 'sms' : 'password');
    form.resetFields();
  };

  return (
    <LoginContainer>
      <LogoWrapper>
        <Logo src={logoSvg} alt="小润领跑" />
      </LogoWrapper>
      
      <WelcomeText>欢迎回来</WelcomeText>
      
      <LoginTag>登录小润移动端</LoginTag>
      
      <LoginForm
        form={form}
        name="login"
        onFinish={handleLogin}
        size="large"
        style={{ backgroundColor: 'transparent' }}
      >
        <PhoneLabel>手机号码</PhoneLabel>
        <Form.Item
          name="phone"
          rules={[
            { required: true, message: '请输入手机号码' },
            { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码' }
          ]}
        >
          <PhoneInput 
            prefix={<PhonePrefix>+86</PhonePrefix>}
            placeholder="请输入登录手机号码"
            suffix={<MobileOutlined style={{ color: '#bfbfbf' }} />}
          />
        </Form.Item>
        
        {loginType === 'password' ? (
          <>
            <PasswordLabel>密码</PasswordLabel>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <PasswordInput 
                placeholder="请输入密码"
                iconRender={(visible) => (visible ? <KeyOutlined /> : <KeyOutlined />)}
              />
            </Form.Item>
          </>
        ) : (
          <>
            <PasswordLabel>手机验证码</PasswordLabel>
            <Form.Item
              name="smsCode"
              rules={[{ required: true, message: '请输入验证码' }]}
            >
              <SmsCodeInput 
                placeholder="请输入短信验证码"
                suffix={<VerifyCodeButton>获取验证码</VerifyCodeButton>}
              />
            </Form.Item>
          </>
        )}
        
        <Form.Item>
          <LoginButton type="primary" htmlType="submit" loading={loading}>
            安全登录
          </LoginButton>
        </Form.Item>
        
        <ButtonsWrapper>
          <SmsLoginLink onClick={toggleLoginType}>
            {loginType === 'password' ? '短信验证码登录' : '手机号/密码登录'}
          </SmsLoginLink>
        </ButtonsWrapper>
      </LoginForm>
      
      <Disclaimer>
        本平台专为小润公司顾问人员及供应商人员提供办公使用，账号为线下统一审核签发。
        <br />
        <HighlightText>
          若需注册账号，请联系我公司管理人员申请获取后方可登录
        </HighlightText>
      </Disclaimer>
    </LoginContainer>
  );
};

// 样式组件
const LoginContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f0f8ff; /* 浅蓝色背景 */
`;

const LogoWrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 40px;
`;

const Logo = styled.img`
  height: 40px;
`;

const WelcomeText = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const LoginTag = styled.div`
  display: inline-block;
  width: fit-content;
  background: linear-gradient(90deg,rgb(247, 213, 120) 0%,rgb(143, 178, 247) 70%, #FFFFFF 100%);
  color: #000;
  padding: 4px 16px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 30px;
  box-shadow: 0 2px 6px rgba(36, 104, 242, 0.2);
`;

const LoginForm = styled(Form)`
  width: 100%;
`;

const PhoneLabel = styled.div`
  font-size: 10px;
  color: #888;
  margin-bottom: 8px;
  padding: 2px 4px;
  width: fit-content;
  border-radius: 4px;
  background-color:rgb(230, 229, 229);
`;

const PasswordLabel = styled.div`
  font-size: 14px;
  color: #888;
  margin-bottom: 8px;
  margin-top: 20px;
`;

const PhoneInput = styled(Input)`
  height: 50px;
  border: none;
  border-bottom: 1px solid #d9d9d9;
  border-radius: 0;
  padding-left: 0;
  background-color: transparent;
  box-shadow: none !important;
  
  &:focus, &:hover {
    border-bottom: 1px solid #2468F2;
  }
  
  .ant-input {
    border: none;
    box-shadow: none !important;
    padding-left: 0;
  }
`;

const PhonePrefix = styled.div`
  display: flex;
  align-items: center;
  color: #333;
  font-weight: 500;
  &:after {
    content: '';
    display: inline-block;
    height: 16px;
    width: 1px;
    background-color: #d9d9d9;
    margin: 0 8px;
  }
`;

const PasswordInput = styled(Input.Password)`
  height: 50px;
  border: none;
  border-bottom: 1px solid #d9d9d9;
  border-radius: 0;
  padding-left: 0;
  box-shadow: none !important;
  
  &:focus, &:hover {
    border-bottom: 1px solid #2468F2;
  }
  
  .ant-input {
    border: none;
    box-shadow: none !important;
    padding-left: 0;
  }
  
  .ant-input-password-icon {
    color: #999;
  }
`;

const LoginButton = styled(Button)`
  width: 100%;
  height: 50px;
  border-radius: 25px;
  font-size: 16px;
  margin-top: 40px;
  background-color: #2468F2;
  font-weight: 500;
  box-shadow: 0 4px 10px rgba(36, 104, 242, 0.3);
  
  &:hover, &:focus {
    background-color: #1854d8;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
`;

const SmsCodeInput = styled(Input)`
  height: 50px;
  border: none;
  border-bottom: 1px solid #d9d9d9;
  border-radius: 0;
  padding-left: 0;
  box-shadow: none !important;
  
  &:focus, &:hover {
    border-bottom: 1px solid #2468F2;
  }
  
  .ant-input {
    border: none;
    box-shadow: none !important;
    padding-left: 0;
  }
`;

const VerifyCodeButton = styled.div`
  color: #2468F2;
  cursor: pointer;
  white-space: nowrap;
  font-size: 14px;
  
  &:hover {
    color: #1854d8;
  }
`;

const SmsLoginLink = styled.div`
  text-align: center;
  color: #2468F2;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    color: #1854d8;
  }
`;

const Disclaimer = styled.div`
  margin-top: auto;
  padding: 20px;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 20px;
  text-align: center;
  background-color: rgba(240, 248, 255, 0.7);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const HighlightText = styled.div`
  color: #2468F2;
  margin-top: 5px;
  font-weight: 500;
`;

export default LoginPage;