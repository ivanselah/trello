import { useForm } from 'react-hook-form';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import DraggableCard from './DraggableCard';
import { Todo, toDoState } from '../atoms';
import { useSetRecoilState } from 'recoil';

type BoardProps = {
  toDos: Todo[];
  boardId: string;
};

type FormProps = {
  toDo: string;
};

function Board({ toDos, boardId }: BoardProps) {
  const { register, setValue, handleSubmit } = useForm<FormProps>();
  const setToDos = useSetRecoilState(toDoState);
  const onValid = ({ toDo }: FormProps) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [...allBoards[boardId], newToDo],
      };
    });
    setValue('toDo', '');
  };

  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input {...register('toDo', { required: true })} type='text' placeholder={`Add Task on ${boardId}`} />
      </Form>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area
            isDaggingOver={snapshot.isDraggingOver}
            draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard key={toDo.id} toDoId={toDo.id} index={index} toDoText={toDo.text} />
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
  padding-top: 10px;
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

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;

type AreaProps = {
  isDaggingOver: boolean;
  draggingFromThisWith: boolean;
};

const Area = styled.div<AreaProps>`
  background-color: ${(props) => (props.isDaggingOver ? '#b2bec3' : props.draggingFromThisWith ? '#dfe6e9' : 'transparent')};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;
