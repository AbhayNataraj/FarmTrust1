// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract DistributorRegistry {
    struct Distributor {
        string name;
        string location;
        string distribution;
    }

    mapping(address => Distributor) public distributors;

    function registerDistributor(string memory _name, string memory _location, string memory _distribution) public {
        require(keccak256(abi.encodePacked(distributors[msg.sender].name)) == keccak256(abi.encodePacked("")), "Distributor already registered");
        distributors[msg.sender] = Distributor(_name, _location, _distribution);
    }

    function updateDistributor(string memory _name, string memory _location, string memory _distribution) public {
        require(keccak256(abi.encodePacked(distributors[msg.sender].name)) != keccak256(abi.encodePacked("")), "Distributor not registered");
        distributors[msg.sender] = Distributor(_name, _location, _distribution);
    }

    function removeDistributor() public {
        delete distributors[msg.sender];
    }
}
