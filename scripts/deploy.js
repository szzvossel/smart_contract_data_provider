// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers, run, network } = require("hardhat")

async function main() {
    const EquityPriceStorageFactory = await ethers.getContractFactory(
        "EquityPriceStorage"
    )
    console.log("deploying EquityPriceStorage contract")
    const equityPriceStorageContract = await EquityPriceStorageFactory.deploy()
    await equityPriceStorageContract.deployed()
    console.log(`deployed address ${equityPriceStorageContract.address}`)
    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
        console.log("waiting for the deployment to sync to etherscan.")
        await equityPriceStorageContract.deployTransaction.wait(6)
        console.log("Start to verify")
        await verify(equityPriceStorageContract.address, [])
    }

    const latestPrice = await equityPriceStorageContract.getPrice("dummy")
    console.log(`price is ${latestPrice}`)

    const transactionResponse = await equityPriceStorageContract.addEquity(
        "dummy",
        2
    )
    await transactionResponse.wait(1)
    const updatedPrice = await equityPriceStorageContract.getPrice("dummy")
    console.log(`updated price is ${updatedPrice}`)
}

async function verify(contractAddress, args) {
    console.log("verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified.")
        } else {
            console.log(e)
        }
    }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
