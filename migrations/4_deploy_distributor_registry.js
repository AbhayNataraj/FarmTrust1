
const DistributorRegistry = artifacts.require("../contracts/DistributorRegistry.sol");

module.exports = function (deployer) {
  deployer.deploy(DistributorRegistry);
};
