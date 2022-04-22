import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import DraggableCard from './DraggableCard';

type BoardProps = {
  toDos: string[];
  boardId: string;
};

function Board({ toDos, boardId }: BoardProps) {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area
            isDaggingOver={snapshot.isDraggingOver}
            draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard key={toDo} toDo={toDo} index={index} />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;

const Wrapper = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

type AreaProps = {
  isDaggingOver: boolean;
  draggingFromThisWith: boolean;
};

const Area = styled.div<AreaProps>`
  background-color: ${(props) => (props.isDaggingOver ? 'tomato' : props.draggingFromThisWith ? 'red' : 'pink')};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
`;
