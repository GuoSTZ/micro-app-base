import React from 'react';
import './index.less';

export interface CircleLoadingProps {
}

export default (props: CircleLoadingProps) => {

  return (
    <div className='CircleLoading'>
      {
        new Array(36).fill('').map(() => (
          <div className='circle'></div>
        ))
      }
    </div>
  )
}