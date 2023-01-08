import { ItemType } from 'antd/lib/menu/hooks/useItems';
import React from 'react';
import { RxDashboard } from 'react-icons/rx';

export const menus: ItemType[] = [
  {
    key: '/',
    icon: <RxDashboard />,
    label: 'Home',
  },
];
