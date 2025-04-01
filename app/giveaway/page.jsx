"use client";
import { React, use, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { giveaway } from "@/utils/schema";
import { db } from "@/utils/db";
import { Points } from "@/utils/schema";
import { eq } from "drizzle-orm";

function Giveaway() {
  const { user } = useUser();
  const [points, setPoints] = useState(0);
  useEffect(() => {
    const fetchPoints = async () => {
      if (user) {
        try {
          const result = await db
            .select({ point: Points.point })
            .from(Points)
            .where(eq(Points.name, user.id));
          setPoints(result.length > 0 ? result[0].point : 0);
        } catch (error) {
          console.error("Failed to fetch points:", error);
        }
      }
    };
    fetchPoints();
  }, [user]);
  const enterGiveaway = async () => {
    try {
      if (points === 0) {
        alert("You don't have enough points to enter the giveaway!");
        return;
      }
      setPoints(points - 1);
      // Check if the user has enough points
      // Proceed with the giveaway logic
      await db.insert(giveaway).values({
        name: user.id,
      });

      // Update the points after entering the giveaway
      await db.update(Points)
        .set({ point: points - 1 })
        .where(eq(Points.name, user.id));

      alert("You have entered the giveaway!");

    } catch (error) {
      console.error("Failed to enter giveaway:", error);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-blue-900">
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg.png"
          alt="background"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="absolute top-4 right-4 z-50 flex flex-row items-center space-x-2">
              <Image 
                src="/1710328702878.png"
                alt="Points"
                width="80"
                height="80"
                className="height-8 width-8" 
              />
              <div className="font-medium text-5xl text-white">
              {points} {/* Display actual points value */}
              </div>
            </div>
      <div className="z-10 flex flex-col items-center">
        <div className="relative w-[90vw] max-w-[600px] h-[70vw] max-h-[500px] flex items-center justify-center">
          <Image
            src="/giveaway_photo.png"
            alt="Giveaway Photo"
            fill
            className="rounded-full object-cover"
          />
        </div>
        <Button
          onClick={enterGiveaway}
          className="mt-1 bg-yellow-500 text-black font-bold py-9 px-14 rounded-full shadow-lg hover:bg-yellow-600 text-lg"
        >
          Entry ×1
        </Button>
      </div>
    </div>
  );
}

export default Giveaway;
