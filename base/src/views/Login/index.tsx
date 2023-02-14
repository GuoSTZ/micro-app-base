import React, { useState, useEffect } from 'react';
import { Space, Input, Button, Form, Checkbox } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, LockOutlined } from '@ant-design/icons';
import CarouselView from './components/CarouselView';
import one from './images/1.png'
import two from './images/2.png'
import three from './images/3.png'
import homeSvg from './images/home.svg'
import styles from './index.module.less'

export default () => {

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles.login}>
      <header>
        <img src={homeSvg} width={32}/> 开发记录
      </header>

      <div className={styles['login-content']}>
        {/* 轮播图 */}
        <div className={styles['login-swiper']}>
          <CarouselView
            autoplay
            dataSource={[
              <img src={one} height={"100%"} width={'100%'} />,
              <img src={two} height={"100%"} width={'100%'} />,
              <img src={three} height={"100%"} width={'100%'} />,
            ]} />
        </div>
        {/* 登录框 */}
        <div className={styles['login-wrap']}>
          <h2>用户登录</h2>
          <Form
            name="basic"
            className={styles['login-wrap-form']}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名！' }]}
            >
              <Input
                placeholder="用户名"
                prefix={<UserOutlined />}
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码！' }]}
            >
              <Input.Password
                placeholder="密码"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                prefix={<LockOutlined />}
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Checkbox>记住密码</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className={styles['submit-button']}>
                登录
              </Button>
            </Form.Item>
          </Form>
          <Space className={styles['login-wrap-extra']}>
            <div>没有账号？<a>前往注册</a></div>
            <div className={styles['reset-password']}><a>忘记密码？</a></div>
          </Space>
        </div>
      </div>

      <footer>浙ICP备19012881号-2</footer>

      {/* 背景样式 */}
      <div className={styles['login-background-one']} />
      <div className={styles['login-background-two']} />
    </div>
  )
}