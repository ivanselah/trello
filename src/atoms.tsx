import { atom, selector } from 'recoil';

export type Todo = {
  id: number;
  text: string;
};

type ToDoStateProps = {
  [key: string]: Todo[];
};

export const toDoState = atom<ToDoStateProps>({
  key: 'toDo',
  default: {
    to_do: [],
    doing: [],
    done: [],
  },
});
