import { Button, Col, Drawer, Dropdown, Grid, Image, Layout, Menu, Row, Space } from 'antd';
import styles from '../index.module.less';
import React from 'react';
import styled from '@emotion/styled';
import { MenuOutlined } from '@ant-design/icons';
import MobileMenu from '../MobileMenu';
import { useRouter } from 'next/router';
import LogoBlack from '../../../assets/images/black-192.png';
import LogoWhite from '../../../assets/images/white-192.png';

export type _MenuTypes = {
  slug: string | null;
  name: string;
  children?: _MenuTypes[];
};
const _menus: _MenuTypes[] = [
  {
    slug: 'home',
    name: 'Home',
  },
  {
    slug: 'about',
    name: 'About',
  },
  {
    slug: null,
    name: 'Portfolio',
    children: [
      {
        name: 'Wedding',
        slug: 'wedding',
      },
      {
        slug: 'engagement',
        name: 'Engagement',
      },
      {
        name: 'Couple Session',
        slug: 'couple-session',
      },
    ],
  },
  {
    slug: 'contact',
    name: 'Contact',
  },
];
const HeaderWrapper: any = styled.div`
  .ant-btn {
    color: ${(props: any) => (props?.gotBlack ? 'var(--primary-headings)' : '#fff')} !important;
    font-size: 1rem;
    font-family: 'Tenor Sans', sans-serif;
    line-height: 1.5rem;
    font-weight: 500;
  }
`;
const { Header } = Layout;
const { useBreakpoint } = Grid;
const TopNavigation = (props: any) => {
  const { xs } = useBreakpoint();
  const router = useRouter();
  const [logo, setLogo] = React.useState<any>(LogoWhite.src);
  const [open, setOpen] = React.useState(false);
  const [leftMenus, setLeftMenus] = React.useState<_MenuTypes[]>([]);
  const [rightMenus, setRightMenus] = React.useState<_MenuTypes[]>([]);
  const handleOpen = () => {
    setOpen(!open);
  };
  const navigateTo = (slug: string | null) => {
    if (slug) {
      router.push(`/${slug}`);
    }
  };

  const createDesktopMenu = (item: _MenuTypes) => {
    // create menu with Button component if item has no children
    if (!item?.children) {
      return (
        <Col key={`single-${item.slug ?? Math.random()}`}>
          <Button key={item?.slug} type="link" onClick={() => navigateTo(item?.slug)}>
            {item?.name}
          </Button>
        </Col>
      );
    }
    // create menu with Dropdown component if item has children
    const MenuChildren = (
      <>
        <Menu key={`sub-multi-${item.slug ?? Math.random()}`}>
          {item?.children?.map((child) => (
            <Menu.Item
              key={`menu-${child.slug ?? Math.random()}`}
              onClick={() => navigateTo(child?.slug)}>
              {child?.name}
            </Menu.Item>
          ))}
        </Menu>
      </>
    );
    return (
      <Col key={`col-${item.slug ?? Math.random()}`}>
        <Dropdown
          key={`multi-${item.slug ?? Math.random()}`}
          overlayClassName={styles.dropdownMenu}
          overlay={MenuChildren}
          placement="bottom">
          <Button
            type="link"
            key={`btn-${item.slug ?? Math.random()}`}
            onClick={() => navigateTo(item?.slug)}>
            <Space>{item.name}</Space>
          </Button>
        </Dropdown>
      </Col>
    );
  };

  React.useEffect(() => {
    // calculate left and right menus must be 0 if divide by 2
    const _leftMenus: _MenuTypes[] = [];
    const _rightMenus: _MenuTypes[] = [];
    // count _menus
    const _count = _menus.length;
    // if _count is odd number
    const _half = Math.round(_count / 2);
    _menus.forEach((item) => {
      if (_leftMenus.length < _half) {
        _leftMenus.push(item);
      } else {
        _rightMenus.push(item);
      }
    });
    setLeftMenus(_leftMenus);
    setRightMenus(_rightMenus);
  }, []);

  React.useEffect(() => {
    if (props?.black) {
      setLogo(LogoBlack.src);
    } else {
      setLogo(LogoWhite.src);
    }
  }, [props?.black]);

  return (
    <Header
      className="site-layout-menu"
      style={xs ? { paddingLeft: 10, paddingRight: 10 } : { marginTop: 20 }}>
      <HeaderWrapper gotBlack={props?.black}>
        {xs ? (
          <>
            <Row justify={'space-between'} align="middle">
              <Col>
                <Image src={logo} height={96} preview={false} className={styles.logo} />
              </Col>
              <Col>
                <Button onClick={handleOpen} type="link">
                  Menu <MenuOutlined />
                </Button>
              </Col>
            </Row>
            <Drawer
              bodyStyle={{
                paddingRight: 0,
                paddingLeft: 0,
              }}
              contentWrapperStyle={{
                backgroundColor: 'var(--primary-background)',
              }}
              placement="right"
              onClose={handleOpen}
              visible={open}
              key={'right-drawer'}>
              <MobileMenu menus={_menus} navigate={navigateTo} closeDrawer={handleOpen} />
            </Drawer>
          </>
        ) : (
          <Row justify={'space-between'} align="middle">
            <Col
              xs={24}
              md={{
                span: 12,
                offset: 6,
              }}>
              <Row gutter={[5, 5]} justify={'space-between'} align="middle">
                {leftMenus.map((item) => createDesktopMenu(item))}
                <Col>
                  <Image src={logo} height={160} preview={false} className={styles.logo} />
                </Col>
                {rightMenus.map((item) => createDesktopMenu(item))}
              </Row>
            </Col>
          </Row>
        )}
      </HeaderWrapper>
    </Header>
  );
};

export default TopNavigation;
