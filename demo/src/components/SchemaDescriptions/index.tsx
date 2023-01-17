import React from 'react'
import { Descriptions, DescriptionsProps } from 'antd'
import DescriptionsItem, { DescriptionsItemProps } from 'antd/lib/descriptions/Item'
import styles from './index.module.less'

export interface SchemaDescriptionsItemProps extends DescriptionsItemProps {
  /** 子项值类型 */
  type: string
  /** label 对应值 */
  title: string
  /** 自定义组件名称 */
  component?: string
  /** 索引 */
  dataIndex: string
  /** 默认值 */
  default?: string
  /** 是否渲染该字段 */
  renderable?: boolean | string;
}

export interface SchemaDescriptionsProps extends DescriptionsProps {
  /** JSON 数据 */
  schema: any
  /** 自定义组件 */
  components?: any
  /** 源数据 */
  data: any
}

const SchemaDescriptions: React.FC<SchemaDescriptionsProps> = props => {
  const { schema, components, data = {}, ...otherProps } = props
  const { descriptions, columns } = schema
  // 内置表达式作用域
  const $descriptions = props

  const evalRenderabl = (field: boolean | string) => {
    if(typeof field === 'boolean') {
      return field;
    } else if (typeof field === 'string' && field.startsWith('{{') && field.endsWith('}}')) {
      return eval(field.substring(2, field.length - 2))
    } else {
      return true;
    }
  }

  const renderItem = () => {
    return Object.keys(columns['properties']).map((key: string) => {
      const itemProps: SchemaDescriptionsItemProps = columns?.['properties']?.[key] || {}
      const { label, title, span, component, dataIndex, default: defaultValue, renderable, ...otherItemProps } = itemProps
      const Element = components?.[component]
      const content = Element ? <Element value={data[dataIndex]} /> : data[dataIndex] || defaultValue
      if(!evalRenderabl(renderable)) {
        return null;
      }
      return (
        <DescriptionsItem {...otherItemProps} key={key} label={itemProps.title} span={itemProps.span ?? 1}>
          {content}
        </DescriptionsItem>
      )
    })
  }

  return (
    <Descriptions {...descriptions} {...otherProps}>
      {renderItem()}
    </Descriptions>
  )
}

export default SchemaDescriptions
