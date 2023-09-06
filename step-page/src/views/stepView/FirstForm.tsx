import React, { forwardRef, useImperativeHandle } from 'react';
import { Form, FormProps, Input } from 'antd';

interface FirstFormViewProps extends FormProps {
  /** 此处的 stepValue 为 StepBar组件下发数据，其数据结构与 FirstForm 组件中 save 的数据结构相同 */
  stepValue?: {
    label: string;
    value: string | number;
    key: string;
  }[];
}

const FirstForm = forwardRef<any, FirstFormViewProps>((props, ref) => {
  const { initialValues, stepValue } = props;
  const [form] = Form.useForm();

  let handleStepvalue;
  if (stepValue) {
    handleStepvalue = {};
    stepValue?.forEach(item => {
      handleStepvalue[item.key] = item.value
    })
  }

  useImperativeHandle(ref, () => ({
    tick: ({ next, save }) => {
      form
        .validateFields()
        .then(value => {
          // 此处的数据转换只是为了第四步数据展示，处理数据方便
          save([
            { key: 'username', label: '用户名', value: value.username },
            { key: 'password', label: '密码', value: value.password },
          ])
          next()
        })
        .catch(errorInfo => {
          console.error(errorInfo)
        })
    }
  }))

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  type FieldType = {
    username?: string;
    password?: string;
  };

  return (
    <Form
      name="basic"
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      initialValues={handleStepvalue ?? initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="用户名"
        name="username"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="密码"
        name="password"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input.Password />
      </Form.Item>
    </Form>
  )

});

export default FirstForm;