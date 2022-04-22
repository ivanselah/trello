import { atom, selector } from 'recoil';

type ToDoStateProps = {
  [key: string]: string[];
};

export const toDoState = atom<ToDoStateProps>({
  key: 'toDo',
  default: {
    to_do: ['a', 'b', 'c'],
    doing: ['Hello', 'Hi'],
    done: ['Good', 'Job'],
  },
});
