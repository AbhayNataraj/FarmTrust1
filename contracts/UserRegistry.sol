// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract UserRegistry {
    struct User {
        string name;
        string email;
        string password;
        string role;
        string location;
        string phone;
        string dateJoined;
    }

    mapping(address => User) public users;

    function registerUser(string memory _name, string memory _email, string memory _password, string memory _role, string memory _address, string memory _phone, string memory _dateJoined) public {
        require(keccak256(abi.encodePacked(users[msg.sender].name)) == keccak256(abi.encodePacked(_name)), "User already registered");
        users[msg.sender] = User(_name, _email, _password, _role, _address, _phone, _dateJoined);
    }

    function updateUser(string memory _name, string memory _email, string memory _password, string memory _role, string memory _address, string memory _phone, string memory _dateJoined) public {
        require(keccak256(abi.encodePacked(users[msg.sender].name)) != keccak256(abi.encodePacked("")), "User not registered");
        users[msg.sender] = User(_name, _email, _password, _role, _address, _phone, _dateJoined);
    }

    function removeUser() public {
        delete users[msg.sender];
    }
}
