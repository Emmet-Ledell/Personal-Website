"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Page() {
  const title = "Welcome To my Website";
  const [titleState, setTitleState] = useState("");
  let index = 0;
  const [titleScreen, setTitleScreen] = useState(true);

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

  useEffect(() => {
    animateText;
  });

  return (
    <div className="border border-black">
      {titleState}
      hello 2<Link href={"lol2"}> button</Link>
    </div>
  );
}
