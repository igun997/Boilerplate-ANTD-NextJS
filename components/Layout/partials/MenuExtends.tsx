import React, { FC, useEffect } from 'react';
import { Menu } from 'antd';
import { menus } from '../../../constants/menu.constant';
import { useRouter } from 'next/router';
import style from './menu.module.less';

const MenuExtends: FC<{ theme?: 'light' | 'dark'; onClose?: any }> = ({ theme, onClose }) => {
  const router = useRouter();
  const [current, setCurrent] = React.useState<string[]>([]);
  const handleClick = (e: any) => {
    if (onClose) {
      onClose();
    }
    router.push(e.key);
  };

  useEffect(() => {
    setCurrent([router.pathname]);
  }, [router.pathname]);

  return (
    <div className={style.root}>
      <Menu
        onClick={handleClick}
        className={'maumenu'}
        theme={theme ?? 'dark'}
        mode="vertical"
        defaultSelectedKeys={current}
        selectedKeys={current}
        items={menus}
      />
    </div>
  );
};

export default MenuExtends;
