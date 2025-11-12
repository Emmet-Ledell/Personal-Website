"use client";
import { useState, useEffect, useRef } from "react";

export default function Page() {
  const title = "Welcome To my Website";
  const subtitle = "press enter to start";
  const menuItems = [
    { label: "Contact Fighter", path: "/contact" },
    { label: "Previous Matches", path: "/projects" },
    { label: "Resume", path: "/resume" },
    { label: "Move Set", path: "/skills" },
  ];

  const [titleState, setTitleState] = useState("");
  const [subTitleWriter, setSubTitleWriter] = useState("");
  const [titleScreen, setTitleScreen] = useState(true);
  const [selectedIndex, setSeelctedIndex] = useState(0);

  const titleScreenRef = useRef(titleScreen);
  const selectedIndexRef = useRef(selectedIndex);

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
          setTitleScreen(false);
        } else {
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
    return () => document.removeEventListener("keydown", keyDownHandler);
  }, []);

  return (
    <div>
      {titleScreen ? (
        <div className="scanlines bg-blue-100 flex items-center justify-center flex-col h-screen">
          <div className="text-6xl">{titleState}</div>
          <div>{subTitleWriter}</div>
        </div>
      ) : (
        <div className="scanlines bg-blue-100 flex items-center justify-center flex-col h-screen gap-4">
          {menuItems.map((option, index) => (
            <div key={index}>
              {selectedIndex === index ? "->" : ""}
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
