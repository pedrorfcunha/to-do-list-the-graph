import '@nomiclabs/hardhat-ethers';
import hre from 'hardhat';

async function main() {
  const ToDoList = await hre.ethers.getContractFactory('ToDoList');

  const toDoList = await ToDoList.deploy();

  await toDoList.deployed();

  console.log('ToDoList contract deployed to:', toDoList.address);

  const verify = async (contractAddress: string, args: any[]) => {
    console.log("Verifying contract...");
    try {
        await hre.run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        });
    } catch (e: any) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!");
        } else {
            console.log(e);
        }
    }
};

if (hre.network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for block confirmations...");
    await toDoList.deployTransaction.wait(6);
    await verify(toDoList.address, []);
}
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
