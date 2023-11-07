'use client'

import { useAccount, useContractWrite, useNetwork, usePrepareContractWrite, useWaitForTransaction } from "wagmi"
import { CustomConnectButton } from "./CustomConnectButton"
import { goerli } from "viem/chains"
import { wagmiConfig } from "../providers"
import { mintABI } from "../abi"
import { LoadingNoggles } from "./LoadingNoggles"
import Link from "next/link"
import { CONTRACT_DEPLOY } from "../addresses"

export const MintButton = () => {
   const { isConnected, address } = useAccount()
   const { chain } = useNetwork()
   const correctChain = chain?.id == 1 // 1 for mainnet
   const { config } = usePrepareContractWrite({
      address: CONTRACT_DEPLOY,
      abi: mintABI,
      functionName: 'mintNext',
      value: 5000000000000000n
   })

   const {write, data } = useContractWrite(config)
   const { data: transactionData, isError, isLoading, isSuccess,} = useWaitForTransaction({hash: data?.hash})
   if(isConnected && correctChain){
      if(isLoading){
         return <LoadingNoggles/>
      } else if(isSuccess){
         return <div className="font-dm">You minted a N900UN! <br></br><Link className="underline text-gray-500" href={`https://etherscan.io/tx/${transactionData?.transactionHash}`}>Transaction</Link></div>
      } else {
         return <button
            className={`w-fit text-sm text-gray-800 rounded border border-gray-300 p-2 shadow hover:shadow-md bg-white
                  ease-in-out transition-all active:mt-[2px] active:mb-[-2px]`}
            onClick={() => {console.log('here');write?.();}}
            type='button'
         >
            {`Mint this N900UN (0.005 ETH)`}
         </button> 
      }
   } else {
      return <CustomConnectButton/>
   }
}
