"use client";

import { useRouter } from 'next/navigation';
import Image from "next/image";
import { UserButton } from '@clerk/nextjs';
import {admin} from "@/utils/schema";
import {db} from "@/utils/db";
import { useEffect,useState } from 'react';
import { eq } from 'drizzle-orm';


export default function Home() {
  const [giveaway, setGiveaway] = useState(false);
  useEffect(() => {
    const fetchgiveaway = async () => {
      try {
        const result = await db
          .select({ giveaway: admin.giveaway })
          .from(admin)
          .where(eq(admin.id,1));
        if (result.length > 0) {
          setGiveaway(result[0].giveaway);
        } else {
          setGiveaway(true);
        }
      } catch (error) {
        console.error("Failed to fetch giveaway:", error);
        setGiveaway(true);
      }
    }
    fetchgiveaway();
  }, []);

  const router = useRouter();

  const navigatetorules = () => {
    router.push("/rules");
  };

  const navigatetoentries = () => {
    router.push("/entries");
  };

  const navigatetogiveaway = () => {
    router.push("/giveaway");
  }

  const navigatetomerch = () => {
    router.push("/merch");
  }

  const navigatetowinner = () => {
    router.push("/winner");
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen">
      <Image 
          src="/real_background.jpg"
          alt="background"
          fill
          style={{objectFit:"cover"}}
      />
      
      {/* UserButton positioned top right */}
      <div className="absolute top-4 right-4 z-50">
        <UserButton 
          appearance={{
            elements: {
              userButtonAvatarBox: "h-9 w-9", // Increase avatar size
            }
          }}
          className="user-button-clerk hover:scale-105 transition-transform duration-200"
        />
      </div>

      {/* Buttons container */}
      <div className="relative z-10 space-y-6 mb-20 text-center">
        <button
          onClick={navigatetorules}
          className="w-64 py-4 text-white text-xl font-semibold bg-black bg-opacity-70 border-4 border-green-500 rounded-lg hover:bg-green-500 hover:text-black transition duration-300"
        >
          RULES
        </button>
        <div className="relative z-10">
        <button
          onClick={navigatetoentries}
          className="w-64 py-4 text-white text-xl font-semibold bg-black bg-opacity-70 border-4 border-green-500 rounded-lg hover:bg-green-500 hover:text-black transition duration-300"
        >
          EARN ENTRIES
        </button>
        </div>
        <div className="relative z-10">
        <button
        onClick={() => giveaway ? navigatetogiveaway() : navigatetowinner()}
        className="w-64 py-4 text-white text-xl font-semibold bg-black bg-opacity-70 border-4 border-green-500 rounded-lg hover:bg-green-500 hover:text-black transition duration-300">
          GIVEAWAY
        </button>
        </div>
        <div className="relative z-10">
        <button
        onClick = {navigatetomerch}
        className="w-64 py-4 text-white text-xl font-semibold bg-black bg-opacity-70 border-4 border-green-500 rounded-lg hover:bg-green-500 hover:text-black transition duration-300">
          GENSHIN MERCH
        </button>
      </div>
      </div>

      <div className="absolute inset-0 bg-black bg-opacity-40 z-0"></div>
    </div>
  );
}