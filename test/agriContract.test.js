const AgriContract = artifacts.require("AgriContract");

contract("AgriContract", async (accounts) => {
  let instance;

  before(async () => {
    instance = await AgriContract.deployed();
  });

  it("should allow a farmer to create a new crop", async () => {
    const cropID = 1;
    const farmerAddress = accounts[1];
    const cropName = "corn";
    const cropQuantity = 10;
    const cropPrice = 100;

    const tx = await instance.createCrop(cropID, farmerAddress, cropName, cropQuantity, cropPrice, { from: farmerAddress });
    assert.isOk(tx, "Transaction should succeed");

    const crop = await instance.getCrop.call(cropID);
    assert.equal(crop[0], farmerAddress, "Farmer address should be correct");
    assert.equal(crop[1], cropName, "Crop name should be correct");
    assert.equal(crop[2].toNumber(), cropQuantity, "Crop quantity should be correct");
    assert.equal(crop[3].toNumber(), cropPrice, "Crop price should be correct");
  });

  it("should not allow a farmer to create a new crop with a duplicate ID", async () => {
    const cropID = 1;
    const farmerAddress = accounts[1];
    const cropName = "soybeans";
    const cropQuantity = 20;
    const cropPrice = 200;

    try {
      await instance.createCrop(cropID, farmerAddress, cropName, cropQuantity, cropPrice, { from: farmerAddress });
      assert.fail("Transaction should fail");
    } catch (error) {
      assert.include(error.message, "revert", "Error message should contain revert");
    }
  });
});
