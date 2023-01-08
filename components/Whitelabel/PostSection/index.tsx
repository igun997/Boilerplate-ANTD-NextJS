import { Col, Grid, Row, Typography } from 'antd';
import { FC } from 'react';
import { Resources } from '../../../types/types';
import styles from './index.module.less';
import parse from 'html-react-parser';

const { useBreakpoint } = Grid;
const PostSection: FC<Resources.SectionTypes> = (props) => {
  const { xs } = useBreakpoint();
  return (
    <div className={styles.root}>
      <Row gutter={[10, 10]}>
        <Col
          xs={24}
          style={{
            marginBottom: 20,
          }}
          md={{
            span: 10,
            offset: 7,
          }}>
          <Typography.Text className="postTitle">{props?.data?.title}</Typography.Text>
        </Col>
        <Col
          xs={24}
          md={{
            span: 10,
            offset: 7,
          }}>
          {parse(props?.data?.contents ?? '')}
        </Col>
      </Row>
    </div>
  );
};

export default PostSection;
