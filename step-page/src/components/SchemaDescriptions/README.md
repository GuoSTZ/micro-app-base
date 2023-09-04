# McDescriptions

依赖 antd Descriptions 组件，自定义根据 json 来做渲染的组件

## API

| 参数         | 说明          | 类型     | 默认值        |
| ----------- | ------------ | -------- | ------------ |
| schema      | json数据      | Object   | -            |
| components  | 自定义组件     | Object   | -            |
| data        | 要显示的数据   | Object   | {}           |

## json模板

```json
{
  "descriptions": {
    "bordered": true,
    "column": 2,
    "title": "查看"
  },
  "columns": {
    "type": "object",
    "properties": {
      "test": {
        "type": "string",
        "title": "测试",
        "dataIndex": "test",
        "renderable": "{{$descriptions.data['a']}}"
      }
    }
  }
}
```

## 模板说明

* descriptions 字段

  传递 antd Descriptions 组件属性

* columns

  用来表示所需渲染的字段

* title

  DescriptionItem 组件的 label 值

* renderable

  表示该字段是否渲染，可传入表达式片段

* $descriptions

  内置表达式作用域，代表 McDescriptions 组件的 props 
