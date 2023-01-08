import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from '@emotion/styled';
import { colors } from '@atlaskit/theme';

const TaskInformation: any = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 15px;
  min-height: 106px;
  border-radius: 8px;
  max-width: 311px;
  background: ${(props: any) =>
    props?.isDragging
      ? 'linear-gradient(90deg, #55c48b, #01849f)'
      : props?.status === 'Handled'
      ? colors.Y300
      : props?.status === 'Closed'
      ? colors.G300
      : colors.N200};
  margin-top: 15px;
  box-sizing: border-box;
  border: 1px solid
    ${(props: any) =>
      props?.isDragging
        ? 'none'
        : props?.status === 'Handled'
        ? colors.Y300
        : props?.status === 'Closed'
        ? colors.G300
        : colors.N200};
  color: ${(props: any) =>
    props?.isDragging ? 'white' : props?.status === 'Handled' ? colors.N800 : colors.N0};
  border-color: ${(props: any) =>
    props?.isDragging
      ? colors.B300
      : props?.status === 'Handled'
      ? colors.Y300
      : props?.status === 'Closed'
      ? colors.G300
      : colors.N200};
  box-shadow: ${(props: any) =>
    props?.isDragging
      ? 'rgba(149, 157, 165, 0.2) 0px 8px 24px;'
      : '5px 4px 0px 0px rgb(0 0 0 / 10%)'};

  .customer-section {
    font-weight: bold;
    font-size: 14px;
  }

  .question-section {
    border: 1px solid ${(props: any) => (props?.status === 'Handled' ? colors.N800 : colors.N0)};
    border-radius: 8px;
    padding: 5px;
    margin-bottom: 5px;
    width: 100%;
    font-size: 12px;

    .title {
      font-weight: bold;
      font-size: 12px;
    }
  }

  .secondary-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 12px;
    font-weight: 600;
    color: ${(props: any) => (props?.status === 'Handled' ? colors.N800 : colors.N0)};
  }
`;

const TaskCard = ({ item, index, onClick }: any) => {
  return (
    <Draggable key={String(item.id)} draggableId={String(item.id)} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={onClick}>
          <TaskInformation status={item.status} isDragging={snapshot.isDragging}>
            <div className="customer-section">
              <p>{item.customer_name}</p>
            </div>
            <div className="question-section">
              <span className={'title'}>{item.is_me ? 'Sudah dibalas' : 'Belum dibalas'}</span>
              <p>{item.question}</p>
            </div>
            <div className="secondary-details">
              <p>{item.date}</p>
              <p>{item.assignee ?? ''}</p>
            </div>
          </TaskInformation>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
