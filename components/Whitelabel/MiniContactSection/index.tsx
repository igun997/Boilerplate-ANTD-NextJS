import { Col, Divider, Grid, Row, Typography } from 'antd';
import { FC } from 'react';
import { Resources } from '../../../types/types';
import styles from './index.module.less';
import styled from '@emotion/styled';

const { useBreakpoint } = Grid;
const ButtonGetInTouch: any = styled.a`
  background: var(--button-background);
  color: #fff;
  padding: 1rem;
  border-radius: 0rem;
  font-size: 1rem;
  font-family: 'Tenor Sans', sans-serif;
  font-weight: 500;

  &:hover {
    color: #fff;
    background: var(--button-background-hover);
  }
`;
const MiniContactSection: FC<Resources.SectionTypes> = (props) => {
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
          <Row gutter={[10, 10]}>
            <Col xs={24}>
              <Typography.Text className={'header'}>{props.data.title}</Typography.Text>
            </Col>
            <Col xs={24}>
              <Divider style={{ borderColor: 'white' }} orientation="center" type="horizontal" />
            </Col>
            {props?.data?.paragraphs &&
              props?.data?.paragraphs?.map((item, index) => (
                <Col key={index} xs={24} md={16} xxl={12}>
                  <Typography.Text className={'content'}>{item}</Typography.Text>
                </Col>
              ))}
            <Col
              xs={24}
              style={{
                marginTop: 20,
              }}>
              <ButtonGetInTouch target="_blank" href={props?.data?.url ?? '/'}>
                {props?.data?.text}
              </ButtonGetInTouch>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default MiniContactSection;
