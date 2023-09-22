import Landing from './components/Layout/Landing';
import PageTemplate from './components/Layout/sideNavbar';
import Buy from './components/Layout/Buy';
import Profile from './components/Layout/Profile';
import './App.css';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig, useAccount } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  zora,
  goerli,
  pulsechain,
} from "wagmi/chains";

import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "RainbowKit demo",
  projectId: "b174fef01c4f47289ba4030378ae648c",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function App() {
  return (
    <div className="app">  
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>  
          <Router>
            <PageTemplate />
            <Routes>
              <Route exact path="/" element={<Landing></Landing>}></Route>
              <Route exact path="/buy" element={<Buy></Buy>}></Route>
              <Route exact path="/profile" element={<Profile></Profile>}></Route>
            </Routes>
          </Router>
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
}

export default App;
