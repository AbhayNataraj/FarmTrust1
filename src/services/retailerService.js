const RetailerRegistry = require("../contracts/retailerRegistry");
const retailerController = require("../controllers/retailerController");
const { Retailer } = require("../models/Retailer");

class RetailerService {
  static async registerRetailer(name, address) {
    try {
      const retailerRegistry = await RetailerRegistry.deployed();
      const retailer = new Retailer(name, address);
      await retailerController.registerRetailer(retailer, retailerRegistry);
      return retailer;
    } catch (error) {
      console.log(error);
      throw new Error("Error registering retailer");
    }
  }

  static async getRetailerByAddress(address) {
    try {
      const retailerRegistry = await RetailerRegistry.deployed();
      const retailer = await retailerController.getRetailerByAddress(address, retailerRegistry);
      return retailer;
    } catch (error) {
      console.log(error);
      throw new Error("Error getting retailer");
    }
  }

  static async updateRetailer(name, address) {
    try {
      const retailerRegistry = await RetailerRegistry.deployed();
      const retailer = new Retailer(name, address);
      await retailerController.updateRetailer(retailer, retailerRegistry);
      return retailer;
    } catch (error) {
      console.log(error);
      throw new Error("Error updating retailer");
    }
  }

  static async removeRetailer(address) {
    try {
      const retailerRegistry = await RetailerRegistry.deployed();
      await retailerController.removeRetailer(address, retailerRegistry);
      return `Retailer with address ${address} removed successfully`;
    } catch (error) {
      console.log(error);
      throw new Error("Error removing retailer");
    }
  }
}

module.exports = RetailerService;
