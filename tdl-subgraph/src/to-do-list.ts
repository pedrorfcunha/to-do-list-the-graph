import { Address, BigInt } from '@graphprotocol/graph-ts';
import {
  ToDoAdded as ToDoAddedEvent,
  ToDoUpdated as ToDoUpdatedEvent,
} from '../generated/ToDoList/ToDoList';
import { ToDo } from '../generated/schema';

export function handleToDoAdded(event: ToDoAddedEvent): void {
  let todo = new ToDo(getIdFromEventParams(event.params.id, event.params.owner));

  todo.todoId = event.params.id;
  todo.owner = event.params.owner;
  todo.description = event.params.description;
  todo.completeStatus = false;

  todo.blockNumber = event.block.number;
  todo.blockTimestamp = event.block.timestamp;
  todo.transactionHash = event.transaction.hash;

  todo.save();
}

export function handleToDoUpdated(event: ToDoUpdatedEvent): void {
  let todo = ToDo.load(getIdFromEventParams(event.params.id, event.params.owner));

  if (todo) {
    todo.completeStatus = event.params.complete;
    todo.lastBlockNumber = event.block.number;
    todo.lastBlockTimestamp = event.block.timestamp;
    todo.lastTransactionHash = event.transaction.hash;
    todo.save();
  }
}

function getIdFromEventParams(todoId: BigInt, owner: Address): string {
  return todoId.toHexString() + owner.toHexString();
}
