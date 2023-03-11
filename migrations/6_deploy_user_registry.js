
const UserRegistry = artifacts.require("../contracts/UserRegistry.sol");

module.exports = function (deployer) {
  deployer.deploy(UserRegistry);
};