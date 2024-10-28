"use client";

import { useRouter } from "next/navigation";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";

export default function Home() {
  const [location, setLoaction] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (location)
      router.push(`/weather?location=${encodeURIComponent(location)}`);
  };
  return (
    <div className="w-full h-auto flex flex-col justify-center items-center">
      <main className="w-full h-screen flex flex-col justify-center items-center gap-4">
        <h3 className="text-6xl font-semibold">
          Get your weather details here
        </h3>

        <form
          className="border py-1 px-3 rounded-full flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLoaction(e.target.value)}
            className="border-0 outline-none bg-transparent placeholder:text-gray-300 placeholder:font-medium text-xl"
          />

          <button className="flex justify-center items-center" type="submit">
            <IoSearch className="font-semibold text-2xl" />
          </button>
        </form>
      </main>
    </div>
  );
}
