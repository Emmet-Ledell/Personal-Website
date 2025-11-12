"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function Page() {
  const title = "Welcome To my Website";
  const [titleState, setTitleState] = useState("");
  let index = 0;
  const [titleScreen, setTitleScreen] = useState(true);
  const titleScreenRef = useRef(titleScreen);

  const [selectedIndex, setSeelctedIndex] = useState(0);
  const selectedIndexRef = useRef(selectedIndex);

  const pathName = window.location.pathname;

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

  const menuItems = [
    { label: "Contact Fighter", path: "/contact" },
    { label: "Previous Matches", path: "/projects" },
    { label: "Resume", path: "/resume" },
    { label: "Move Set", path: "/skills" },
  ];

  useEffect(() => {
    titleScreenRef.current = titleScreen;
  }, [titleScreen]);

  useEffect(() => {
    selectedIndexRef.current = selectedIndex;
  }, [selectedIndex]);

  useEffect(() => {
    animateText();
    setTimeout(() => {
      animateBottom();
    }, 4500);

    const keyDownHandler = (e: KeyboardEvent) => {
      const audio = new Audio("/sounds/entersound.mp3");
      const arrowSound = new Audio("/sounds/arrowsound.mp3");
      if (e.key === "Enter") {
        if (titleScreenRef.current) {
          audio.play();
          // select.play();
          setTitleScreen(false);
        } else {
          console.log("herhehherhehrhere");
          window.location.href = menuItems[selectedIndexRef.current].path;
        }
      }
      if (e.key === "ArrowDown") {
        arrowSound.play();
        setSeelctedIndex((prev) => (prev < 3 ? prev + 1 : prev));
      }
      if (e.key === "ArrowUp") {
        arrowSound.play();
        setSeelctedIndex((prev) => (prev > 0 ? prev - 1 : prev));
      }
    };
    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  return (
    <div>
      {titleScreen ? (
        <div className="flex items-center justify-center h-full flex-col h-screen">
          <div className="text-6xl">{titleState}</div>
          <div>{subTitleWriter}</div>{" "}
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-center h-full flex-col h-screen gap-4">
            {menuItems.map((option, index) => {
              return (
                <div key={index}>
                  {selectedIndex === index ? "->" : ""}
                  {option.label}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* hello 2<Link href={"lol"}> button</Link> */}
    </div>
  );
}
