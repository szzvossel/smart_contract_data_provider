const { ethers } = require("hardhat")
const { assert, expect } = require("chai")

describe("EquityPriceStorage", function () {
    let equityPriceStorageFactory, equityPriceStorage
    beforeEach(async function () {
        equityPriceStorageFactory = await ethers.getContractFactory(
            "EquityPriceStorage"
        )
        equityPriceStorage = await equityPriceStorageFactory.deploy()
    })

    it("should start with price 0", async function () {
        const latestPrice = await equityPriceStorage.getPrice("dummy")
        const expectedPrice = "0"
        assert.equal(latestPrice.toString(), expectedPrice)
    })

    it("should update if we update price", async function () {
        const expectedPrice = "8"
        const txResponse = await equityPriceStorage.addEquity(
            "dummy",
            expectedPrice
        )
        await txResponse.wait(1)
        const updatedPrice = await equityPriceStorage.getPrice("dummy")
        assert.equal(updatedPrice.toString(), expectedPrice)
    })
})
