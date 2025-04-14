import { useState, useEffect } from "react";
import { ethers } from "ethers";
import VotingABI from "./VotingABI.json";  // 合约 ABI 文件

const CONTRACT_ADDRESS = "0xfDBEaea500412fC5633995Dc4b9aa497b2fb180E"; 

function App() {
    const [account, setAccount] = useState("");
    const [candidates, setCandidates] = useState([]);
    const [votes, setVotes] = useState([]);
    const [contract, setContract] = useState(null);

    useEffect(() => {
        async function loadBlockchainData() {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, VotingABI, signer);
                setContract(contractInstance);
                
                // 获取候选人列表
                const data = await contractInstance.getResults();
                setCandidates(data[0]);
                setVotes(data[1].map(v => v.toNumber()));
            }
        }
        loadBlockchainData();
    }, []);

    async function connectWallet() {
  if (!window.ethereum) {
    alert("请安装 MetaMask!");
    return;
  }

  try {
    // 检查 MetaMask 是否已经连接过
    const accounts = await window.ethereum.request({ method: "eth_accounts" });

    if (accounts.length > 0) {
      console.log("已经连接到:", accounts[0]);
      return; // 避免重复请求
    }

    // 发送请求连接 MetaMask
    const newAccounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    console.log("成功连接:", newAccounts);
  } catch (error) {
    if (error.code === -32002) {
      console.warn("已有 MetaMask 请求待处理，请稍等...");
      alert("请在 MetaMask 中完成授权后再试一次！");
    } else {
      console.error("MetaMask 连接失败:", error);
    }
  }
}
    const vote = async (candidate) => {
        if (contract) {
            const tx = await contract.vote(candidate);
            await tx.wait();
            alert(`成功投票给 ${candidate}！`);
        }
    };

    return (
        <div>
            <h1>去中心化投票系统</h1>
            <button onClick={connectWallet}>{account ? `已连接: ${account}` : "连接钱包"}</button>
            <h2>候选人</h2>
            {candidates.map((candidate, index) => (
                <div key={index}>
                    <span>{candidate} - 票数: {votes[index]}</span>
                    <button onClick={() => vote(candidate)}>投票</button>
                </div>
            ))}
        </div>
    );
}

export default App;
