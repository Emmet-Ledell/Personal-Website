"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function SelectionPage() {
  const router = useRouter();

  const menuItems = [
    { label: "Contact", path: "/contact" },
    // { label: "Projects", path: "/projects" },
    { label: "Resume", path: "/resume" },
    // { label: "Skills", path: "/skills" },
    { label: "Mini Games", path: "/minigames" },
  ];

  const [selectedIndex, setSeelctedIndex] = useState(0);
  const selectedIndexRef = useRef(selectedIndex);

  useEffect(() => {
    selectedIndexRef.current = selectedIndex;
  }, [selectedIndex]);

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      const arrowSound = new Audio("/sounds/arrowsound.mp3");
      const selectionsound = new Audio("/sounds/projectselect.mp3");

      if (e.key === "Enter") {
        selectionsound.play();
        router.push(menuItems[selectedIndexRef.current].path);
      }

      if (e.key === "ArrowDown") {
        arrowSound.play();
        setSeelctedIndex((prev) =>
          prev < menuItems.length - 1 ? prev + 1 : prev
        );
      }

      if (e.key === "ArrowUp") {
        arrowSound.play();
        setSeelctedIndex((prev) => (prev > 0 ? prev - 1 : prev));
      }
    };

    document.addEventListener("keydown", keyDownHandler);
    return () => document.removeEventListener("keydown", keyDownHandler);
  });

  return (
    <div className="scanlines bg-blue-100 flex items-center justify-center flex-col h-screen gap-4">
      {menuItems.map((option, index) => (
        <div key={index}>
          {selectedIndex === index ? "->" : ""}
          {option.label}
        </div>
      ))}
    </div>
  );
}
