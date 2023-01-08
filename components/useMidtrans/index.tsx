import { useEffect } from 'react';
import { MIDTRANS_CK, MIDTRANS_URL } from '../../constants/config.constant';
import { notification } from 'antd';
import { CheckCircleFilled, ClockCircleFilled, HourglassOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

const Index: ({ refetch }: { refetch: () => void; path?: string }) => {
  triggerSnapPay: (token: any) => void;
} = ({ refetch, path }) => {
  const router = useRouter();
  const triggerSnapPay = (token: any) => {
    const cloneWindow: any = window;
    if (typeof cloneWindow.snap !== 'undefined' && token) {
      cloneWindow.snap.pay(token, {
        onSuccess: function () {
          notification.success({
            message: 'Pembayaran Berhasil',
            description: 'Pembayaran tagihan anda berhasil',
            icon: (
              <CheckCircleFilled
                style={{
                  color: '#52c41a',
                }}
              />
            ),
          });
          if (path === undefined) {
            refetch();
          } else {
            router.push(path);
          }
        },
        onPending: function () {
          notification.info({
            message: 'Silahkan Tunggu',
            description: 'Pembayaran anda sedang diproses',
            icon: (
              <HourglassOutlined
                style={{
                  color: '#faad14',
                }}
              />
            ),
          });
          if (path === undefined) {
            refetch();
          } else {
            router.push(path);
          }
        },
        onError: function () {
          notification.error({
            message: 'Pembayaran Gagal',
            description: 'Pembayaran tagihan anda gagal',
            icon: (
              <ClockCircleFilled
                style={{
                  color: '#f5222d',
                }}
              />
            ),
          });
        },
        onClose: function () {
          notification.info({
            message: 'Pembayaran Ditangguhkan',
            description: 'Anda bisa membayar tagihan anda nanti di halaman ini',
            icon: (
              <ClockCircleFilled
                style={{
                  color: 'grey',
                }}
              />
            ),
          });
          if (path === undefined) {
            refetch();
          } else {
            router.push(path);
          }
        },
      });
    }
  };
  useEffect(() => {
    const snapSrcUrl = MIDTRANS_URL ?? '';
    const myMidtransClientKey = MIDTRANS_CK;
    const script = document.createElement('script');
    script.src = snapSrcUrl;
    script.setAttribute('data-client-key', myMidtransClientKey);
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return {
    triggerSnapPay,
  };
};

export default Index;
