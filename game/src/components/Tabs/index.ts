import './index.less';

type DataType = {
  key: string;
  label: string;
  children: HTMLElement|string;
}

interface TabsProps {
  data: DataType[]
}

export default class Tabs {
  data: TabsProps['data'];

  constructor(props: TabsProps) {
    this.data = props.data || [];
  }

  render() {
    const tabs = document.createElement('div')
    tabs.classList.add('tabs')
    const tabsFragment = document.createDocumentFragment()
    const tabsNav = document.createElement('div')
    tabsNav.classList.add('tabs-nav')
    const tabsContent = document.createElement('div')
    tabsContent.classList.add('tabs-content')

    tabsFragment.appendChild(tabsNav)
    tabsFragment.appendChild(tabsContent)
    tabs.appendChild(tabsFragment)

    // fragment 处理
    const navFragment = document.createDocumentFragment();
    const contentFragment = document.createDocumentFragment();

    const dataObj = {
      nav: [],
      content: []
    }

    this.data.forEach((item, index) => {
      // 创建nav子元素
      const tabs_nav_item = document.createElement('div');
      tabs_nav_item.classList.add('tabs-nav-item');
      // 直接默认选中第一项
      index === 0 && (tabs_nav_item.classList.add('tabs-nav-item-active'))
      tabs_nav_item.innerHTML = item.label;
      navFragment.appendChild(tabs_nav_item);
      dataObj['nav'].push(tabs_nav_item)

      // 暂时直接创建content子元素，后续可根据点击tab时创建
      const tabs_content_item = document.createElement('div');
      tabs_content_item.classList.add('tabs-content-item');
      // 直接默认展示第一项
      index === 0 && (tabs_content_item.classList.add('tabs-content-item-active'))
      index !== 0 && (tabs_content_item.classList.add('tabs-content-item-hidden'))
      tabs_content_item.innerHTML = typeof item.children === 'string' ? item.children : item.children.outerHTML;
      contentFragment.appendChild(tabs_content_item);
      dataObj['content'].push(tabs_content_item)
    })

    tabsNav.appendChild(navFragment)
    tabsContent.appendChild(contentFragment)

    dataObj['nav'].forEach((item, index) => {
      item.addEventListener('click', () => {
        // 点击非激活状态下的 tab nav 时
        if (!item.classList.contains('tabs-nav-item-active')) {
          const currentTabNav = document.querySelector('.tabs-nav-item-active');
          currentTabNav.classList.remove('tabs-nav-item-active')
          item.classList.add('tabs-nav-item-active')

          // 切换tab时，清空要被切换的tab content 的显示状态，同时添加隐藏状态
          const currentTabPanel = document.querySelector('.tabs-content-item-active');
          currentTabPanel.classList.add('tabs-content-item-hidden')
          currentTabPanel.classList.remove('tabs-content-item-active')

          dataObj['content'][index].classList.add('tabs-content-item-active')
          dataObj['content'][index].classList.remove('tabs-content-item-hidden')
        }
      })
    })

    return tabs
  }
}