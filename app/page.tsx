"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const title = "Welcome To my Website";
  const subtitle = "press enter to start";

  const [titleState, setTitleState] = useState("");
  const [subTitleWriter, setSubTitleWriter] = useState("");

  const randomDelay = Math.floor(Math.random() * (110 - 89)) + 90;
  let titleIndex = 0;
  let subTitleIndex = 0;

  async function animateText() {
    for (titleIndex = 0; titleIndex < title.length + 1; titleIndex++) {
      if (
        Math.random() > 0.75 &&
        titleIndex > 0 &&
        titleIndex < title.length - 2
      ) {
        setTitleState(
          title.slice(0, titleIndex - 1) + "%" + title[titleIndex - 1]
        );
      } else {
        setTitleState(title.slice(0, titleIndex));
      }
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  }

  async function animateBottom() {
    for (
      subTitleIndex = 0;
      subTitleIndex < subtitle.length + 1;
      subTitleIndex++
    ) {
      setSubTitleWriter(subtitle.slice(0, subTitleIndex));
      await new Promise((resolve) => setTimeout(resolve, randomDelay));
    }
  }

  const keyDownHandler = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      const audio = new Audio("/sounds/entersound.mp3");
      audio.play();
      router.push("/selectionpage");
    }
  };

  useEffect(() => {
    const gamestartAudio = new Audio("/sounds/gamestart.mp3");

    (async () => {
      gamestartAudio.play();
      await new Promise((result) => setTimeout(result, 2000));

      gamestartAudio.pause();
      animateText();
      await new Promise((result) => setTimeout(result, 4500));

      animateBottom();

      document.addEventListener("keydown", keyDownHandler);
    })();

    return () => document.removeEventListener("keydown", keyDownHandler);
  }, []);

  return (
    <div className="scanlines bg-blue-100 flex items-center justify-center flex-col h-screen">
      <div className="text-6xl">{titleState}</div>
      <div>{subTitleWriter}</div>
    </div>
  );
}
