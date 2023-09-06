import React, { useImperativeHandle } from 'react';
import { Form, FormProps, Input } from 'antd';

interface ThreeFormViewProps extends FormProps {
  /** 此处的 stepValue 为 StepBar组件下发数据，其数据结构与 ThreeForm 组件中 save 的数据结构相同 */
  stepValue?: {
    ip: string;
    value: string | number;
    key: string;
  }[];
}

const ThreeForm = React.forwardRef<any, ThreeFormViewProps>((props, ref) => {
  const { stepValue } = props;
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
          save([
            { key: 'ip', label: 'IP', value: value.ip },
            { key: 'port', label: 'port', value: value.port },
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
    ip?: string;
    port?: number;
  };

  return (
    <Form
      name="basic"
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      initialValues={handleStepvalue}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="IP"
        name="ip"
        rules={[{ required: true, message: '请输入IP' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="端口"
        name="port"
        rules={[{ required: true, message: '请输入端口' }]}
      >
        <Input />
      </Form.Item>
    </Form>
  )

});

export default ThreeForm;