require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.19",
  networks: {
    ganache: {
      url: "http://127.0.0.1:8545",
      accounts: [
        "0x078b0c6dfd158be10b2a83ce1e8094eaafa420a5dbf847a0a04c96b5cdcd2583",
        "0xca2407b35682e028af896d3af7758f3112fd8e2a53f562c16357bdff7f69e15b"
    ]
    }
  }
};