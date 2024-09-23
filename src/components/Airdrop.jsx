import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";


export function Airdrop() {
    const { connection } = useConnection();
    const wallet = useWallet();
    const [sol,setSol]=useState("");
    
    
    const getsol = async(event)=>{
        if (wallet.publicKey) {
            console.log(wallet.publicKey.toBase58());
            try {
                const signature = await connection.requestAirdrop(wallet.publicKey,sol * LAMPORTS_PER_SOL);
                console.log("airdrop done signature = "+signature);
            } catch (error) {
                console.log(error);
            }
        }
        else{
            console.log("no publicKey")
        }
    };
    return(
        <div style={{width: "100vw",display: "flex", justifyContent: "center"}}>
            <form >
            <input type="text" placeholder="enter amount" onChange={(e) => setSol(e.target.value)} value={sol}/>
            <button onClick={getsol}>Airdrop</button>
            </form>
        </div>
    );
}