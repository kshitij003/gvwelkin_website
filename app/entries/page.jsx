"use client";
import { Button } from "@/components/ui/button";
import { useState, useEffect, use } from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { Points } from "@/utils/schema";
import { db } from "@/utils/db";
import { eq } from "drizzle-orm";
import {admin} from "@/utils/schema";

function Entry() {
  const [lastLogin, setLastLogin] = useState(null);
  const [canLogin, setCanLogin] = useState(true);
  const { user } = useUser();
  const [points, setPoints] = useState(0);
  const [link, setLink] = useState("");

  useEffect(() => {
    const fetchPoints = async () => {
      if (user) {
        try {
          const result = await db
            .select({ point: Points.point })
            .from(Points)
            .where(eq(Points.name, user.id));

          if (result.length > 0) {
            setPoints(result[0].point);
          } else {
            setPoints(0);
          }
        } catch (error) {
          console.error("Failed to fetch points:", error);
          setPoints(0);
        }
      }
    };

    fetchPoints();
  }, [user]);

  useEffect(() => {
    const fetchlink = async () => {
      try {
        const result = await db
          .select({ link: admin.link })
          .from(admin)
          .where(eq(admin.id, 1));
        if (result.length > 0) {
          setLink(result[0].link);
        } else {
          setLink("https://www.youtube.com/watch?v=Qfo2zBIIons");
        }
      } catch (error) {
        console.error("Failed to fetch link:", error);
        setLink("https://www.youtube.com/watch?v=Qfo2zBIIons");
      }
    };
    fetchlink();
  }, []);
        


  useEffect(() => {
    const storedTime = localStorage.getItem("lastLoginTime");
    const currentTime = new Date();

    if (storedTime) {
      const lastLoginTime = new Date(storedTime);
      const resetTime = new Date();
      resetTime.setHours(15, 0, 0, 0);

      if (currentTime > resetTime && lastLoginTime < resetTime) {
        setCanLogin(true);
      } else {
        setCanLogin(false);
      }
    }
  }, []);

  const redirect = async () => {
    try {
      await db
        .update(Points)
        .set({ point: points + 1 })
        .where(eq(Points.name, user.id));

      setPoints(points + 1);
    } catch (error) {
      console.error("Error updating points:", error);
    }
    window.location.href = link;
  }

  const handleDailyLogin = async () => {
    if (canLogin && user) {
      const currentTime = new Date();
      localStorage.setItem("lastLoginTime", currentTime);
      setLastLogin(currentTime);
      setCanLogin(false);

      try {
        await db
          .update(Points)
          .set({ point: points + 1 })
          .where(eq(Points.name, user.id));

        setPoints(points + 1);
      } catch (error) {
        console.error("Error updating points:", error);
      }
    }
  };

  const handleShare = async () => {
    const websiteLink = window.location.href;
    navigator.clipboard.writeText(websiteLink);
    alert("Link copied to clipboard! Share it via WhatsApp, Facebook, etc.");
    try {
        await db
          .update(Points)
          .set({ point: points + 1 })
          .where(eq(Points.name, user.id));

        setPoints(points + 1);
      } catch (error) {
        console.error("Error updating points:", error);
      }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
      {/* Background Image */}
      <Image
        src="/bg.png"
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0"
      />
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
      {/* Content */}
      <div className="relative z-10 w-full max-w-md bg-transparent bg-opacity-90 rounded-lg shadow-lg p-6 space-y-4">
        <div className="space-y-2">
          {/* Latest Video Banner */}
          <div className="relative">
            <button className="w-64 py-4 text-white text-xl font-semibold bg-black bg-opacity-70 border-4 border-green-500 rounded-lg hover:bg-green-500 hover:text-black transition duration-300">
              Latest Video
            </button>
            <Button
              onClick={redirect}
              className="absolute bottom-2 right-2 bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              CLAIM
            </Button>
          </div>

          {/* Daily Login Banner */}
          <div className="relative">
            <button className="w-64 py-4 text-white text-xl font-semibold bg-black bg-opacity-70 border-4 border-green-500 rounded-lg hover:bg-green-500 hover:text-black transition duration-300">
              Daily Login
            </button>
            <Button
              onClick={handleDailyLogin}
              disabled={!canLogin}
              className="absolute bottom-2 right-2 bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              CLAIM
            </Button>
          </div>

          {/* Share the Website Banner */}
          <div className="relative">
            <button className="w-64 py-4 text-white text-xl font-semibold bg-black bg-opacity-70 border-4 border-green-500 rounded-lg hover:bg-green-500 hover:text-black transition duration-300">
              Share Website
            </button>
            <Button
              onClick={handleShare}
              className="absolute bottom-2 right-2 bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              CLAIM
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Entry;
