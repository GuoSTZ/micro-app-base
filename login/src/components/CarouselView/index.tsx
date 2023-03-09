import React from 'react';
import { Carousel, CarouselProps } from 'antd';
import './index.less';

export interface CarouselViemProps extends CarouselProps {
  dataSource: any[];
}

export default (props: CarouselViemProps) => {
  const { dataSource, className, ...restProps } = props;
  const defaultClassName = 'carousel-view';
  const mergedClassName = className ? `${defaultClassName} ${className}` : defaultClassName;
  return (
    <Carousel className={mergedClassName} dots={{className: "custom-slick"}} {...restProps}>
      {
        dataSource.map((item: any, index: number) => (
          <div className='carousel-view-item' key={index}>
            {item}
          </div>
        ))
      }
    </Carousel>
  )
}