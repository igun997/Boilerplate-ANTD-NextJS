import styled from '@emotion/styled';
import { FC } from 'react';
import { Resources } from '../../../types/types';
import styles from './index.module.less';
import { Col, Row } from 'antd';

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

const ButtonSection: FC<Resources.SectionTypes> = (props) => {
  return (
    <div className={styles.root}>
      <Row gutter={[10, 10]}>
        <Col
          xs={24}
          md={{
            span: 10,
            offset: 7,
          }}>
          <ButtonGetInTouch target="_blank" href={props?.data?.url ?? '/'}>
            {props?.data?.text}
          </ButtonGetInTouch>
        </Col>
      </Row>
    </div>
  );
};

export default ButtonSection;
