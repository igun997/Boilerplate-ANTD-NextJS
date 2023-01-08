import styles from './index.module.less';
import { FC, useEffect, useState } from 'react';
import { Resources } from '../../../types/types';
import { Col, Divider, Grid, Row, Skeleton, Space, Typography } from 'antd';
import styled from '@emotion/styled';
import { RightOutlined } from '@ant-design/icons';
import useLoading from '../../useLoading';
import { getPostByType } from '../../../services/root';
import { RootResources } from '../../../types/services/root';
import { BASE_API } from '../../../constants/config.constant';
import { useRouter } from 'next/router';
import { capitalizeFirstLetter } from '../../../utils/global.util';

const CardList: any = styled.div`
  background: url('${(props: any) => props.image}');
  color: #fff;
  width: auto;
  box-shadow: inset 0 0 0 2000px rgba(19, 18, 18, 0.4);
  height: ${(props: any) => props?.height}px;
  background-size: cover;
  cursor: pointer;

  .centering {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 6rem;
    transition: all 0.3s ease-in-out;

    &:hover {
      transform: scale(1.1);
    }
  }

  .ant-typography {
    font-family: 'Tenor Sans', sans-serif;
    color: #fff;
    font-size: ${(props: any) => (props?.isMobile ? 1.7 : 1.25)}rem;
  }

  &:hover {
    box-shadow: inset 0 0 0 2000px rgba(19, 18, 18, 0.6);
  }
`;
const { useBreakpoint } = Grid;
const WelcomeSection: FC<Resources.SectionTypes> = (props) => {
  const loadingPortfolio = useLoading();
  const router = useRouter();
  const [portfolio, setPortfolio] = useState<RootResources.getPostTypes.data[]>([]);
  const loadPortfolio = () => {
    loadingPortfolio.handleLoading(true);
    getPostByType('portfolio', false)
      .then((res) => {
        setPortfolio(res.data && res.data.map((item) => item.attributes));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        loadingPortfolio.handleLoading(false);
      });
  };
  const { xs } = useBreakpoint();
  const navigateToPortfolio = (slug?: string) => {
    if (slug) {
      router.push('/post/slug/' + slug);
    }
  };
  useEffect(() => {
    loadPortfolio();
  }, []);
  useEffect(() => {
    console.log('portfolio', portfolio);
  }, [portfolio]);
  return (
    <div className={styles.root}>
      <Row gutter={[10, 10]}>
        <Col
          xs={24}
          md={{
            span: 10,
            offset: 7,
          }}>
          <Row gutter={[10, 10]}>
            <Col
              xs={24}
              style={{
                textAlign: 'center',
              }}>
              <Typography.Text className={'header'}>{props.data.title}</Typography.Text>
            </Col>
            <Col xs={24}>
              <Row
                gutter={[20, 20]}
                style={{
                  padding: 10,
                }}>
                {props?.data?.paragraphs &&
                  props?.data?.paragraphs?.map((item, index) => (
                    <Col key={index} xs={24}>
                      <Typography.Text className={'content'}>{item}</Typography.Text>
                    </Col>
                  ))}
              </Row>
            </Col>
            <Col xs={24}>
              <Row
                style={{
                  padding: 10,
                }}>
                <Col xs={24}>
                  <Divider orientation="center" type="horizontal" />
                </Col>
                <Col xs={24}>
                  <Col xs={24}>
                    {loadingPortfolio.loading ? (
                      <Skeleton loading />
                    ) : (
                      <Row gutter={[10, 10]}>
                        {portfolio.map((item, index) => (
                          <Col key={`image-${index}`} xs={24} md={12} xxl={8}>
                            <CardList
                              onClick={() => navigateToPortfolio(item.slug)}
                              height={269}
                              isMobile={xs}
                              image={`${BASE_API}${item.featured?.data.attributes.url}`}>
                              <div className={'centering'}>
                                <Space direction={'vertical'} align="center">
                                  <Typography.Text className={'cardTitle'}>
                                    {capitalizeFirstLetter(item.category)}
                                  </Typography.Text>
                                  <Typography.Text className={'cardSubtitle'}>
                                    {item.title}
                                  </Typography.Text>
                                  <RightOutlined />
                                </Space>
                              </div>
                            </CardList>
                          </Col>
                        ))}
                      </Row>
                    )}
                  </Col>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default WelcomeSection;
