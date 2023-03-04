import React, { useState, useEffect } from 'react';
import { Space, Input, Button, Form, Checkbox } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, LockOutlined } from '@ant-design/icons';
import CarouselView from '@/components/CarouselView';
import planetSvg from '/public/images/planet.svg'
import holdon from '/public/images/holdon.svg';
import maintenance from '/public/images/maintenance.svg';
import success from '/public/images/success.svg';
import update from '/public/images/update.svg';
import './index.less'

import { schemaAtom } from '@/atoms';
import { useSchemaAtom } from '@/action';
import { useAtom } from 'jotai';

export default () => {
  const [schema] = useAtom(schemaAtom)

  useEffect(() => {
    useSchemaAtom();
  }, [])

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={"login"}>
      <header>
        <img src={planetSvg} width={64}/> 开发记录
      </header>

      <div className={'login-content'}>
        {/* 轮播图 */}
        <div className={'login-swiper'}>
          <CarouselView
            autoplay
            dataSource={[
              <img src={maintenance} height={430} width={680} />,
              <img src={holdon} height={430} width={680} />,
              <img src={update} height={430} width={680} />,
              <img src={success} height={430} width={680} />,
            ]} />
        </div>
        {/* 登录框 */}
        <div className={'login-wrap'}>
          <h2>用户登录</h2>
          <Form
            name="basic"
            className={'login-wrap-form'}
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
              <Button type="primary" htmlType="submit" className={'submit-button'}>
                登录
              </Button>
            </Form.Item>
          </Form>
          <Space className={'login-wrap-extra'}>
            <div>没有账号？<a>前往注册</a></div>
            <div className={'reset-password'}><a>忘记密码？</a></div>
          </Space>
        </div>
      </div>

      <footer>浙ICP备19012881号-2</footer>

      {/* 背景样式 */}
      <div className={'login-background-one'} />
      <div className={'login-background-two'} />
    </div>
  )
}