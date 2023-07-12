import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

import TodoItem from './TodoItem';
import { GET_TODO_LIST } from '@/data/todo-data';
import { Todo } from '@/utils/types';
import styles from './TodoList.module.css';

const TodoList = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const { loading, error, data, refetch } = useQuery(GET_TODO_LIST);

  const addressConnected = useAccount();
  const { address } = addressConnected;

  useEffect(() => {
    if (data && address) {
      const filteredTodos = data.toDos.filter((todo: Todo) => todo.owner === address.toLowerCase());
      setTodoList(filteredTodos);
    }
  }, [data, address]);

  return (
    <div className={styles.todoList}>
      <h2 className={styles.h2}>This is your ToDo List:</h2>
      <div className={styles.container}>
        {todoList?.length > 0 ? (
          todoList.map(todo => <TodoItem todo={todo} key={todo.id} />)
        ) : (
          <p>You should insert your first todo!</p>
        )}
      </div>
    </div>
  );
};

export default TodoList;
