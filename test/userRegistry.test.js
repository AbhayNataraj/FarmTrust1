const assert = require("chai").assert;
const UserRegistry = artifacts.require("UserRegistry");

contract("UserRegistry", (accounts) => {
  let userRegistry;

  beforeEach(async () => {
    userRegistry = await UserRegistry.new();
  });

  it("should add a new user", async () => {
    const result = await userRegistry.addUser("John", "Doe", "johndoe@example.com");

    assert.equal(result.logs[0].args.firstName, "John");
    assert.equal(result.logs[0].args.lastName, "Doe");
    assert.equal(result.logs[0].args.email, "johndoe@example.com");

    const user = await userRegistry.users(accounts[0]);

    assert.equal(user.firstName, "John");
    assert.equal(user.lastName, "Doe");
    assert.equal(user.email, "johndoe@example.com");
  });

  it("should get a user by address", async () => {
    await userRegistry.addUser("John", "Doe", "johndoe@example.com");
    const user = await userRegistry.getUserByAddress(accounts[0]);

    assert.equal(user.firstName, "John");
    assert.equal(user.lastName, "Doe");
    assert.equal(user.email, "johndoe@example.com");
  });

  it("should update a user's email", async () => {
    await userRegistry.addUser("John", "Doe", "johndoe@example.com");
    const result = await userRegistry.updateUserEmail("newemail@example.com");

    assert.equal(result.logs[0].args.newEmail, "newemail@example.com");

    const user = await userRegistry.users(accounts[0]);

    assert.equal(user.firstName, "John");
    assert.equal(user.lastName, "Doe");
    assert.equal(user.email, "newemail@example.com");
  });

  it("should remove a user", async () => {
    await userRegistry.addUser("John", "Doe", "johndoe@example.com");
    await userRegistry.removeUser();

    try {
      const user = await userRegistry.users(accounts[0]);
      assert.fail("User should have been removed");
    } catch (error) {
      assert.include(error.message, "User does not exist");
    }
  });
});
