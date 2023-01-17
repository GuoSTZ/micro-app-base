import { Button } from 'antd';
import React from 'react';
import styles from './index.module.less';

export interface PanelProps {
  className?: string;
  title?: React.ReactNode;
  handleCancel: React.MouseEventHandler<HTMLAnchorElement> & React.MouseEventHandler<HTMLButtonElement>;
  footer?: React.ReactNode;
}

export default (props: React.PropsWithChildren<PanelProps>) => {
  const { children, className, footer, title, handleCancel } = props;
  const mergedClassName = className ? `${styles['panel']} ${className}` : `${styles['panel']}`
  const defaultFooter = (
    <Button
      type='primary'
      ghost
      onClick={handleCancel}>
      返回
    </Button>
  )
  return (
    <div className={mergedClassName}>
      {title ? <div className={styles['panel-title']}>{title}</div> : null}
      <div className={styles['panel-content']}>{children}</div>
      {footer === false ? null : (
        <div className={styles['panel-footer']}>
          {footer ? footer : defaultFooter}
        </div>
      )}
    </div>
  )
}