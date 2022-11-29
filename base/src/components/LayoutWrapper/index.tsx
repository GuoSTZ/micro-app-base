import { Layout, Menu, Space } from 'antd';
import { MenuItemType } from 'antd/lib/menu/hooks/useItems';
import { cloneDeep } from 'lodash'
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ErrorBoundary from '../ErrorBoundary';
import Breadcrumb from '../Breadcrumb';
import DropdownWrapper from '../DropdownWrapper';
import translateSvg from './images/translate.svg';
import {locale, changeLanguage} from '@/locales';
import styles from './index.module.less';

type RoutesJsonType = {
  id?: string;
  key?: string;
  path: string;
  name?: string;
  icon?: JSX.Element;
  element: JSX.Element;
  children?: Array<RoutesJsonType>;
}

const { Header, Content, Sider } = Layout;

const LayoutWrapper: React.FC<any> = props => {
  const {
    children,
    routes
  } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname, search } = location;
  const pathArr: string[] = pathname.split("/").filter(item => (item !== "" && item !== NAME_SPACE))
  const pathKeys = React.useMemo(() => {
    return pathArr.slice(0, pathArr.length).reverse();
  }, [pathArr]);

  const [openKeys, setOpenKeys] = useState(pathKeys);

  const flatRoutes = (routes: Array<RoutesJsonType>, routesMap: Map<string, Object>) => {
    const newRoutes = cloneDeep(routes);
    const data: Array<RoutesJsonType & MenuItemType> = [];
    newRoutes.every((item: RoutesJsonType) => {
      data.push({
        ...item,
        key: item.id || item.path.replace("/*", ""), // 父菜单没有id，故用path做替代
        label: item.name,
        title: item.name,
        children: item.children ? flatRoutes(item.children, routesMap) : undefined
      })
      routesMap.set(item.id || item.path.replace("/*", ""), item);
      return true;
    })
    return data;
  }

  const [newRoutes, routesMap] = React.useMemo(() => {
    const routesMap = new Map();
    const newRoutes = flatRoutes(routes, routesMap);
    return [newRoutes, routesMap]
  }, [routes])

  const breadcrumbData = React.useMemo(() => {
    return pathArr.map((item: string) => routesMap.get(item)?.name);
  }, [pathArr])

  const handleMenuClick = (event) => {
    const { key, keyPath, domEvent } = event;
    const newPath = keyPath.reverse()?.join("/")
    navigate(`${NAME_SPACE}/${newPath}`);
  }

  const handleMenuOpen = (keys: string[]) => {
    setOpenKeys(keys);
  }

  const languages = [
    {label: "简体中文", key: "zh-CN"}, 
    {label: "English", key: "en-US"}
  ]

  return (
    <ErrorBoundary>
      <Layout className={styles.baseLayout}>
        <Header className={styles.baseHeader}>
          <div className={styles.leftHeader}>
            <img src="/logo192.png" alt="" width={24} />
            <span>{locale("base.HEADER")}</span>
          </div>
          <div className={styles.emptyBlock}></div>
          <Space className={styles.rightHeader}>
            <DropdownWrapper 
              menu={{ items: languages, onClick: (options: any) => {
                changeLanguage(options?.key);
                window.location.reload();
              } }}>
              <span className={styles.translateIcon}>
                <img src={translateSvg} alt="" width={18} />
              </span>
            </DropdownWrapper>
          </Space>
        </Header>
        <Layout>
          <Sider width={200}>
            <Menu
              mode="inline"
              selectedKeys={pathKeys}
              openKeys={openKeys}
              style={{ height: '100%', borderRight: 0 }}
              items={newRoutes}
              onClick={handleMenuClick}
              onOpenChange={handleMenuOpen}
            />
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb data={breadcrumbData}/>
            <Content
              className={styles.baseContent}
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </ErrorBoundary>
  );
}

export default LayoutWrapper;