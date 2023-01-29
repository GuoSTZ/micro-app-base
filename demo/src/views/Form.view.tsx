import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as actions from '@/action';
import Panel from '@/components/Panel';
import FormRender from '@/components/FormRender';
import { locale } from '@/locales';
import './index.module.less';
import { Button } from 'antd';
import Toolbar from '@/components/Toolbar';

let form;

export default () => {
  const navigate = useNavigate();
  const params = useParams();
  const [formSchmea, setFormSchema] = useState({});

  useEffect(() => {
    actions.fetchFormSchema({id: params.id}, data => {
      setFormSchema(data)
    })
    !!params.id && actions.fetchItem({id: params.id}, data => {
      form?.setInitialValues(data)
    })
  }, [])

  const handleSubmit = () => {
    form?.submit()
      .then(values => {
        console.log(values)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <Panel 
      title={params.id ? locale("common.operations.edit") : locale("common.operations.new")}
      footer={
        <Toolbar>
          <Button onClick={() => navigate(-1)} key={1}>{locale("common.operations.cancel")}</Button>
          <Button type="primary" onClick={handleSubmit} key={2}>{locale("common.operations.ok")}</Button>
        </Toolbar>
      }>
      <FormRender schema={formSchmea} getForm={baseForm => form = baseForm}/>
    </Panel>
  )
}