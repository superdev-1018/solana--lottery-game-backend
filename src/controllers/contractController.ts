const { Connection, PublicKey, Keypair } = require('@solana/web3.js');
import * as web3 from '@solana/web3.js'
import { TOKEN_PROGRAM_ID, getAssociatedTokenAddress, getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import { Program } from "@coral-xyz/anchor";
const anchor = require("@coral-xyz/anchor");
import { BN } from "bn.js";
import bs58 from 'bs58';
const fs = require("fs");
const path = require("path");

import { getPDA, loadKeypairFromFile, getKeypair, getUserATA } from "../util/utils";
import { time_frame, ticket_price, max_tickets,dev_fees } from "../interfaces/global";


const connection = new Connection(process.env.NETWORK, 'confirmed');
const initializer = getKeypair(process.env.INITIALIZER_PRIVATE_KEY);

const wallet = new anchor.Wallet(initializer);
const provider = new anchor.AnchorProvider(connection, wallet, anchor.AnchorProvider.defaultOptions());
anchor.setProvider(provider);

const programId = new PublicKey(process.env.PROGRAM_ID);
const idlPath = path.join("src", "idl", "lottery.json");
const Lottery = JSON.parse(fs.readFileSync(idlPath, 'utf-8'));
const program = new anchor.Program(Lottery, programId, provider);

const withdrawer = getKeypair(process.env.WITHDRAW_PRIVATE_KEY);
const poolKeypair = getKeypair(process.env.INITIALIZER_PRIVATE_KEY);

if (!process.env.GAME_TOKEN) {
    throw new Error('The GAME_TOKEN environment variable is not defined.');
}

if(!initializer) {
    console.log("Insert initializer private key");
}

if (!poolKeypair) {
    throw new Error('Failed to get the Keypair from the private key.');
}

const gameToken = new PublicKey(process.env.GAME_TOKEN);

let poolATA =  getOrCreateAssociatedTokenAccount(provider.connection, poolKeypair, gameToken, poolKeypair.publicKey);
let withdrawATA =  getOrCreateAssociatedTokenAccount(provider.connection, withdrawer, gameToken, withdrawer.publicKey);
let [globalPDA] =  PublicKey.findProgramAddressSync([Buffer.from("GLOBAL_SETTING_SEED"), initializer.publicKey.toBuffer()], program.programId);
let [lotteryKeyInfoPDA] =  PublicKey.findProgramAddressSync([Buffer.from("LOTTERY_PDAKEY_INFO")], program.programId);
let [winnerTickerPDA] =  PublicKey.findProgramAddressSync([Buffer.from("WINNER_TICKER_SEED")], program.programId);
let [depositeTickerPDA] =  PublicKey.findProgramAddressSync([Buffer.from("DEPOSITE_TICKER_SEED")], program.programId);


export const initialize = async () => {

    const txHash = await program.methods.initialize()
      .accounts({
        globalAccount: globalPDA,
        poolTokenAccount: (await poolATA).address,
        lotteryPdakeyInfo: lotteryKeyInfoPDA,
        withdrawTokenAccount: (await withdrawATA).address,
        winnerTicker: winnerTickerPDA,
        depositeTicker: depositeTickerPDA,
        systemProgram: web3.SystemProgram.programId
      })
      .signers([initializer])
      .rpc()
      .catch((error: any) => {
        console.log("Transaction Error", error);
      });
      const globalAccount = await program.account.globalAccount.fetch(globalPDA);
      console.log(globalAccount)
}


export const initLottery = async () => {
    const globalAccount = await program.account.globalAccount.fetch(globalPDA);
    if (globalAccount.isInitialized ==1){
        for (let i=0;i<10;i++){
            let lotteryPDA = await getPDA([Buffer.from("LOTTERY_INFO_SEED"), initializer.publicKey.toBuffer(), new Uint8Array([i])], program.programId)

            let time_frame_index = i;
            await program.methods.createLottery(
                i,
                time_frame_index, 
                new BN(time_frame[i]),     
                ticket_price[i],           
                new BN(max_tickets[i]),
                dev_fees[i]  
            )
            .accounts({
                admin: initializer.publicKey,
                lottery: lotteryPDA,
                lotteryPdakeyInfo: lotteryKeyInfoPDA,
                systemProgram: web3.SystemProgram.programId
            })
            .signers([initializer])
            .rpc()
            .catch((error: any)=>{console.log(error)});
        }
    }
        let lotteryList = await program.account.lottery.all();
        console.log(lotteryList,"lottery LIst");
}


export const createLottery = async (i: number) => {

    const finalLottery = await program.account.lotteryPdaInfo.fetch(lotteryKeyInfoPDA);
    console.log(finalLottery,"final lottery in create");
    let final_id = finalLottery.count;
    let lotteryPDA = await getPDA([Buffer.from("LOTTERY_INFO_SEED"), initializer.publicKey.toBuffer(), new Uint8Array([final_id])], program.programId)

    await program.methods.createLottery(
        final_id,
        i, 
        new BN(time_frame[i]),     
        ticket_price[i],           
        new BN(max_tickets[i]),
        dev_fees[i]  
    )
    .accounts({
        admin: initializer.publicKey,
        lottery: lotteryPDA,
        lotteryPdakeyInfo: lotteryKeyInfoPDA,
        systemProgram: web3.SystemProgram.programId
    })
    .signers([initializer])
    .rpc()
    .catch((error: any)=>{console.log(error)});

}


export const endLottery = async (i:number) => {
    try {
        const lotteries = await program.account.lottery.all();
        console.log(`Number of lotteries fetched: ${lotteries.length}`);

        const filteredLotteries = lotteries.filter((lottery: any) => lottery.account.timeFrame.eq(new BN(time_frame[i])));

        if (filteredLotteries.length > 0) {
            const finalOneLottery = filteredLotteries.reduce((prev:any, current:any) => {
                return (prev.account.id > current.account.id) ? prev : current;
            });
            console.log(finalOneLottery,"Final Lottery");

            let winnerTickerPDA = anchor.web3.PublicKey.findProgramAddressSync([Buffer.from("WINNER_TICKER_SEED")], program.programId);

            await program.methods.endLottery()
                .accounts({
                    admin: initializer.publicKey,
                    lottery: finalOneLottery.publicKey,
                    poolTokenAccount: (await poolATA).address,
                    taxTokenAccount: (await withdrawATA).address,
                    winnerTicker: winnerTickerPDA
                })
                .signers([initializer])
                .rpc()
                .then( async () => {
                    if (finalOneLottery.account.winner && finalOneLottery.account.winner.length >= 3) {

                        let winner1 = await finalOneLottery.account.winner[0];
                        let winner2 = await finalOneLottery.account.winner[1];
                        let winner3 = await finalOneLottery.account.winner[2];
                        
                        let winner1ATA = await getUserATA(winner1, gameToken, connection);
                        let winner2ATA = await getUserATA(winner2, gameToken, connection);
                        let winner3ATA = await getUserATA(winner3, gameToken, connection);

                        const txHash = await program.methods.prizeDistribution()
                            .accounts({
                                admin: initializer.publicKey,
                                poolTokenAccount: (await poolATA).address,
                                lottery: finalOneLottery.publicKey,
                                winner1TokenAddress: winner1ATA,
                                winner2TokenAddress: winner2ATA,
                                winner3TokenAddress: winner3ATA,
                                tokenProgram: TOKEN_PROGRAM_ID,
                                systemProgram: web3.SystemProgram.programId
                            })
                        
                        console.log(txHash,"success");
                    }
                }
            );

            console.log("txhash in endlottery**********")
            

        } else {
            console.log("No lotteries matched the time frame.");
        }
    } catch (error) {
        console.error("Error in endLottery:", error);
    }
};
        

