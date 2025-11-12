"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Page() {
  const title = "Welcome To my Website";
  const [titleState, setTitleState] = useState("");
  let index = 0;
  const [titleScreen, setTitleScreen] = useState(true);
  const [selectedIndex, setSeelctedIndex] = useState(0);

  async function animateText() {
    for (index = 0; index < title.length + 1; index++) {
      if (Math.random() > 0.75 && index > 0 && index < title.length - 2) {
        setTitleState(title.slice(0, index - 1) + "%" + title[index - 1]);
      } else {
        setTitleState(title.slice(0, index));
      }
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  }

  const subtitle = "press enter to start";
  const [subTitleWriter, setSubTitleWriter] = useState("");
  const randomDelay = Math.floor(Math.random() * (110 - 89)) + 90;

  async function animateBottom() {
    for (index = 0; index < subtitle.length + 1; index++) {
      setSubTitleWriter(subtitle.slice(0, index));
      await new Promise((resolve) => setTimeout(resolve, randomDelay));
    }
  }

  useEffect(() => {
    const audio = new Audio("/sounds/arrowsound.mp3");
    audio.play();
    animateText();
    setTimeout(() => {
      animateBottom();
    }, 5000);

    const keyDownHandler = (e: KeyboardEvent) => {
      console.log(e.key);
      if (e.key === "Enter") {
        if (titleScreen) {
          // select.play();
          setTitleScreen(false);
        }
      }
    };
    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  const options = [
    "Contact Fighter (contact)",
    "Previous Matches (projects)",
    "Resume (fix later)",
    "Move set (skills)",
  ];

  return (
    <div>
      {titleScreen ? (
        <div className="flex items-center justify-center h-full flex-col h-screen">
          <div className="text-6xl">{titleState}</div>
          <div>{subTitleWriter}</div>{" "}
        </div>
      ) : (
        <div>
          <div className="content flex flex-col items-center justify-center h-full gap-4">
            {/* {#each options as option, i}
          <div class="text-3xl">
            {selectedIndex === i ? '-> ' : ''}{option}
          </div>
        {/each} */}
          </div>{" "}
        </div>
      )}

      {/* hello 2<Link href={"lol"}> button</Link> */}
    </div>
  );
}
