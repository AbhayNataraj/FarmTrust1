const { expect } = require("chai");
const { contract, web3 } = require("hardhat");

describe("Retailer Registry Contract", function () {
  let retailerRegistry;
  let retailerAddress;

  beforeEach(async function () {
    const RetailerRegistry = await ethers.getContractFactory("RetailerRegistry");
    retailerRegistry = await RetailerRegistry.deploy();
    await retailerRegistry.deployed();

    // create a sample retailer
    const [owner] = await ethers.getSigners();
    retailerAddress = await owner.getAddress();
    await retailerRegistry.registerRetailer("XYZ LLC.", retailerAddress);
  });

  it("should allow registering retailers", async function () {
    // check if the retailer is registered
    const isRegistered = await retailerRegistry.isRetailer(retailerAddress);
    expect(isRegistered).to.be.true;
  });

  it("should allow getting retailer information", async function () {
    // get the retailer information
    const retailer = await retailerRegistry.getRetailer(retailerAddress);

    // check if the retailer name is correct
    expect(retailer.name).to.equal("XYZ LLC.");

    // check if the retailer address is correct
    expect(retailer.retailerAddress).to.equal(retailerAddress);
  });
});
