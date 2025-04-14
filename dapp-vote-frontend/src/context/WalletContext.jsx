// src/context/WalletContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";

// 创建钱包上下文
export const WalletContext = createContext();

// WalletProvider 组件用于提供钱包连接状态
export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(null); // 存储钱包地址
  const [provider, setProvider] = useState(null); // 存储以太坊提供者
  const [isConnected, setIsConnected] = useState(false); // 钱包连接状态

  // 检查钱包连接
  const checkWalletConnection = async () => {
    if (window.ethereum) {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(web3Provider);
      const accounts = await web3Provider.listAccounts();
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        setIsConnected(true);
      } else {
        setIsConnected(false);
      }
    } else {
      alert("Please install MetaMask to use this app.");
    }
  };

  // 连接钱包
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        checkWalletConnection();
      } catch (error) {
        console.error("Wallet connection failed:", error);
      }
    } else {
      alert("Please install MetaMask to connect your wallet.");
    }
  };

  // 断开钱包连接
  const disconnectWallet = () => {
    setWalletAddress(null);
    setIsConnected(false);
  };

  // 在组件挂载时检查钱包连接
  useEffect(() => {
    checkWalletConnection();

    // 监听 MetaMask 账户变化
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", checkWalletConnection);
      window.ethereum.on("chainChanged", checkWalletConnection);
    }

    // 清除监听器
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", checkWalletConnection);
        window.ethereum.removeListener("chainChanged", checkWalletConnection);
      }
    };
  }, []);

  return (
    <WalletContext.Provider
      value={{
        walletAddress,
        isConnected,
        connectWallet,
        disconnectWallet,
        provider,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
