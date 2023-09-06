import React, { useEffect, useState, useImperativeHandle } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Panel from '@/components/Panel';
import StepBar from '@/components/StepBar';
import { locale } from '@/locales';
import FirstForm from './stepView/FirstForm';
import SecondInfo from './stepView/SecondInfo';
import ThreeForm from './stepView/ThreeForm';
import FourDesc from './stepView/FourDesc';
import './index.less';
import { Button } from 'antd';

const steps = [
  {
    title: '用户信息',
    content: <FirstForm initialValues={{username: 'aaaa'}} />,
  },
  {
    title: '表格信息展示',
    content: <SecondInfo />,
  },
  {
    title: 'ip信息',
    content: <ThreeForm />,
  },
  {
    title: '全部数据展示',
    content: <FourDesc />,
  },
];

let form;
export default () => {
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {

  }, [])

  const goBack = () => {
    navigate(-1)
  }

  return (
    <Panel
      className='formView'
      title={params.id ? locale("common.operations.edit") : locale("common.operations.new")}
      footer={false}>
      <StepBar 
        items={steps}
        btnProps={{
          cancel: {
            onClick: goBack,
          },
          finish: {
            onClick: (e, ref, value) => {
              goBack();
            }
          }
        }}
        footerRender={footer => (
          <>
            {footer}
            <Button>123</Button>
          </>
        )}
      />
    </Panel>
  )
}