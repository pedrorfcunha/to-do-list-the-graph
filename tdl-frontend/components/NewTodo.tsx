import { useState } from 'react';
import { useContractWrite } from 'wagmi';
import { Input, Button, useToast } from '@chakra-ui/react';

import styles from './NewTodo.module.css';
import TodoListAbi from '../abi/todo-list.json';

const NewTodo = () => {
  const [todoInput, setTodoInput] = useState<string>('');
  const handleChange = (event: any) => setTodoInput(event.target.value);

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
    },
  });

  const handleSetNewTodo = async () => {
    const tx = await setNewToDo();
  };

  return (
    <div className={styles.newTodo}>
      <Input placeholder="Eg: Return the mobile messages" onChange={handleChange} />
      <Button colorScheme="teal" onClick={handleSetNewTodo}>
        Insert
      </Button>
    </div>
  );
};

export default NewTodo;
