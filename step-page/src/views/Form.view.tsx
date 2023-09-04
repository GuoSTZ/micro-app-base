import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'antd';
import * as actions from '@/action';
import Panel from '@/components/Panel';
import FormRender from '@/components/FormRender';
import { locale } from '@/locales';
import Toolbar from '@/components/Toolbar';
import './index.less';


let form;

export default () => {
  const navigate = useNavigate();
  const params = useParams();
  const [formSchmea, setFormSchema] = useState({});

  useEffect(() => {

  }, [])

  const handleSubmit = () => {
    form?.submit()
      .then(values => {
        
      })
      .catch(error => {
        console.log(error)
      })
  }

  const goBack = () => {
    navigate(-1)
  }

  return (
    <Panel
      className='formView'
      title={params.id ? locale("common.operations.edit") : locale("common.operations.new")}
      footer={
        <Toolbar className='formView-footer'>
          <Button onClick={() => navigate(-1)} key={1}>{locale("common.operations.back")}</Button>
          <Button type="primary" onClick={handleSubmit} key={2}>{locale("common.operations.ok")}</Button>
        </Toolbar>
      }>
      <FormRender schema={formSchmea} getForm={baseForm => form = baseForm} />
    </Panel>
  )
}