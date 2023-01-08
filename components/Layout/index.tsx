import { Col, Grid, Layout, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.module.less';
import HeroSlider, { Overlay, SideNav, Slide } from 'hero-slider';
import TopNavigation from './TopNavigation';
import { useAppSelector } from '../../configs/hooks.config';
import { BASE_API } from '../../constants/config.constant';
import { UpOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Content, Footer } = Layout;
const { useBreakpoint } = Grid;

const BaseLayout: React.FC<any> = ({ children }) => {
  const pageProps = useAppSelector((state) => state.pageProps);
  const [sliders, setSliders] = useState<any>([]);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { xs } = useBreakpoint();
  const onClose = () => {
    setCollapsed(!collapsed);
  };
  useEffect(() => {
    if (xs) {
      setCollapsed(false);
    }
  }, [xs]);

  useEffect(() => {
    if (pageProps?.sliders) {
      setSliders(pageProps?.sliders?.map((slider) => slider?.media?.data?.attributes?.url ?? null));
    }
  }, [pageProps]);

  return (
    <>
      <Layout className={styles.root}>
        <Layout className="site-layout" id="top">
          {!pageProps?.isError && (
            <HeroSlider
              height={
                !pageProps?.haveSlider && pageProps?.header_image?.data === null
                  ? xs
                    ? 100
                    : 300
                  : 600
              }
              accessability={{
                shouldDisplayButtons: false,
                orientation: 'horizontal',
              }}
              autoplay
              controller={{
                initialSlide: 1,
                slidingDuration: 1000,
                slidingDelay: 1000,
              }}>
              <Overlay>
                <TopNavigation
                  black={!pageProps?.haveSlider && pageProps?.header_image?.data === null}
                  key={'desktop'}
                />
              </Overlay>
              {pageProps?.haveSlider &&
                sliders
                  .filter((slider: any) => slider !== null)
                  .map((item: any, index: number) => (
                    <Slide
                      label={`Slide ${index + 1}`}
                      key={index}
                      background={{
                        backgroundImageSrc: `${BASE_API + item}`,
                      }}
                    />
                  ))}
              {!pageProps?.haveSlider && pageProps?.header_image?.data !== null && (
                <Slide
                  label={`Slide 1`}
                  key={'slide-1'}
                  background={{
                    backgroundImageSrc: `${
                      BASE_API + pageProps?.header_image?.data?.attributes?.url
                    }`,
                  }}
                />
              )}
              {!(!pageProps?.haveSlider && pageProps?.header_image?.data !== null) && <SideNav />}
            </HeroSlider>
          )}

          <Content
            className="site-layout-background-content"
            style={{
              minHeight: 280,
            }}>
            {children}
          </Content>
        </Layout>
        {!pageProps?.isError && (
          <Footer className="footer-container">
            <Row>
              <Col
                xs={24}
                md={{
                  span: 10,
                  offset: 7,
                }}>
                <Row gutter={[10, 10]} justify="space-between" align="middle">
                  <Col>
                    <Typography.Text className="footer-text">
                      All content Copyright © 2023. All rights reserved.
                    </Typography.Text>
                  </Col>
                  <Col>
                    <Link href="#top">
                      <UpOutlined
                        style={{
                          fontSize: 20,
                        }}
                      />
                    </Link>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Footer>
        )}
      </Layout>
    </>
  );
};

export default BaseLayout;
