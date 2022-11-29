import React from 'react';
import { Dropdown, DropDownProps } from 'antd';

export interface DropdownWrapperProps extends DropDownProps {
  children: React.ReactNode;
}

export default (props: DropdownWrapperProps) => {
  const { children, menu } = props;
  return (
    <Dropdown menu={menu}>
      {children}
    </Dropdown>
  )
}