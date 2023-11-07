
import Link from "next/link"
import NextNoun from "./components/NextNoun"

export default function Home() {
   return (
      <main className="flex min-h-screen flex-col items-start p-4 sm:p-24">
         <div className="text-3xl font-londrina mb-4">N900UNS</div>
         <div className="text-md text-gray-700 font-dm mb-2 max-w-[75%]">N900UNS is a celebration of the first 900 Nouns and an opportunity for anyone to own a “real” Noun at a discount. While obviously not part of the main Nouns token contract, they point to the same metadata and are essentially a “real” copy.</div>
         <div className="text-md text-gray-700 font-dm mb-8 max-w-[75%]">{`50% of proceeds go to the Nouns DAO's treasury.`}</div>

         <NextNoun/>
         <div className="mt-12 font-dm">Built by <Link href="https://www.x.com/anquetil" target="_blank" className="text-gray-500 underline">martin</Link></div>
      </main>
   )
}
