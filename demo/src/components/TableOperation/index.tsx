import React from 'react';
import './index.less';

export interface TableOperationProps {
  
}

export default (props: React.PropsWithChildren<TableOperationProps>) => {
  const { children } = props;
  return (
    <div className='TableOperation'>
      {React.Children.map(children, (child, index) => {
        const newChild = child as React.DetailedReactHTMLElement<any, HTMLElement>;
        return React.cloneElement(newChild, {
          type: 'link',
          className: 'TableOperation-btn',
          ...newChild.props,
        })
      })}
    </div>
  )
}