import '@nomiclabs/hardhat-ethers';
import hre from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect, use } from 'chai';
import { solidity } from 'ethereum-waffle';

use(solidity);

import { ToDoList } from '../typechain';

describe('ToDoList', () => {
  let toDoList: ToDoList;
  let deployer: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;

  beforeEach(async () => {
    [deployer, user1, user2] = await hre.ethers.getSigners();
    const ToDoList = await hre.ethers.getContractFactory('ToDoList');
    toDoList = (await ToDoList.deploy()) as ToDoList;
    await toDoList.deployed();
  });

  it('should deploy the contract correctly', async () => {
    expect(toDoList.address).to.not.equal(0);
    expect(toDoList.deployTransaction).to.not.be.undefined;
  });

  it('should set a new ToDo correctly', async () => {
    const toDo = 'Buy groceries';
    await toDoList.setNewToDo(toDo);

    const toDoCount = await toDoList.toDoCount();
    expect(toDoCount).to.deep.equal(hre.ethers.BigNumber.from(1));

    const todo = await toDoList.todos(0);
    expect(todo.description).to.equal(toDo);
  });

  it('should update the ToDo status correctly', async () => {
    const toDo = 'Buy groceries';
    await toDoList.setNewToDo(toDo);

    const toDoId = 0;
    await toDoList.updateToDoStatus(toDoId, true);

    const todo = await toDoList.todos(toDoId);
    expect(todo.complete).to.equal(true);
  });

  it('should fail when updating the ToDo status with a non-owner account', async () => {
    const toDo = 'Buy groceries';
    await toDoList.setNewToDo(toDo);
  
    const toDoId = 0;
    const updatedStatus = true;
  
    await expect(
      toDoList.connect(user1).updateToDoStatus(toDoId, updatedStatus)
    ).to.be.revertedWith('You are not the owner of this ToDo');
  });
  
});
