import styles from './index.module.less';
import { Menu, MenuProps } from 'antd';
import React, { useEffect } from 'react';
import { _MenuTypes } from '../TopNavigation';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

// const items: MenuProps['items'] = [
//   getItem('Navigasi', 'sub1', null, [getItem('Item 1', 'sub1-1', null)]),
// ];
const MobileMenu = (props: any) => {
  const [items, setItems] = React.useState<MenuProps['items']>([]);
  const handleClick = (e: any) => {
    props?.navigate && props?.navigate(e.key);
    props?.closeDrawer && props?.closeDrawer();
  };
  useEffect(() => {
    if (props?.menus) {
      const menus: _MenuTypes[] = props?.menus;
      const _items: MenuProps['items'] = menus.map((menu) =>
        getItem(
          menu.name,
          menu.slug ?? '',
          null,
          menu?.children
            ? menu?.children?.map((child) => getItem(child.name, child.slug ?? '', null))
            : undefined,
        ),
      );
      setItems(_items);
    }
  }, [props]);
  return (
    <div className={styles.root}>
      <Menu onClick={handleClick} style={{ width: '100%' }} mode="inline" items={items} />
    </div>
  );
};

export default MobileMenu;
