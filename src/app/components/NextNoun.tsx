'use client'

import Image from "next/image"
import useGetNextNoun from "../hooks/useGetNextNoun"
import { erc721ABI, useContractRead } from "wagmi"
import useGetName from "../hooks/useGetName"
import { NOUNS_TOKEN_MAIN } from "../addresses"
import { formatDate, mintDates } from "../utils"
import { MintButton } from "./MintButton"

export default function NextNoun() {
   const { nextNoun, isLoading: nextNounLoading } = useGetNextNoun()
   const { data: ownerAddress, isLoading: ownerLoading } = useContractRead({
      abi: erc721ABI,
      address: NOUNS_TOKEN_MAIN,
      functionName: 'ownerOf',
      args: [nextNoun!],
      enabled: nextNoun != null
   })


   const mintDateObj = nextNoun ? mintDates.filter(o => o.id == (Number(nextNoun) % 10 == 0 ? Number(nextNoun) + 1 : Number(nextNoun)))[0] : {id: 0, date: 0}
   const mintDateString = formatDate(mintDateObj.date)
   const { name, isLoading: ensLoading, guarantee: nameGuarantee} = useGetName(ownerAddress!, ownerAddress != null)
   if(nextNoun && nextNoun < 900n) {
      return(
         <div className=" w-fit flex flex-col sm:flex-row sm:gap-x-4 gap-y-2">
            <Image
               src={`https://noun.pics/${nextNoun}.svg`}
               width={450}
               height={450}
               alt="Noun"
               className=""
            />
            <div className="flex flex-col items-start">
               <div className=" text-gray-400 text-lg font-dm font-light">UP NEXT</div>
               <div className=" text-3xl font-londrina">{`N900UN #${nextNoun}`}</div>
               <div className="text-sm text-gray-700 font-dm">Born {mintDateString}</div>
               <div className="text-sm text-gray-700 font-dm mb-6">{`Real Noun owned by ${ensLoading ? nameGuarantee : name}`}</div>
               <MintButton/>
            </div>
            </div>
      )
   } else if(nextNoun == 900n) { 
      return(
         <div>Sold out!</div>
      )
   } else {
      return (
         <div>Loading...</div>
      )
   }
}