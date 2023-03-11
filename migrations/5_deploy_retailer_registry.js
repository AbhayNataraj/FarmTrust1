
const RetailerRegistry = artifacts.require("../contracts/RetailerRegistry.sol");

module.exports = function (deployer) {
  deployer.deploy(RetailerRegistry);
};
