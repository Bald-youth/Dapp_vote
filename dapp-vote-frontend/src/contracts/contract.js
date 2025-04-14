// src/constants/contract.js
export const CONTRACT_ADDRESS = "0xe888D2edFeA1eEA858dd0b244005fE444BF266aC"; // 更新为你的合约地址

export const CONTRACT_ABI = [
  {
    "inputs": [{ "internalType": "string[]", "name": "_candidates", "type": "string[]" }],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "getCandidates",
    "outputs": [{ "internalType": "string[]", "name": "", "type": "string[]" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "string", "name": "_candidate", "type": "string" }],
    "name": "getVotes",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "string", "name": "_candidate", "type": "string" }],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
