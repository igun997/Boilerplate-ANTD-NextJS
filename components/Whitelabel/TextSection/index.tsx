import { Col, Grid, Row, Typography } from 'antd';
import { FC } from 'react';
import { Resources } from '../../../types/types';
import styles from './index.module.less';

const { useBreakpoint } = Grid;
const TextSection: FC<Resources.SectionTypes> = (props) => {
  const { xs } = useBreakpoint();
  return (
    <div className={styles.root}>
      <Row gutter={[3, 3]}>
        {props?.data?.paragraphs &&
          props?.data?.paragraphs.map((e, i) => (
            <Col
              key={'text-section-' + i + '-' + Math.random()}
              xs={24}
              style={{ ...props?.data?.style }}
              md={{
                span: 10,
                offset: 7,
              }}>
              <Typography.Text>{e}</Typography.Text>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default TextSection;
