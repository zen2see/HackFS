// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.8.0;

/// @title SupplyChain
/// @author HackFS Supply Chain
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
    /// @param Product Producer: @productProducer
    struct Product {
        uint productId;
        string productName;
        string productInfo;
        address payable productProducer;
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
    /// @param prodProducer the product producer
    event LogAddProduct(
        uint prodId,
        string prodName,
        string prodInfo,
        address prodProducer
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
        addProduct("Products Name", "Example product");
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
        string memory prodInfo
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
            _msgSender()
        );

        emit LogAddProduct(productIdCounter, prodName, prodInfo, _msgSender()); 
    }

    /// @notice Returns Product
    /// @return product's id
    /// @return product's name
    /// @return product's info
    /// @return product's producer
    function getProductById(uint _prodId)
        public
        view
        returns (
            uint,
            string memory,
            string memory,
            address 
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
              products[_prodId].productProducer
        );
    }

    function attest(string memory hash) public {
       // console.log(msg.sender,"attests to",hash);
       emit Attest(msg.sender,hash);
       attestations[msg.sender] = hash;
    }
  
    event Attest(address sender, string hash);

}
