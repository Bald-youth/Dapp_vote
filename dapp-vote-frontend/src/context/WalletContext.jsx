import React, { createContext, useState, useEffect } from "react";
import { BrowserProvider } from "ethers"; // ✅ ethers v6 写法

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null);

  const connectWallet = async () => {
    if (!window.ethereum) return alert("请安装 MetaMask");

    try {
      const provider = new BrowserProvider(window.ethereum); // ✅ ethers v6
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setCurrentAccount(address);
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <WalletContext.Provider value={{ currentAccount }}>
      {children}
    </WalletContext.Provider>
  );
};
