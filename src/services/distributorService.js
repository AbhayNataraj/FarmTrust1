const DistributorRegistry = require("../contracts/distributorRegistry");
const distributorController = require("../controllers/distributorController");
const { Distributor } = require("../models/Distributor");

class DistributorService {
  static async registerDistributor(name, location, address) {
    try {
      const distributorRegistry = await DistributorRegistry.deployed();
      const distributor = new Distributor(name, location, address);
      await distributorController.registerDistributor(distributor, distributorRegistry);
      return distributor;
    } catch (error) {
      console.log(error);
      throw new Error("Error registering distributor");
    }
  }

  static async getDistributorByAddress(address) {
    try {
      const distributorRegistry = await DistributorRegistry.deployed();
      const distributor = await distributorController.getDistributorByAddress(address, distributorRegistry);
      return distributor;
    } catch (error) {
      console.log(error);
      throw new Error("Error getting distributor");
    }
  }

  static async updateDistributor(name, location, address) {
    try {
      const distributorRegistry = await DistributorRegistry.deployed();
      const distributor = new Distributor(name, location, address);
      await distributorController.updateDistributor(distributor, distributorRegistry);
      return distributor;
    } catch (error) {
      console.log(error);
      throw new Error("Error updating distributor");
    }
  }

  static async removeDistributor(address) {
    try {
      const distributorRegistry = await DistributorRegistry.deployed();
      await distributorController.removeDistributor(address, distributorRegistry);
      return `Distributor with address ${address} removed successfully`;
    } catch (error) {
      console.log(error);
      throw new Error("Error removing distributor");
    }
  }
}

module.exports = DistributorService;
