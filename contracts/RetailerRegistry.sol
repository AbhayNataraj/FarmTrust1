// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract RetailerRegistry {
    struct Retailer {
        string name;
        string retailType;
        string location;
    }

    mapping(address => Retailer) public retailers;

    function registerRetailer(string memory _name, string memory _location, string memory _retailType) public {
        require(keccak256(abi.encodePacked(retailers[msg.sender].name)) == keccak256(abi.encodePacked("")) , "Retailer already registered");
        retailers[msg.sender] = Retailer(_name, _location, _retailType);
    }

    function updateRetailer(string memory _name, string memory _location, string memory _retailType) public {
        require(keccak256(abi.encodePacked(retailers[msg.sender].name)) != keccak256(abi.encodePacked("")), "Retailer not registered");
        retailers[msg.sender] = Retailer(_name, _location, _retailType);
    }

    function removeRetailer() public {
        delete retailers[msg.sender];
    }
}
