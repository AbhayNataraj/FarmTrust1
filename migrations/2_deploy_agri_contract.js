
const AgriContract = artifacts.require("../contracts/AgriContract.sol");

module.exports = function (deployer) {
  deployer.deploy(AgriContract);
};

