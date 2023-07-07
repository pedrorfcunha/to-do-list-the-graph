import {
  ToDoAdded as ToDoAddedEvent,
  ToDoUpdated as ToDoUpdatedEvent
} from "../generated/ToDoList/ToDoList"
import { ToDoAdded, ToDoUpdated } from "../generated/schema"

export function handleToDoAdded(event: ToDoAddedEvent): void {
  let entity = new ToDoAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.ToDoList_id = event.params.id
  entity.owner = event.params.owner
  entity.description = event.params.description

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleToDoUpdated(event: ToDoUpdatedEvent): void {
  let entity = new ToDoUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.ToDoList_id = event.params.id
  entity.complete = event.params.complete

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
