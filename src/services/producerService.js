const ProducerRegistry = require("../contracts/producerRegistry");
const producerController = require("../controllers/producerController");
const { Producer } = require("../models/Producer");

class ProducerService {
  static async registerProducer(name, email, phone, location) {
    try {
      const producerRegistry = await ProducerRegistry.deployed();
      const producer = new Producer(name, email, phone, location);
      await producerController.registerProducer(producer, producerRegistry);
      return producer;
    } catch (error) {
      console.log(error);
      throw new Error("Error registering producer");
    }
  }

  static async getProducerByAddress(address) {
    try {
      const producerRegistry = await ProducerRegistry.deployed();
      const producer = await producerController.getProducerByAddress(address, producerRegistry);
      return producer;
    } catch (error) {
      console.log(error);
      throw new Error("Error getting producer");
    }
  }

  static async updateProducer(name, email, phone, location, address) {
    try {
      const producerRegistry = await ProducerRegistry.deployed();
      const producer = new Producer(name, email, phone, location, address);
      await producerController.updateProducer(producer, producerRegistry);
      return producer;
    } catch (error) {
      console.log(error);
      throw new Error("Error updating producer");
    }
  }

  static async removeProducer(address) {
    try {
      const producerRegistry = await ProducerRegistry.deployed();
      await producerController.removeProducer(address, producerRegistry);
      return `Producer with address ${address} removed successfully`;
    } catch (error) {
      console.log(error);
      throw new Error("Error removing producer");
    }
  }
}

module.exports = ProducerService;
