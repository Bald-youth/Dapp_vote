require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.19",
  networks: {
    ganache: {
      url: "http://127.0.0.1:8545",
      accounts: [
        "0xfe5ffc0e14da2644fcd225bf7a0e8f2d89e8325c56746d891e4942a2aa1d7295",
        "0xa8fd328b861e0e3d89b4c9b287ad51947c779214fdb86776a815cf7695d8dc48"
    ]
    }
  }
};