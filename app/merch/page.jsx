import { Button } from "@/components/ui/button";
import Image from "next/image"
import Link from "next/link";

function Merch() {
  return (
      <div className = "flex flex-col items-center justify-items-start  bg-gradient-to-b from-white via-yellow-100 to-yellow-100 h-screen w-full">
        <div  className = "z-10 text-3xl py-7">
        <h1 className = "font-bold text-center">Purchase Genesis Crystals and other in-game Items</h1>
        <h1 className = "text-center font-bold">at upto 20% discount</h1>
        </div>
        <div className = "z-10">
        <Image 
          src = "/deal.png"
          alt = "photo"
          width = {1000}
          height = {200}
        />
        </div>
        <div className = "z-10 text-3xl">
          <h1 className = "text-center font-bold">Our Partners</h1>
        </div>
        <div className = "relative flex flex-row justify-start min-h-screen space-x-10 bg-gradient-to-b from-yellow-100 via-yellow-100 to-white h-screen w-full">
          <div>
          <Link href="https://lootbar.gg/top-up/genshin-impact-top-up?utm_source=generalvansh">
          <Image 
            src = "/lootbar_logo.png"
            alt="logo"
            width = {700}
            height = {150}
          />
          </Link>
          </div>
          <div>
            <Link href="https://ambsells.com/?ref=generalvansh">
            <Image 
              src = "/logo1.png"
              alt = "logo"
              width = {700}
              height = {150}
            />
            </Link>
          </div>
        </div>
      </div>
  );
}

export default Merch;
