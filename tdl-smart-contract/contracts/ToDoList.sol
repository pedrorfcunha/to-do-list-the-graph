// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ToDoList {
    struct ToDo {
        address owner;
        string description;
        bool complete;
    }

    mapping(uint256 => ToDo) public todos;

    uint256 public toDoCount;

    event ToDoAdded(
        uint256 indexed id,
        address indexed owner,
        string description
    );

    event ToDoUpdated(uint256 indexed id, address indexed owner, bool complete);

    function setNewToDo(string memory _description) external {
        uint256 id = toDoCount;
        todos[id] = ToDo(msg.sender, _description, false);

        toDoCount++;

        emit ToDoAdded(id, msg.sender, _description);
    }

    function updateToDoStatus(uint256 _id, bool _complete) external {
        ToDo storage todo = todos[_id];
        require(todo.owner == msg.sender, "You are not the owner of this ToDo");

        todo.complete = _complete;
        emit ToDoUpdated(_id, msg.sender, _complete);
    }
}
