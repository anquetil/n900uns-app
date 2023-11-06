import { type Address } from 'viem'
import { useEnsName } from 'wagmi'

export function useGetName(address: Address, enabled: boolean) {
   let name = ''
   let isLoading = false

   const { data: ensData, isLoading: ensLoading } = useEnsName({
      address: address,
      enabled: enabled
   })

   if (ensLoading) {
      isLoading = true
   } else if (ensData && ensData != null) {
      name = ensData
      isLoading = false
   } else if (!ensLoading && address) {
      // DONE LOADING, NO ENS
      name = address.slice(0, 8)
      isLoading = false
   }

   return {
      name,
      isLoading,
      guarantee: address ? address.slice(0, 8) : "",
   }
}

export default useGetName
