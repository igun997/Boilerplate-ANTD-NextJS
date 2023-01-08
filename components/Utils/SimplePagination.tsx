import { FC } from 'react';
import style from './TableRemote.module.less';
import { Button, Col, Row } from 'antd';
import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';

const index: FC<any> = ({ onPageChange, currentPage, pageSize, totalCount, isAdvance }) => {
  if (currentPage === 0) {
    return null;
  }

  const lastPage = Math.ceil(totalCount / pageSize);

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const onFirst = () => {
    onPageChange(1);
  };

  const onLast = () => {
    onPageChange(lastPage);
  };

  return (
    <div className={style.root}>
      <Row justify="end" gutter={8}>
        <Col>
          <Button
            style={{ background: '#F6F6F6', color: '#101C42' }}
            type="text"
            shape="circle"
            icon={<DoubleLeftOutlined />}
            onClick={onFirst}
            disabled={currentPage === 1 || totalCount === 0}
          />
        </Col>
        <Col>
          <Button
            style={{ background: '#F6F6F6', color: '#101C42' }}
            type="text"
            shape="circle"
            icon={<LeftOutlined />}
            onClick={onPrevious}
            disabled={currentPage === 1 || totalCount === 0}
          />
        </Col>
        <Col>
          <Button
            style={{ background: '#F6F6F6', color: '#101C42' }}
            type="text"
            shape="circle"
            icon={<RightOutlined />}
            onClick={onNext}
            disabled={currentPage === lastPage || totalCount === 0}
          />
        </Col>
        <Col>
          <Button
            style={{ background: '#F6F6F6', color: '#101C42' }}
            type="text"
            shape="circle"
            icon={<DoubleRightOutlined />}
            onClick={onLast}
            disabled={currentPage === lastPage || totalCount === 0}
          />
        </Col>
      </Row>
    </div>
  );
};

export default index;
