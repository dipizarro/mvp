"use client";
import React from 'react';
import { useEffect, useState } from "react";

const backgrounds = [
  "/planetes.webp",
  "/1.webp",
  "/2.webp",
  "/3.webp",
  "/4.webp",
];

export default function StarryBackground() {
  const [currentBackground, setCurrentBackground] = useState(backgrounds[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackground((prev) => {
        const currentIndex = backgrounds.indexOf(prev);
        return backgrounds[(currentIndex + 1) % backgrounds.length];
      });
    }, 10000); // cambia cada 10 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="starry-background fade-transition"
      style={{ backgroundImage: `url(${currentBackground})` }}
    />
  );
}
