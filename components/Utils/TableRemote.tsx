import { FC } from 'react';
import T from 'prop-types';
import style from './TableRemote.module.less';
import { Col, Grid, Input, Row, Select, Table } from 'antd';
import Pagination from './SimplePagination';

const { Option } = Select;
const { useBreakpoint } = Grid;

const TableRemote: FC<any> = ({
  dataSource,
  columns,
  onPageChange,
  onSizeChange,
  infoPaging,
  withNumber = false,
  withSearch = false,
  withOthers = false,
  ...rest
}) => {
  const { sm, md } = useBreakpoint();
  const total = infoPaging?.total || 0;
  const currentPage = infoPaging?.currentPage || 1;
  const pageSize = infoPaging?.pageSize || 5;
  const startItem = total === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = total === 0 ? 0 : currentPage * pageSize;

  const numberColumn = [
    {
      title: 'No',
      key: 'index',
      render: (value: any, item: any, index: any) => (currentPage - 1) * pageSize + (index + 1),
    },
  ];

  return (
    <div className={style.root}>
      <Row gutter={[10, 10]}>
        <Col xs={24} md={6} hidden={!withSearch}>
          <Input.Search onSearch={withSearch} placeholder={'Cari data'} />
        </Col>
        {withOthers && (
          <Col xs={24} md={18}>
            {withOthers}
          </Col>
        )}
        <Col span={24}>
          <Table
            rowClassName={(record, index) =>
              index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
            }
            dataSource={dataSource}
            pagination={false}
            scroll={{ x: 800 }}
            columns={withNumber ? [...numberColumn, ...columns] : columns}
            {...rest}
          />
        </Col>
      </Row>

      {infoPaging !== false && (
        <Row
          justify={!md ? 'space-between' : 'end'}
          style={{
            marginTop: 10,
          }}
          align="middle"
          className="action-bottom">
          <Col xl={{ span: 8 }} lg={{ span: 8 }} xs={{ span: 24 }}>
            <Row justify={sm ? 'space-between' : 'end'} gutter={24} align="middle">
              <Col lg={16} md={16} xs={16}>
                Baris per halaman
              </Col>
              <Col lg={8} md={8} xs={8}>
                <Select
                  className="select-size"
                  style={{
                    width: '100%',
                  }}
                  defaultValue={pageSize}
                  onChange={onSizeChange}>
                  <Option value={5}>5</Option>
                  <Option value={10}>10</Option>
                  <Option value={20}>20</Option>
                </Select>
              </Col>
            </Row>
          </Col>

          <Col xl={{ span: 4 }} lg={{ span: 4 }} xs={{ span: 8 }}>
            {startItem} - {endItem > total ? total : endItem} dari {total}
          </Col>
          <Col xl={{ span: 7 }} lg={{ span: 7 }} md={{ span: 12 }} xs={16} className="text-right">
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={total}
              pageSize={pageSize}
              onPageChange={onPageChange}
            />
          </Col>
        </Row>
      )}
    </div>
  );
};

TableRemote.propTypes = {
  dataSource: T.array,
  columns: T.array,
  onPageChange: T.func,
  onSizeChange: T.func,
  infoPaging: T.oneOfType([
    T.shape({
      pageSize: T.number,
      total: T.number,
      currentPage: T.number,
    }),
    T.bool,
  ]),
};

TableRemote.defaultProps = {
  dataSource: [],
  columns: [],
  onPageChange: () => {},
  onSizeChange: () => {},
  infoPaging: {
    pageSize: 5,
    total: 0,
    currentPage: 1,
  },
};

export default TableRemote;
