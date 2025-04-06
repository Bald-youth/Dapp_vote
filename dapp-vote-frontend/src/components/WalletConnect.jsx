import { useState } from 'react';
import { ethers } from 'ethers';

const WalletConnect = ({ onConnect }) => {
  const [account, setAccount] = useState(null);

  async function connectWallet() {
    if (!window.ethereum) {
      alert('请安装 MetaMask！');
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
      onConnect(address);
    } catch (error) {
      console.error('钱包连接失败:', error);
    }
  }

  return (
    <div>
      {account ? (
        <p>已连接：{account}</p>
      ) : (
        <button onClick={connectWallet}>连接钱包</button>
      )}
    </div>
  );
};

export default WalletConnect;
