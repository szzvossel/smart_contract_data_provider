const { network, deployments, ethers } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")
const { assert, expect } = require("chai")

developmentChains.includes(network.name)
    ? describe.skip
    : describe("EquityPriceStorage staging test", function () {
          let equityPriceStorage
          let deployer
          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              equityPriceStorage = await ethers.getContract(
                  "EquityPriceStorage",
                  deployer
              )
          })

          it("should get the same price after setPrice", async function () {
              const expectedPrice = "8"
              console.log("set price to 8")
              const txResponse = await equityPriceStorage.addEquity(
                  "HK.00005",
                  expectedPrice
              )
              await txResponse.wait(1)
              const updatedPrice = await equityPriceStorage.getPrice("HK.00005")
              console.log(`the price result is ${updatedPrice}`)
              assert.equal(updatedPrice.toString(), expectedPrice)
          })
      })
