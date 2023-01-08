import styles from './index.module.less';
import { Layout } from 'antd';
import React from 'react';

const { Content } = Layout;
const PlainLayout: React.FC<any> = ({ children }) => {
  return (
    <Layout className={styles.root}>
      <Content className="site-layout-background">{children}</Content>
    </Layout>
  );
};

export default PlainLayout;
