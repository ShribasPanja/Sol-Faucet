import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useCallback, useEffect, useState } from "react";

export function Getbalance() {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [balance,setBalance] =useState(null);
    const fetchBalance = async()=>{
        if (wallet?.publicKey) {
            try {
                const balance = await connection.getBalance(wallet.publicKey);
                setBalance(balance / LAMPORTS_PER_SOL);
            } catch (error) {
                console.error(error);
                setBalance(null);
            }
        }
        else{
            setBalance(null);
        }
    };
    useEffect(()=>{
        fetchBalance();
    },[wallet,connection]);
    return(
        <div style={{width: "100vw",display: "flex", justifyContent: "center"}}>
        balance is {balance !== null ? balance : "loading..."} SOL
        </div>
    )
}