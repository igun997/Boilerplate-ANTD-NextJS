import { FC } from 'react';
import { Alert, Button, Typography } from 'antd';
import { useRouter } from 'next/router';

const Index: FC<any> = ({ loadProfile }) => {
  const router = useRouter();
  const navigateToPackages = () => {
    router.push('/packages');
  };

  return (
    <Alert
      showIcon
      type={loadProfile.myProfile.package === null ? 'warning' : 'success'}
      message={
        loadProfile.myProfile.package === null ? (
          <Typography.Text strong>
            Anda belum memiliki paket, silahkan{' '}
            <Button type={'link'} onClick={navigateToPackages}>
              <strong>pilih paket</strong>
            </Button>{' '}
            untuk menggunakan layanan kami.
          </Typography.Text>
        ) : (
          <Typography.Text>
            Anda sedang berlangganan paket <strong>{loadProfile.myProfile.package.name}</strong>
          </Typography.Text>
        )
      }
      description={
        loadProfile.myProfile.package !== null && (
          <Typography.Text type="secondary">
            Anda dapat mengubah paket kapan saja{' '}
            <Button type={'link'} onClick={navigateToPackages}>
              <strong>Pilih Paket</strong>
            </Button>
          </Typography.Text>
        )
      }
    />
  );
};

export default Index;
