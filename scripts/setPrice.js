const { ethers, getNamedAccounts } = require("hardhat")

async function main() {
    const { deployer } = await getNamedAccounts()
    const equityPriceStorage = await ethers.getContract(
        "EquityPriceStorage",
        deployer
    )
    console.log(
        `Got contract EquityPriceStorage at ${equityPriceStorage.address}`
    )
    console.log("Set price for HK.00005 contract...")
    const transactionResponse = await equityPriceStorage.addEquity(
        "HK.00005",
        "50"
    )
    await transactionResponse.wait()
    console.log("set price is done!")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
