import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import { ToDoAdded, ToDoUpdated } from "../generated/ToDoList/ToDoList"

export function createToDoAddedEvent(
  id: BigInt,
  owner: Address,
  description: string
): ToDoAdded {
  let toDoAddedEvent = changetype<ToDoAdded>(newMockEvent())

  toDoAddedEvent.parameters = new Array()

  toDoAddedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  toDoAddedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  toDoAddedEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )

  return toDoAddedEvent
}

export function createToDoUpdatedEvent(
  id: BigInt,
  complete: boolean
): ToDoUpdated {
  let toDoUpdatedEvent = changetype<ToDoUpdated>(newMockEvent())

  toDoUpdatedEvent.parameters = new Array()

  toDoUpdatedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  toDoUpdatedEvent.parameters.push(
    new ethereum.EventParam("complete", ethereum.Value.fromBoolean(complete))
  )

  return toDoUpdatedEvent
}
