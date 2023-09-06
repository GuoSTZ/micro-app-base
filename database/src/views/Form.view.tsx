import React, { useEffect, useState, useImperativeHandle } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Panel from '@/components/Panel';
import StepBar from '@/components/StepBar';
import { locale } from '@/locales';
import './index.less';
import { Button } from 'antd';


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

    </Panel>
  )
}