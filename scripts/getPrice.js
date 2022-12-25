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
    const price = await equityPriceStorage.getPrice("HK.00005")

    console.log(`the price is ${price}!`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
