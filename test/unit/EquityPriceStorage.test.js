const { network, deployments, ethers } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")
const { assert, expect } = require("chai")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("EquityPriceStorage", function () {
          let equityPriceStorage
          let deployer
          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              await deployments.fixture(["all"])
              equityPriceStorage = await ethers.getContract(
                  "EquityPriceStorage",
                  deployer
              )
          })

          it("should start with price 0", async function () {
              const latestPrice = await equityPriceStorage.getPrice("HK.00005")
              const expectedPrice = "0"
              assert.equal(latestPrice.toString(), expectedPrice)
          })

          it("should update if we update price", async function () {
              const expectedPrice = "8"
              const txResponse = await equityPriceStorage.addEquity(
                  "HK.00005",
                  expectedPrice
              )
              await txResponse.wait(1)
              const updatedPrice = await equityPriceStorage.getPrice("HK.00005")
              assert.equal(updatedPrice.toString(), expectedPrice)
          })
      })
