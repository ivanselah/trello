import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

type DraggableCardProps = {
  toDo: string;
  index: number;
};

// React memo, props 가 변경되지 않으면 렌더링을 다시 하지 마라

function DraggableCard({ toDo, index }: DraggableCardProps) {
  return (
    <Draggable draggableId={toDo} index={index}>
      {(provided, snapshot) => (
        <Card isDragging={snapshot.isDragging} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          {toDo}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => (props.isDragging ? '#55efc4' : props.theme.cardColor)};
  box-shadow: ${(props) => (props.isDragging ? '0px 2px 20px rgba(0, 0, 0, 0.5)' : 'none')};
`;
