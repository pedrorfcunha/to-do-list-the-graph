import { useContractWrite } from 'wagmi';
import { Button, useToast } from '@chakra-ui/react';

import { Todo } from '@/utils/types';
import styles from './TodoItem.module.css';
import TodoListAbi from '../abi/todo-list.json';

const TodoItem = ({ todo }: { todo: Todo }) => {
  const todoListContractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  const toast = useToast();
  const successToast = () => {
    toast({
      title: 'Transaction succedded',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  };
  const errorToast = () => {
    toast({
      title: 'Transaction failed',
      status: 'error',
      duration: 9000,
      isClosable: true,
    });
  };

  const { writeAsync: updateToDoStatus } = useContractWrite({
    address: todoListContractAddress as `0x${string}`,
    abi: TodoListAbi,
    functionName: 'updateToDoStatus',
    args: [todo.todoId, !todo.completeStatus],
    onError(error) {
      console.log('Error', error);
      errorToast();
    },
    onSuccess(data) {
      console.log('Success', data);
      successToast();
    },
  });

  const handleUpdateToDoStatus = async () => {
    const tx = await updateToDoStatus();
  };

  return (
    <div className={styles.box}>
      <li className={styles.description}>{todo.description}</li>
      <p className={todo.completeStatus === true ? styles.blue : styles.red}>
        {todo.completeStatus === true ? 'Completed' : 'Pending'}
      </p>
      <div className={styles.btnContainer}>
        <Button
          colorScheme="gray"
          size="xs"
          isDisabled={todo.completeStatus === false}
          onClick={handleUpdateToDoStatus}
        >
          Set pending
        </Button>
        <Button
          colorScheme="teal"
          size="xs"
          isDisabled={todo.completeStatus === true}
          onClick={handleUpdateToDoStatus}
        >
          Set complete
        </Button>
      </div>
    </div>
  );
};

export default TodoItem;
