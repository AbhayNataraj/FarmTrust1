const { expect } = require("chai");
const { contract, web3 } = require("hardhat");

describe("Producer Registry Contract", function () {
  let producerRegistry;
  let producerAddress;

  beforeEach(async function () {
    const ProducerRegistry = await ethers.getContractFactory("ProducerRegistry");
    producerRegistry = await ProducerRegistry.deploy();
    await producerRegistry.deployed();

    // create a sample producer
    const [owner] = await ethers.getSigners();
    producerAddress = await owner.getAddress();
    await producerRegistry.registerProducer("ABC Inc.", producerAddress);
  });

  it("should allow registering producers", async function () {
    // check if the producer is registered
    const isRegistered = await producerRegistry.isProducer(producerAddress);
    expect(isRegistered).to.be.true;
  });

  it("should allow getting producer information", async function () {
    // get the producer information
    const producer = await producerRegistry.getProducer(producerAddress);

    // check if the producer name is correct
    expect(producer.name).to.equal("ABC Inc.");

    // check if the producer address is correct
    expect(producer.producerAddress).to.equal(producerAddress);
  });
});
