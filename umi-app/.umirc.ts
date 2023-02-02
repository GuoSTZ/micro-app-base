import { defineConfig, IConfig } from 'dumi';
import { resolve } from "path";
import packageJson from './package.json';
import routes from './src/routes'

const PORT = 8092;
const NAME_SPACE = packageJson.name;

export default defineConfig({
  title: NAME_SPACE,
  // favicon: '',
  // logo: '',
  // 别名配置
  alias: {
    "@": resolve(__dirname, "./src"),
  },
  outputPath: 'docs-dist',
  // more config: https://d.umijs.org/config
  headScripts: [],
  devServer: {
    port: PORT,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
  theme: {
    '@red-6': '#FF3D55', //红色系基础色
    '@volcano-6': '#FF6537', //橙色系基础色
    '@gold-6': '#FACA46', //黄色系基础色
    '@green-6': '#1AD999', //绿色系基础色
    '@blue-6': '#3385FF', //蓝色系基础色
    '@purple-6': '#935DD9', //紫色系基础色
    '@primary-color': '#3385FF', //按钮主色
    '@heading-color': '#081333', //表格表头文字主色
    '@text-color': '#38415C', //文本主色，比如面包屑的当前文字主色,表格行文字颜色
    '@text-color-secondary': '#82899E', //次文本主色
    '@disabled-color': '#AFB5C7', //禁用颜色
    '@border-color-base': '#CED2DE', //边框颜色，组件的外框
    '@background-color-base': '#F0F1F5', //基础背景色
    '@border-color-split': '#E6E9F0', //分割线颜色，组件内部的边框
    '@border-radius-base': '2px', // 组件/浮层圆角
    '@background-color-light': '#f7f8fa', // 表头背景颜色
    '@item-hover-bg': '#f7f8fa', // 下拉框 hover 颜色
    '@item-active-bg': '#f0f8ff', // 下拉框 active 颜色
    '@btn-danger-bg': '#ff3d55', // 危险按钮 背景颜色
    '@btn-danger-border': '#ff3d55', // 危险按钮 边框颜色
    '@input-placeholder-color': '#afb5c7', // 表单 placeholder 颜色
    '@label-color': '#82899e', // 表单label 颜色
    '@comment-author-time-color': '#afb5c7', // 评论 时间颜色
    '@table-header-icon-color': '#82899e', // 表格 表头 icon颜色
    '@form-item-margin-bottom': '16px', // 表格item 距离底部边距
    '@table-expanded-row-bg': '#f7f8fa', // 表格展开背景色
  },
  lessLoader: {
    modifyVars: {},
  },
  // 设置 node_modules 目录下依赖文件的编译方式
  nodeModulesTransform: {
    /**
     * @type
     * all - 全部编译
     * none - 默认编译
     */
    type: 'none',
    // all - exclude 不编译依赖库
    // none - exclude 额外编译依赖库
    exclude: undefined
  },
  // 路由
  routes: routes,
  // 热更新
  fastRefresh: {}
} as IConfig);
