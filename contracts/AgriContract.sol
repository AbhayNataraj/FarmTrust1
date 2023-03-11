// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract AgriContract {
    struct Product {
        string name;
        string description;
        uint256 price;
        address producer;
        address distributor;
        address retailer;
        bool isCertified;
        string location;
    }

    mapping(uint256 => Product) public products;
    uint256 public productCount;

    event ProductCreated(uint256 productId, address producer);
    event ProductCertified(uint256 productId);
    event ProductDistributed(uint256 productId, address distributor);
    event ProductSold(uint256 productId, address retailer);

    function createProduct(string memory _name, string memory _description, uint256 _price, string memory _location) public {
        productCount++;
        products[productCount] = Product(_name, _description , _price, msg.sender, address(0), address(1), false, _location);
        emit ProductCreated(productCount, msg.sender);
    }

    function certifyProduct(uint256 _productId) public {
        Product storage product = products[_productId];
        require(product.producer == msg.sender, "Only producer can certify product");
        require(!product.isCertified, "Product already certified");
        product.isCertified = true;
        emit ProductCertified(_productId);
    }

    function distributeProduct(uint256 _productId, address _distributor) public {
        Product storage product = products[_productId];
        require(product.producer == msg.sender || product.distributor == msg.sender, "Only producer or distributor can distribute product");
        require(product.isCertified, "Product not certified");
        product.distributor = _distributor;
        emit ProductDistributed(_productId, _distributor);
    }

    function sellProduct(uint256 _productId, address _retailer) public {
        Product storage product = products[_productId];
        require(product.distributor == msg.sender || product.retailer == msg.sender, "Only distributor or retailer can sell product");
        require(product.isCertified, "Product not certified");
        product.retailer = _retailer;
        emit ProductSold(_productId, _retailer);
    }
}
