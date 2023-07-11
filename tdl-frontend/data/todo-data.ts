import { gql } from '@apollo/client';

export const GET_TODO_LIST = gql`
{
  toDos {
    id
    todoId
    owner
    description
    completeStatus
    blockTimestamp
    lastBlockTimestamp
  }
}
`;
