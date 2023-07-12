export type Todo = {
  blockTimestamp: string;
  completeStatus: boolean;
  description: string;
  id: string;
  lastBlockTimestamp: string | null;
  owner: string;
  todoId: number;
};
