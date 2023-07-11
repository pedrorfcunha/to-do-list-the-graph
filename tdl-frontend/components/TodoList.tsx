import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';

import { GET_TODO_LIST } from '@/data/todo-data';

const TodoList = () => {
  type Todo = {
    blockTimestamp: string;
    completeStatus: boolean;
    description: string;
    id: string;
    lastBlockTimestamp: string | null;
    owner: string;
    todoId: string;
  };

  const [todoList, setTodoList] = useState<Todo[]>([]);

  const { loading, error, data } = useQuery(GET_TODO_LIST);

  useEffect(() => {
    if (data) {
      setTodoList(data.toDos);
    }
  }, [data, todoList]);

  return (
    <div>
      {todoList?.map(todo => (
        <div key={todo.id}>
          <p>{todo.description}</p>
        </div>
      ))}
      <p>todo</p>
    </div>
  );
};

export default TodoList;
