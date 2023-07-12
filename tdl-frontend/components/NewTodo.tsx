import { useState } from 'react';
import { useContractWrite, useContractEvent } from 'wagmi';
import { useQuery } from '@apollo/client';
import { Input, Button, useToast } from '@chakra-ui/react';

import { GET_TODO_LIST } from '@/data/todo-data';
import styles from './NewTodo.module.css';
import TodoListAbi from '../abi/todo-list.json';

const NewTodo = () => {
  const todoListContractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  const toast = useToast();

  const { loading, error, data, refetch } = useQuery(GET_TODO_LIST);

  const [todoInput, setTodoInput] = useState<string>('');

  const handleChange = (event: any) => setTodoInput(event.target.value);

  const handleRefetch = () => {
    refetch();

    toast({
      title: 'Refreshing and syncing data...',
      status: 'loading',
      duration: 3000,
      isClosable: true,
    });

    setTimeout(() => {
      refetchToast();
    }, 5000);
  };

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
  const processingToast = () => {
    toast({
      title: 'Processing changes...',
      status: 'loading',
      duration: 3000,
      isClosable: true,
    });
  };
  const loadingToast = () => {
    toast({
      title: 'Loading changes...',
      status: 'loading',
      duration: 7000,
      isClosable: true,
    });
  };
  const refetchToast = () => {
    toast({
      title:
        'If the changes are not yet visible on the screen, the network may be overloaded. Please refresh again after 1 minute.',
      status: 'info',
      duration: 6000,
      position: 'top-right',
      isClosable: true,
    });
  };

  const { writeAsync: setNewToDo } = useContractWrite({
    address: todoListContractAddress as `0x${string}`,
    abi: TodoListAbi,
    functionName: 'setNewToDo',
    args: [todoInput],
    onError(error) {
      console.log('Error', error);
      errorToast();
    },
    onSuccess(data) {
      console.log('Success', data);
      successToast();
      setTimeout(() => {
        processingToast();
      }, 5000);
      setTimeout(() => {
        loadingToast();
      }, 10000);
      setTimeout(() => {
        handleRefetch();
      }, 20000);
    },
  });

  const handleSetNewTodo = async () => {
    const tx = await setNewToDo();
  };

  useContractEvent({
    address: todoListContractAddress as `0x${string}`,
    abi: TodoListAbi,
    eventName: 'ToDoUpdated',
    listener() {
      setTimeout(() => {
        processingToast();
      }, 5000);
      setTimeout(() => {
        loadingToast();
      }, 10000);
      setTimeout(() => {
        handleRefetch();
      }, 20000);
    },
  });

  return (
    <div className={styles.newTodo}>
      <Input placeholder="Eg: Return the mobile messages" onChange={handleChange} />
      <Button colorScheme="teal" onClick={handleSetNewTodo}>
        Insert
      </Button>
      <Button colorScheme="teal" onClick={handleRefetch}>
        Refresh
      </Button>
    </div>
  );
};

export default NewTodo;
