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
      <div className="flex items-center justify-center flex-col h-screen gap-3 text-center">
        <h1 className="text-xl">
          To Contact Me Use Either Of The Following
        </h1>
        <p>
          Email:{" "}
          <a href="mailto:emmet.ledell@gmail.com" className="underline">
            emmet.ledell@gmail.com
          </a>
        </p>
        <p>
          LinkedIn:{" "}
          <a
            href="https://www.linkedin.com/in/emmet-ledell"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            linkedin.com/in/emmet-ledell
          </a>
        </p>
      </div>
    </div>
  );
}
