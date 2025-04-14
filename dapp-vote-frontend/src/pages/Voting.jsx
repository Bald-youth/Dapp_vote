import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import VotingABI from '../contracts/VotingABI.json';

const CONTRACT_ADDRESS = '0xfDBEaea500412fC5633995Dc4b9aa497b2fb180E'; // 替换为你的合约地址

const Voting = () => {
  const [candidates, setCandidates] = useState([]);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [newCandidate, setNewCandidate] = useState('');
  const [loading, setLoading] = useState(false);
  const [userHasVoted, setUserHasVoted] = useState(false);

  // 初始化合约和账户
  useEffect(() => {
    async function init() {
      try {
        if (!window.ethereum) {
          alert('请安装 MetaMask');
          return;
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);

        const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, VotingABI, signer);
        setContract(contractInstance);

        const candidatesList = await contractInstance.getCandidates();
        setCandidates(candidatesList);

        const voted = await contractInstance.hasVoted(address);
        setUserHasVoted(voted);
      } catch (error) {
        console.error('初始化失败:', error);
      }
    }

    init();
  }, []);

  // 投票函数
  const voteFor = async (index) => {
    if (!contract) return;
    try {
      setLoading(true);
      const tx = await contract.vote(index);
      await tx.wait();
      alert('投票成功 ✅');
      setUserHasVoted(true);
      const updated = await contract.getCandidates();
      setCandidates(updated);
    } catch (error) {
      console.error('投票失败:', error);
      alert('投票失败，请检查权限或是否已投过票');
    } finally {
      setLoading(false);
    }
  };

  // 添加候选人
  const addCandidate = async () => {
    if (!contract || !newCandidate.trim()) return;
    try {
      setLoading(true);
      const tx = await contract.addCandidate(newCandidate.trim());
      await tx.wait();
      alert('添加成功 ✅');
      setNewCandidate('');
      const updated = await contract.getCandidates();
      setCandidates(updated);
    } catch (error) {
      console.error('添加失败:', error);
      alert('添加失败，可能没有权限');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🎯 去中心化投票系统</h1>
      <p>当前连接账户：{account || '未连接'}</p>

      <h2>候选人列表</h2>
      {candidates.length === 0 ? (
        <p>加载中...</p>
      ) : (
        candidates.map((candidate, index) => (
          <div key={index} style={{ marginBottom: '1rem' }}>
            <strong>{candidate.name}</strong> - 票数：{candidate.voteCount.toString()}
            <br />
            {userHasVoted ? (
              <button disabled style={{ color: 'gray' }}>✅ 已投票</button>
            ) : (
              <button onClick={() => voteFor(index)} disabled={loading}>🗳️ 投票</button>
            )}
          </div>
        ))
      )}

      <hr style={{ margin: '2rem 0' }} />

      <h2>➕ 添加新候选人</h2>
      <input
        type="text"
        placeholder="候选人姓名"
        value={newCandidate}
        onChange={(e) => setNewCandidate(e.target.value)}
        style={{ padding: '0.5rem', marginRight: '1rem', width: '200px' }}
      />
      <button onClick={addCandidate} disabled={loading}>添加</button>

      {loading && <p>⏳ 正在处理交易，请稍等...</p>}
    </div>
  );
};

export default Voting;
