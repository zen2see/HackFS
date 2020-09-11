export const SCHAIN_ADD = '0x4B964A70b012400d241db9105F3E6B614D7284e5'
export const SCHAIN_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "hash",
        "type": "string"
      }
    ],
    "name": "Attest",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "prodId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "prodName",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "prodInfo",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "prodValue",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "prodGpgga",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "prodDest",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "prodProducer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "prodDistributor",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "prodRetailer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "prodConsumer",
        "type": "address"
      }
    ],
    "name": "LogAddProduct",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "LogMsgData",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "attestations",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "isProductOwners",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "isSCadmins",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "productIdCounter",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "products",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "productId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "productName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "productInfo",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "productValue",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "productGpgga",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "productDest",
        "type": "string"
      },
      {
        "internalType": "address payable",
        "name": "productProducer",
        "type": "address"
      },
      {
        "internalType": "address payable",
        "name": "productDistributor",
        "type": "address"
      },
      {
        "internalType": "address payable",
        "name": "productRetailer",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "productConsumer",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "scAdmin",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive",
    "payable": true
  },
  {
    "inputs": [],
    "name": "kill",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "prodName",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "prodInfo",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "prodValue",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "prodGpgga",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "prodDest",
        "type": "string"
      }
    ],
    "name": "addProduct",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_prodId",
        "type": "uint256"
      }
    ],
    "name": "getProductById",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "hash",
        "type": "string"
      }
    ],
    "name": "attest",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]