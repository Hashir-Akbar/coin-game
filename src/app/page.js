"use client";

import Click from "@/components/click";
import SpinWheel from "@/components/wheel";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const { user, signOut } = useAuth();
  const [coins, setCoins] = useState(0);

  const addTenCoins = () => {
    setCoins((prevCoins) => prevCoins + 10);
  };
  const handleWinValue = (value) => {
    setCoins((prevCoins) => {
      const newCoins = Number(prevCoins) + Number(value);
      return newCoins === 0 ? 0 : newCoins;
    });
  };

  return (
    <main className="max-w-[96%] px-4 mx-auto">
      <div className="flex justify-between items-center bg-[#04073B] text-white shadow rounded-lg mt-8 p-4">
        <div>
          <span className="text-sm">
            {user ? "Welcome Back!" : "Earn Money Today!"}
          </span>
          <h1 className="text-4xl uppercase">{user?.username || "Signup"}</h1>
        </div>
        <div className="flex gap-4 sm:flex-row flex-col items-end">
          <Link
            href={user ? "/withdraw" : "/sign-up"}
            className="px-4 py-2 bg-[#084599] rounded-lg text-sm"
          >
            <button className="uppercase italic font-bold">
              {user ? "Withdraw" : "Signup Now"}
            </button>
          </Link>
          {user && (
            <Click>
              <button
                className="uppercase italic font-bold px-4 py-2 bg-[#084599] rounded-lg text-sm"
                onClick={signOut}
              >
                SignOut
              </button>
            </Click>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center bg-[#04073B] text-white shadow rounded-lg mt-4 p-4">
        <h2>{user ? "Total Balance" : "Login to check Balance"}</h2>
        <div className="flex gap-1 items-center">
          <Image src="/coin.png" width={30} height={50} alt="coin" />
          {user && <span className="text-4xl">{coins}</span>}
        </div>
      </div>

      <Click>
        <div
          className="flex flex-col gap-5 justify-between items-center bg-[#040542] text-white shadow rounded-lg mt-4 p-8 hover:scale-105 transition cursor-pointer"
          onClick={addTenCoins}
        >
          <Image src="/coin.png" width={200} height={200} alt="coin" />
          <div className="uppercase italic">
            {user ? "Click me to earn 10 Coins" : "Login to earn Coins"}
          </div>
        </div>
      </Click>

      <SpinWheel loggedIn={!!user} winValue={(e) => handleWinValue(e)} />
    </main>
  );
}
