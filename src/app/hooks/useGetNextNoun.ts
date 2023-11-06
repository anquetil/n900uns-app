import { useContractRead } from 'wagmi'
import { mintABI } from '../abi'
import { CONTRACT_DEPLOY } from '../addresses'

export function useGetNextNoun() {
   const { data: nextNoun, isLoading } = useContractRead({
      abi: mintABI,
      address: CONTRACT_DEPLOY,
      functionName: 'totalSupply',
      watch: true, // automatically refreshes if a new one is minted
   })

   return {
      nextNoun,
      isLoading,
   }
}

export default useGetNextNoun
