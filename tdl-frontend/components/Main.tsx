import { useAccount } from 'wagmi';
import { useState, useEffect } from 'react';

import NotConnected from '@/components/NotConnected';
import NewTodo from '@/components/NewTodo';
import TodoList from '@/components/TodoList';

const Main = () => {
  const { isConnected } = useAccount();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted && (
      <>
        {isConnected ? (
          <div>
            <NewTodo />
            <TodoList />
          </div>
        ) : (
          <NotConnected />
        )}
      </>
    )
  );
};

export default Main;
