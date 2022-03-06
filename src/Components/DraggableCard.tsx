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
      {(provided) => (
        <Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          {toDo}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;
