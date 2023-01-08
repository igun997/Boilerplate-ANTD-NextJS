import { FC } from 'react';
import { Resources } from '../../../types/types';
import styles from './index.module.less';
import { Col, Grid, Row, Typography } from 'antd';
import { InstagramOutlined } from '@ant-design/icons';
import { InstagramEmbed } from 'react-social-media-embed';

const { useBreakpoint } = Grid;
const InstagramFull: FC<Resources.SectionTypes> = (props) => {
  const { xs } = useBreakpoint();
  return (
    <div className={styles.root}>
      <Row gutter={[10, 10]}>
        <Col
          xs={24}
          md={{
            span: 10,
            offset: 7,
          }}>
          <Row gutter={[10, 10]} align="middle">
            {props?.data?.embed_ig && (
              <Col xs={24} md={12}>
                <InstagramEmbed url={props?.data?.embed_ig ?? ''} width="100%" />
              </Col>
            )}
            <Col xs={24} md={12}>
              <Row
                gutter={[10, 20]}
                align="middle"
                style={{
                  textAlign: 'center',
                }}>
                <Col xs={24}>
                  <InstagramOutlined style={{ fontSize: 30 }} />
                </Col>
                <Col xs={24}>
                  <Typography.Text className={'label'}>Follow our Instagram</Typography.Text>
                </Col>
                <Col xs={24}>
                  <Typography.Link
                    target="_blank"
                    href={`https://www.instagram.com/${props?.data?.username}`}
                    className={'username'}>
                    @{props?.data?.username}
                  </Typography.Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default InstagramFull;
