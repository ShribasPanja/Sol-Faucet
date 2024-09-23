import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { useState } from "react";
import { Buffer } from 'buffer';

window.Buffer = Buffer;

export function SendTokens() {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [to, setTo] = useState("");
    const [amount, setAmount] = useState("");

    const sendToken = async () => {
        if (!publicKey) {
            alert("Please connect your wallet first.");
            return;
        }

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: new PublicKey(to),
                lamports: amount * LAMPORTS_PER_SOL,
            })
        );

        try {
            const signature = await sendTransaction(transaction, connection);
            await connection.confirmTransaction(signature, 'processed');
            alert(`${amount} SOL sent to ${to}`);
        } catch (error) {
            console.error(error);
            alert("Transaction failed: " + error.message);
        }
    };

    return (
        <div>
            <input type="text" placeholder="Recipient Address" onChange={(e) => setTo(e.target.value)} value={to} />
            <input type="number" placeholder="Amount (SOL)" onChange={(e) => setAmount(e.target.value)} value={amount} />
            <button onClick={sendToken}>Send</button>
        </div>
    );
}
