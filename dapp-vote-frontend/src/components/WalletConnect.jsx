import React, { useEffect, useState, useContext } from "react";
import { WalletContext } from "../context/WalletContext";

const Voting = () => {
  const { contract, account } = useContext(WalletContext);
  const [candidates, setCandidates] = useState([]);
  const [votes, setVotes] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 获取候选人列表
  const fetchCandidates = async () => {
    try {
      const list = await contract.getCandidates();
      setCandidates(list);
    } catch (err) {
      console.error("获取候选人失败：", err);
    }
  };

  // 获取每位候选人的票数
  const fetchVotes = async () => {
    try {
      const result = {};
      for (const name of candidates) {
        const count = await contract.getVotes(name);
        result[name] = count.toNumber();
      }
      setVotes(result);
    } catch (err) {
      console.error("获取票数失败：", err);
    }
  };

  // 投票逻辑
  const handleVote = async (name) => {
    if (!account) {
      setMessage("请先连接钱包");
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      const tx = await contract.vote(name);
      await tx.wait();
      setMessage(`成功投票给：${name}`);
      await fetchVotes(); // 刷新票数
    } catch (err) {
      setMessage("投票失败，请检查是否已投过票");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (contract) {
      fetchCandidates();
    }
  }, [contract]);

  useEffect(() => {
    if (candidates.length > 0) {
      fetchVotes();
    }
  }, [candidates]);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🗳️ 去中心化投票</h1>

      {message && <p className="mb-2 text-yellow-600">{message}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {candidates.map((name) => (
          <div key={name} className="bg-gray-100 p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{name}</h2>
            <p className="text-gray-700 mb-2">票数：{votes[name] ?? "加载中..."}</p>
            <button
              disabled={loading}
              onClick={() => handleVote(name)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              投票
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Voting;
