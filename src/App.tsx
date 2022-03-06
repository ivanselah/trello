import React from 'react';
import styled from 'styled-components';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { toDoState } from './atoms';
import Board from './Components/Board';

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (destination?.droppableId === source.droppableId) {
      const boardId = destination.droppableId;
      const newBoards = [...toDos[boardId]];
      newBoards.splice(source.index, 1);
      newBoards.splice(destination.index, 0, draggableId);
      setToDos((currentBoards) => {
        return {
          ...currentBoards,
          [boardId]: newBoards,
        };
      });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((key) => {
            return <Board key={key} boardId={key} toDos={toDos[key]} />;
          })}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;

/*
 * onDragEnd 유저가 드래그를 끝낸 시점에 불려지는 함수
 */
