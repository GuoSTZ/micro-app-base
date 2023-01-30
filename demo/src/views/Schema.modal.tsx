import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload/interface';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as actions from '@/action'
import { locale } from '@/locales';

export default () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const params = useParams();
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    !!params?.schemaId && actions.fetchSchemaItem({id: params.schemaId}, data => {
      const {schemaFile, ...restData} = data;
      form.setFieldsValue(restData)
    })
  }, [])

  const handleUpload = () => {
    setUploading(true);
    form.validateFields()
      .then((values) => {
        const formData = new FormData();
        for (let i in values) {
          if(!values[i]) continue
          if(i === 'schemaFile') {
            formData.append(i, values[i].file as RcFile);
          } else {
            formData.append(i, values[i] as RcFile);
          }
        }
        if(!!params?.schemaId) {
          actions.fetchUpdateSchema(formData, () => {
            setUploading(false);
            navigate(-1)
          })
        } else {
          actions.fetchSaveSchema(formData, () => {
            setUploading(false);
            navigate(-1)
          })
        }
        setUploading(false);
      })
      .catch((info) => {
        setUploading(false);
        console.log('Validate Failed:', info);
      });
  };

  const uProps: UploadProps = {
    onRemove: (file) => {
      setFileList([]);
    },
    beforeUpload: (file) => {
      setFileList([file]);
      return false;
    },
    fileList,
  };

  return (
    <Modal
      open
      title={params.schemaId ? locale("demo.schema.modal.title.edit") : locale("demo.schema.modal.title.add")}
      onCancel={() => navigate(-1)}
      onOk={handleUpload}>
      <Form
        name="schema"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}>
        <Form.Item name="id" hidden>
          <Input />
        </Form.Item>
        <Form.Item
          label="Schema Key"
          name="schemaKey"
          rules={[
            {
              required: true,
              message: '请输入Schema Key',
            },
          ]}>
          <Input placeholder='请输入' disabled={!!params.schemaId}/>
        </Form.Item>

        <Form.Item
          label="Schema名称"
          name="schemaName">
          <Input placeholder='请输入' />
        </Form.Item>

        <Form.Item
          label="JSON 文件"
          name="schemaFile"
          rules={[
            {
              required: true,
              message: '请选择JSON 文件',
            },
          ]}>
          <Upload {...uProps}>
            <Button icon={<UploadOutlined />} loading={uploading}>选择文件</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  )
}