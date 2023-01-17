import { Button } from "antd";
import React from 'react';
import styles from './index.module.less';

export interface ToolbarProps {
  
}

export default (props: React.PropsWithChildren<ToolbarProps>) => {
  const {children} = props;
  return (
    <div className={styles.tooltar}>
      {children}
    </div>
  )
}