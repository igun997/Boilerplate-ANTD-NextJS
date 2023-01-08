import Pusher from 'pusher-js';
import { PUSHER_CLIENT_KEY } from '../../constants/config.constant';
import { useEffect, useRef } from 'react';

export type EventProps = {
  channel: string;
  event: string;
  onUpdate: (data: any) => void;
};
type useEventProps = {
  events: EventProps[];
};
const Index = ({ events }: useEventProps) => {
  const refAudio = useRef(null);
  const pusherClient = new Pusher(PUSHER_CLIENT_KEY, {
    cluster: 'ap1',
  });
  useEffect(() => {
    pusherClient.connection.bind('connected', () => {
      console.log('Connected to Pusher');
      if (events) {
        console.log('Loading events', events.length);
        events.forEach((event) => {
          const channel = pusherClient.subscribe(event.channel);
          channel.bind(event.event, (e: any) => {
            if (refAudio?.current) {
              // @ts-ignore
              refAudio.current?.play();
            }
            event.onUpdate(e);
          });
        });
      }
    });
    pusherClient.connection.bind('error', (error: any) => {
      console.log('Error connecting to Pusher', error);
    });
    return () => {
      pusherClient.disconnect();
    };
  }, []);
  const playAudio = (notifRef: any) => {
    const _ref = notifRef || refAudio;
    if (_ref?.current) {
      // @ts-ignore
      _ref.current?.play();
    }
  };
  const renderAudio = (customRef?: any) => {
    return (
      <audio
        ref={customRef ?? refAudio}
        src={'https://anone.oss-ap-southeast-5.aliyuncs.com/audio/notification.wav'}
        preload="auto"
      />
    );
  };
  return {
    pusherClient,
    renderAudio,
    playAudio,
  };
};

export default Index;
