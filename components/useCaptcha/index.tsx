import { useState } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';

const useCaptcha: ({ siteKey }: { siteKey: any }) => {
  captcha: string;
  renderCaptcha: () => JSX.Element;
} = ({ siteKey }) => {
  const [captcha, setCaptcha] = useState<string>('');
  const renderCaptcha = () => {
    return (
      <Turnstile
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
        siteKey={siteKey}
        onErrorCapture={(e: any) => {
          console.log('Err', e);
        }}
        onSuccess={(e) => setCaptcha(e)}
        autoResetOnExpire
      />
    );
  };
  return {
    renderCaptcha,
    captcha,
  };
};

export default useCaptcha;
