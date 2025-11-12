"use client";
import { useRouter } from "next/navigation";
export default function Page() {
  const router = useRouter();

  return (
    <div className="scanlines bg-blue-100 h-screen">
      <button
        className="absolute top-0 left-0 cursor-pointer border border-black border-2"
        onClick={() => {
          router.push("/selectionpage");
        }}
      >
        back
      </button>
    </div>
  );
}
