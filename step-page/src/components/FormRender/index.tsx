import React, { useEffect } from 'react';
import {
  PreviewText,
  FormItem,
  Input,
  NumberPicker,
  Password,
  Radio,
  Reset,
  Select,
  SelectTable,
  Space,
  Switch,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,
  Form,
  ArrayTable,
  FormButtonGroup,
  FormCollapse,
  FormGrid,
  FormLayout,
  FormStep,
  FormTab,
  Submit,
  DatePicker,
  Cascader,
  Checkbox,
  ArrayCards,
  ArrayItems,
  ArrayTabs,
  Editable
} from '@formily/antd'
import {
  createForm,
  registerValidateRules,
} from '@formily/core';
import { Form as IForm } from '@formily/core/esm/models/Form';
import { createSchemaField } from '@formily/react';
import { action } from '@formily/reactive';
import * as formilyAntd from '@formily/antd';
import * as formilyCore from '@formily/core';
import * as formilyReact from '@formily/react';
import * as formilyReactive from '@formily/reactive';
import * as onFormEffects from '@formily/core/esm/effects/onFormEffects';
import * as onFieldEffects from '@formily/core/esm/effects/onFieldEffects';
import {
  ArrayBaseAddition,
  ArrayBaseRemove,
  ArrayBaseMoveDown,
  ArrayBaseMoveUp,
  ArrayBaseIndex
} from './components/CustomArrayBaseComponent';

const { onFormInit, onFormMount } = onFormEffects;

export interface FormRenderProps {
  /** Form 实例获取 */
  getForm?: (form: IForm<any>) => any;
  /** JSON 数据 */
  schema: any;
  /** 自定义组件 */
  components?: any
  /** 自定义方法 */
  scope?: any;
  /** 自定义校验规则 */
  validator?: any
  /** 副作用方式添加入口 */
  effects?: (form: IForm<any>) => void;
}

// 同步设置输入控件的数据源
const useDataSource = (data: any, transform: Function) => (field: any) => {
  field.dataSource = transform ? transform(data) : data;
}

// 异步设置输入控件的数据源
const useAsyncDataSource = (service: Function, transform: Function) => (field: any) => {
  service(field).then(
    action?.bound?.((data: any) => {
      field.dataSource = transform ? transform(data) : data;
    })
  )
}

// FormCollapse 组件需要使用到的属性
const useFormCollapse = (activeKey: any) => FormCollapse?.createFormCollapse?.(activeKey);

const SchemaField = createSchemaField({
  components: {
    ArrayCards,
    ArrayItems,
    ArrayTabs,
    ArrayTable,
    Cascader,
    Checkbox,
    ArrayBaseAddition,
    ArrayBaseIndex,
    ArrayBaseRemove,
    ArrayBaseMoveDown,
    ArrayBaseMoveUp,
    DatePicker,
    Editable,
    FormButtonGroup,
    FormCollapse,
    FormGrid,
    FormItem,
    FormLayout,
    FormStep,
    FormTab,
    Input,
    NumberPicker,
    Password,
    PreviewText,
    Radio,
    Reset,
    Select,
    SelectTable,
    Space,
    Submit,
    Switch,
    TimePicker,
    Transfer,
    TreeSelect,
    Upload
  },
  scope: {
    useDataSource,
    useAsyncDataSource,
    useFormCollapse
  }
});

const FormRender = React.forwardRef((props: FormRenderProps, ref: any) => {
  const {
    getForm,
    schema = {},
    validator,
    components,
    effects,
    ...otherProps
  } = props;

  useEffect(() => {
    return () => {
      baseform.removeEffects("customEffects");
    }
  }, [])

  const baseform: IForm<any> = React.useMemo(() =>
    createForm({
      validateFirst: true,
      effects: () => {
        onFormInit((form: IForm<any>) => {
          // 自定义校验规则注册
          registerValidateRules(validator);
        })
        onFormMount((form: IForm<any>) => {
          getForm && getForm(form);
        })
      },
    })
    , [])

  baseform.addEffects("customEffects", effects)

  React.useImperativeHandle(ref, () => {
    return {
      form: baseform
    }
  })

  // 自定义组件传出form实例
  const handleCustomComp = () => {
    if (!components) return {};
    const customComp: any = {};
    for (let key in components) {
      const Comp = components[key];
      customComp[key] = (props: any) => <Comp {...props} form={baseform} />
    }
    return customComp;
  }

  return (
    <Form form={baseform} {...schema.form || {}} wrapperCol={8}>
      <SchemaField {...otherProps} schema={schema.schema || {}} components={handleCustomComp()} />
    </Form>
  )
})

export default FormRender;
export { onFieldEffects, onFormEffects };
export {
  formilyAntd,
  formilyCore,
  formilyReact,
  formilyReactive,
}
