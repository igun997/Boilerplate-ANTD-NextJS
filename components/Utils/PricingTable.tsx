import { Button } from 'antd';
import { FC } from 'react';
import style from './PricingTable.module.less';
import { formatCurrency } from '../../utils/global.util';
import ReactHtmlParser from 'react-html-parser';

const PricingTable: FC<{ data: any[]; handleClick: (id: any) => void; currentKey: number }> = ({
  data,
  handleClick,
  currentKey,
}) => {
  return (
    <div className={style.root}>
      {data &&
        data.map((item) => (
          <div key={item.package_id} className="columns">
            <ul className="price">
              <li
                className="header"
                style={
                  item.recommended
                    ? {
                        backgroundColor: '#04AA6D',
                      }
                    : {}
                }>
                {item.name}
              </li>
              <li className="grey">{formatCurrency(item.price ?? 0)} / bulan</li>
              {item.features.map((feature: any, i: number) => (
                <li key={i}>{ReactHtmlParser(feature)}</li>
              ))}
              <li className="grey end">
                <Button
                  disabled={currentKey === item.package_id}
                  type={'primary'}
                  size={'large'}
                  block
                  onClick={() => handleClick(item.package_id)}>
                  {currentKey === item.package_id ? 'Paket Anda Sekarang' : 'Pilih Paket'}
                </Button>
              </li>
            </ul>
          </div>
        ))}
    </div>
  );
};

export default PricingTable;
