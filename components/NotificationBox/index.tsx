import React from 'react';
import { Button, Col, List, Modal, Row, Tooltip, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from '../../configs/hooks.config';
import {
  clearConversations,
  ConversationsState,
  removeConversation,
} from '../../redux/slices/event';
import { useRouter } from 'next/router';
import { DeleteFilled } from '@ant-design/icons';

const Index = ({ visible, onCancel }: any) => {
  const event = useAppSelector((state) => state.event);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleClicked = (item: any) => {
    // TODO : handle clicked
    onCancel();
    router.push(`/crm/chat/${item?.conversation_id}`).then(() => {
      dispatch(removeConversation(item?.conversation_id));
    });
  };

  const clearNotification = () => {
    dispatch(clearConversations());
  };

  return (
    <Modal closable={false} visible={visible} footer={null} onCancel={onCancel}>
      <List
        itemLayout="horizontal"
        header={
          <Row gutter={[5, 5]} align={'middle'} justify={'space-between'}>
            <Col>
              <Typography.Text
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                }}>
                Notifikasi
              </Typography.Text>
            </Col>
            <Col>
              <Tooltip title={'Bersihkan Notifikasi'}>
                <Button
                  hidden={event.conversations.length === 0}
                  onClick={clearNotification}
                  icon={<DeleteFilled />}
                  type="link"
                />
              </Tooltip>
            </Col>
          </Row>
        }
        dataSource={event.conversations}
        renderItem={(item: ConversationsState) => (
          <List.Item onClick={() => handleClicked(item)} style={{ cursor: 'pointer' }}>
            <List.Item.Meta
              title={<Typography.Text>Pesan baru tiba</Typography.Text>}
              description={
                <Typography.Text>
                  Pesan baru dari{' '}
                  <span style={{ fontWeight: 600 }}>
                    {item.customer_name ?? item.customer_phone}
                  </span>
                </Typography.Text>
              }
            />
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default Index;
