import { useState } from 'react';
import WalletConnect from '../components/WalletConnect';
import { Link } from 'react-router-dom';

const Home = () => {
  const [account, setAccount] = useState(null);

  return (
    <div>
      <h1>去中心化投票 DApp</h1>
      <WalletConnect onConnect={setAccount} />
      {account && <Link to="/voting">进入投票页面</Link>}
    </div>
  );
};

export default Home;
