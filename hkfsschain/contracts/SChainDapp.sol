// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.8.0;

/// @title SupplyChain
/// @author Supply Chain
/// @notice Implements Decentralized Supply Chain


import "./Ownable.sol";

contract SChainDapp is Ownable {

    /// @dev store the product count/id (public for getter())
    uint public productIdCounter = 0;

    address public scAdmin;
    mapping(address => bool) public isSCadmins;
    mapping(address => string) public isProductOwners;

    mapping (address => string) public attestations;

    /// @notice A Product:
    /// @param Product Id: @productId
    /// @param Product Name: @productName
    /// @param Product Info: @productInfo
    /// @param Product Name: @productValue
    /// @param Product GPA: @productGpgga
    /// @param Product Destination: @productDest
    /// @param Product Producer: @productProducer
    /// @param Product Distributor: @productDistributor
    /// @param Product Retailer: @productRetailer
    /// @param Product Consumer: @productConsumer
    struct Product {
        uint productId;
        string productName;
        string productInfo;
        uint256 productValue;
        string productGpgga;
        string productDest;
        address payable productProducer;
        address payable productDistributor;
        address payable productRetailer;
        address productConsumer;
    }
 
    mapping (uint => Product) public products;

    /// @notice LogMsgData should provide the MsgData
    event LogMsgData(
        bytes data
    );

    /// @notice LogAddProduct should provide info about the product
    /// @param prodId the product id
    /// @param prodName the product name
    /// @param prodInfo the product info
    /// @param prodValue the product value
    /// @param prodGpgga the product GPA
    /// @param prodProducer the product producer
    /// @param prodDistributor the product distributor
    /// @param prodRetailer the product retailer
    /// @param prodConsumer the product consumer
    event LogAddProduct(
        uint prodId,
        string prodName,
        string prodInfo,
        uint256 prodValue,
        string prodGpgga,
        string prodDest,
        address prodProducer,
        address prodDistributor,
        address prodRetailer,
        address prodConsumer
    );

    /// @notice Create a modifier that throws an error if the address !isAdmin
    /// @param _isAdmin the new admin
    modifier onlyAdmin(address _isAdmin) {
        require(
            isSCadmins[_isAdmin],
            "Must be an admin to call this function."
        );
        _;
    }

    /// @notice Calling the Ownable constructor to insure that the address deploying this contract is 
    /// regsitered as owner and to set owner as an admin
    constructor() 
        public
        Ownable()
    {
        scAdmin = owner();      
        addAdmin(scAdmin);
        addProduct(
            "Example Name",
            "Example Info",
            1,
            "000N0W00",
            "NY"
        );
    }

    /// @notice Payable fallback
    receive() external payable {
        emit LogMsgData(_msgData());
    }

    /// @notice kill the smart contract
    function kill() public onlyOwner {
        selfdestruct(_msgSender());
    }
    
    /// @notice This function adds an MPadmin
    /// @param _newAdmin the new admin
    function addAdmin(address _newAdmin)
        internal
        virtual
        onlyOwner
    {  
        isSCadmins[_newAdmin] = true;
    }

    /// @notice This function adds a Product
    /// @dev The productId is derived from the counter
    /// @param prodInfo Any product info
    function addProduct(
        string memory prodName,
        string memory prodInfo,
        uint256 prodValue,
        string memory prodGpgga,
        string memory prodDest
    )
        public
        onlyAdmin(_msgSender())
    {
        productIdCounter++;

        /// @notice update via productId
        products[productIdCounter] = Product(
            productIdCounter,
            prodName,
            prodInfo,
            prodValue,
            prodGpgga,
            prodDest,
            _msgSender(),
            address(0),
            address(0),
            address(0)
        );

        emit LogAddProduct(
            productIdCounter,
            prodName,
            prodInfo,
            prodValue,
            prodGpgga,
            prodDest,
            _msgSender(),
            address(0),
            address(0),
            address(0)
        );
    }

    /// @notice Returns Product
    /// @return product's id
    /// @return product's name
    /// @return product's info
    /// @return product's value
    /// @return product's gpgga
    /// @return product's dest
  
    function getProductById(uint _prodId)
        public
        view
        returns (
            uint,
            string memory,
            string memory,
            uint256,
            string memory,
            string memory
            /*
            address,
            address,
            address,
            address
            */
        )
    {
          require(
              _prodId > 0 && _prodId <= productIdCounter,
              "The product Id is not vaild"
          );

          return (
              products[_prodId].productId,
              products[_prodId].productName,
              products[_prodId].productInfo,
              products[_prodId].productValue,
              products[_prodId].productGpgga,
              products[_prodId].productDest
              /*
              products[_prodId].productProducer,
              products[_prodId].productDistributor,
              products[_prodId].productRetailer,
              products[_prodId].productConsumer
              */
        );
    }

    /// @notice This function sets either the producer, distributor, retailer or consumer
    /// @param _prodIdNum the productID to update
    /// @param _changeType the address type to be updated
    /// @param _newAddress the address to update
    function setAddress(uint _prodIdNum, string memory _changeType, address payable _newAddress)
        internal
        virtual
        onlyOwner
    {
        Product storage productToUpdate = products[_prodIdNum]; 
   
        require(
            productIdCounter > 0,
            "There should be at least one product."
        );

        require(
            productToUpdate.productId == _prodIdNum,
            "The submitted product id should match the one to update."
        );

        if (keccak256(bytes(_changeType)) == keccak256(bytes("Producer"))) {
            productToUpdate.productProducer = _newAddress; 
        } else if (keccak256(bytes(_changeType)) == keccak256(bytes("Distributor"))) {
            productToUpdate.productDistributor = _newAddress;
        } else if (keccak256(bytes(_changeType)) == keccak256(bytes("Retailer"))) {
            productToUpdate.productDistributor = _newAddress;
        } else if (keccak256(bytes(_changeType)) == keccak256(bytes("Consumer"))) {
            productToUpdate.productConsumer = _newAddress;
        } 
    }

    function attest(string memory hash) public {
       // console.log(msg.sender,"attests to",hash);
       emit Attest(msg.sender,hash);
       attestations[msg.sender] = hash;
    }
  
    event Attest(address sender, string hash);

}
