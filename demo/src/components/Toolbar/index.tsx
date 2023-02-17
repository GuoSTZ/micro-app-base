import React from 'react';
import styles from './index.module.less';

export interface ToolbarProps {
  className?: string;
}

export default (props: React.PropsWithChildren<ToolbarProps>) => {
  const {children, className} = props;
  const mergedClassName = className ? `${styles.tooltar} ${className}` : styles.tooltar;
  return (
    <div className={mergedClassName}>
      {children}
    </div>
  )
}