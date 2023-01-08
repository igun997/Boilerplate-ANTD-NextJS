import { FC } from 'react';
import { Button, Result } from 'antd';
import { useRouter } from 'next/router';

const Index: FC<any> = () => {
  const route = useRouter();
  return (
    <Result
      status="404"
      title="Halaman Tidak Ditemukan"
      subTitle="Maaf, halaman yang Anda cari tidak ditemukan"
      extra={
        <Button onClick={() => route.replace('/')} type="primary">
          Kembali
        </Button>
      }
    />
  );
};

export default Index;
