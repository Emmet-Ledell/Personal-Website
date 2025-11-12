"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function Page() {
  const router = useRouter();
  const backRoute = "/minigames";

  const keyDownHandler = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      router.push(backRoute);
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler);
    return () => document.removeEventListener("keydown", keyDownHandler);
  });

  return (
    <div className="scanlines bg-blue-100 h-screen">
      <button
        className="absolute top-0 left-0 cursor-pointer border border-black border-2"
        onClick={() => {
          router.push(backRoute);
        }}
      >
        back
      </button>
    </div>
  );
}
