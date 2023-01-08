import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import { Card } from 'antd';
import { colors } from '@atlaskit/theme';
import styles from './kanban.module.less';

const Container: any = styled.div`
  display: flex;
`;

const TaskList: any = styled.div`
  min-height: 100px;
  display: flex;
  flex-direction: column;
  background: #f3f3f3;
  min-width: 341px;
  border-radius: 8px;
  padding: 15px 15px;
  margin-right: 45px;
`;

const TaskColumnStyles: any = styled.div`
  margin: 8px;
  display: flex;
  width: 100%;
  min-height: 80vh;
`;

const Title: any = styled.span`
  color: ${(props: any) => props?.color ?? colors.N900};
  background: ${colors.N0};
  padding: 2px 10px;
  border-radius: 5px;
  align-self: flex-start;
`;

const Kanban = (props: any) => {
  const [columns, setColumns] = useState<any>({});
  useEffect(() => {
    if (props?.data) {
      setColumns(props.data);
    }
  }, [props]);

  const onDragEnd = (result: any, columns: any, setColumns: any) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      // cannot move Handled to Unhandled and Closed to Handled or Unhandled
      const _source = columns[source.droppableId] ?? null;
      const _destination = columns[destination.droppableId] ?? null;
      if (_source && _destination) {
        if (
          (_source.title === 'Handled' && _destination.title === 'Unhandled') ||
          (_source.title === 'Closed' && _destination.title === 'Handled') ||
          (_source.title === 'Closed' && _destination.title === 'Unhandled')
        ) {
          return;
        }
      }

      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
      if (props?.onDrop) {
        props.onDrop({
          source: source.droppableId,
          destination: destination.droppableId,
          draggableId: result.draggableId,
        });
      }
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };
  return (
    <div className={styles.root}>
      <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
        <Container>
          <TaskColumnStyles>
            {Object.keys(columns).map((item, id) => {
              return (
                <Droppable key={item} droppableId={item}>
                  {(provided, snapshot) => (
                    <TaskList ref={provided.innerRef} {...provided.droppableProps}>
                      <Card
                        loading={props?.loading}
                        key={id}
                        title={
                          <Title color={columns[item]?.color}>{columns[item]?.title ?? '-'}</Title>
                        }>
                        {columns[item]?.items &&
                          columns[item]?.items.map((item: any, index: any) => (
                            <TaskCard
                              onClick={() => props?.eventClick && props.eventClick(item)}
                              key={`task-${index}`}
                              item={item}
                              index={index}
                              style={{ border: '1px solid green' }}
                            />
                          ))}
                        {provided.placeholder}
                      </Card>
                    </TaskList>
                  )}
                </Droppable>
              );
            })}
          </TaskColumnStyles>
        </Container>
      </DragDropContext>
    </div>
  );
};

export default Kanban;
