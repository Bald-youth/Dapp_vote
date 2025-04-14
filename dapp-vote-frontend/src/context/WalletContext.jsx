import React, { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null);

  const checkIfWalletIsConnected = async () => {
    try {
      if (!window.ethereum) {
        console.log("请安装 MetaMask！");
        return;
      }

      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
        console.log("已有连接的钱包地址：", accounts[0]);
      }
    } catch (error) {
      console.error("Wallet connection check failed:", error);
    }
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("请安装 MetaMask！");
        return;
      }

      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setCurrentAccount(accounts[0]);
      console.log("钱包已连接：", accounts[0]);
    } catch (error) {
      console.error("连接钱包失败：", error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <WalletContext.Provider value={{ currentAccount, connectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};
