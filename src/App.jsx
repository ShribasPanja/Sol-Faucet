import React, { FC, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { Airdrop } from './components/Airdrop';
import { Getbalance } from './components/Getbalance';
import { SendTokens } from './components/SendTokens';
const apikey = import.meta.env.VITE_ALCHEMY_API_KEY;
import {
    WalletModalProvider,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
function App(){
    return (
        <ConnectionProvider endpoint={`https://solana-devnet.g.alchemy.com/v2/${apikey}`}>
            <WalletProvider wallets={[]} autoConnect>
                <WalletModalProvider>
                    <div style={{width: "100vw",display: "flex", justifyContent: "center"}}>
                    <WalletMultiButton />
                    </div>
                    <Airdrop/>
                    <Getbalance/>
                    <SendTokens/>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};
export default App;