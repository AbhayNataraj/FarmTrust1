
const ProducerRegistry = artifacts.require("../contracts/ProducerRegistry.sol");

module.exports = function (deployer) {
  deployer.deploy(ProducerRegistry);
};
