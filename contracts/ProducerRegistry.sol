// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract ProducerRegistry {
    struct Producer {
        string name;
        string location;
        string product;
    }

    mapping(address => Producer) public producers;

    function registerProducer(string memory _name, string memory _location, string memory _product) public {
        require(keccak256(abi.encodePacked(producers[msg.sender].name)) == keccak256(abi.encodePacked("")), "Producer already registered");
        producers[msg.sender] = Producer(_name, _location, _product);
    }

    function updateProducer(string memory _name, string memory _location, string memory _product) public {
        require(keccak256(abi.encodePacked(producers[msg.sender].name)) != keccak256(abi.encodePacked("")), "Producer not registered");
        producers[msg.sender] = Producer(_name, _location, _product);
    }

    function removeProducer() public {
        delete producers[msg.sender];
    }
}
