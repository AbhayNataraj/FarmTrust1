const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Distributor Registry Contract", function () {
  let distributorRegistry;
  let distributorAddress;

  beforeEach(async function () {
    const DistributorRegistry = await ethers.getContractFactory("DistributorRegistry");
    distributorRegistry = await DistributorRegistry.deploy();
    await distributorRegistry.deployed();

    // create a sample distributor
    const [owner] = await ethers.getSigners();
    distributorAddress = await owner.getAddress();
    await distributorRegistry.registerDistributor("XYZ Inc.", distributorAddress);
  });

  it("should allow registering distributors", async function () {
    // check if the distributor is registered
    const isRegistered = await distributorRegistry.isDistributor(distributorAddress);
    expect(isRegistered).to.be.true;
  });

  it("should allow getting distributor information", async function () {
    // get the distributor information
    const distributor = await distributorRegistry.getDistributor(distributorAddress);

    // check if the distributor name is correct
    expect(distributor.name).to.equal("XYZ Inc.");

    // check if the distributor address is correct
    expect(distributor.distributorAddress).to.equal(distributorAddress);
  });
});
