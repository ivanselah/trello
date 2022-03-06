import { atom, selector } from 'recoil';

type ToDoStateProps = {
  [key: string]: string[];
};

export const toDoState = atom<ToDoStateProps>({
  key: 'toDo',
  default: {
    to_do: ['a', 'b', 'c', 'd', 'e', 'f'],
    doing: ['Hello', 'Hi'],
    done: ['Good', 'Job'],
  },
});
