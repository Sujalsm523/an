"use client";
import { useEffect, useState } from "react";
import styles from "./home.module.css";

export default function Home() {
  const [popups, setPopups] = useState([]);

  const messages = [
    "Her Eyes",
    "Her Heart",
    "Her Mind",
    "Her Body",
    "Her Soul",
    "Her Voice",
    "Her Neck",
    "Her Hands",
    "Her Presence",
    "Her Kindness",
    "Her Nature",
    "Her Shyness",
    "Her Lips",
    "Her Touch",
    "Her Vibes",
    "Her Fragrance",
    "Her Thighs",
    "Her Name",
    "Her Attitude",
    "Her Childishness",
    "Her Innocence",
    "Her Cheeks",
    "Her Touch",
  ];

  const popupWidth = 150;
  const popupHeight = 100;

  const generatePosition = (existing) => {
    const maxAttempts = 100;
    for (let i = 0; i < maxAttempts; i++) {
      const top = Math.random() * (window.innerHeight - popupHeight);
      const left = Math.random() * (window.innerWidth - popupWidth);

      const overlaps = existing.some(
        (p) =>
          Math.abs(p.top - top) < popupHeight &&
          Math.abs(p.left - left) < popupWidth
      );

      if (!overlaps) return { top, left };
    }
    return null; // Failed to find a non-overlapping spot
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (popups.length >= 50) return;

      const position = generatePosition(popups);
      if (!position) return;

      const newPopup = {
        id: Date.now(),
        message: messages[Math.floor(Math.random() * messages.length)],
        ...position,
      };

      setPopups((prev) => [...prev, newPopup]);
    }, 200);

    return () => clearInterval(interval);
  }, [popups]);

  const removePopup = (id) => {
    setPopups((prev) => prev.filter((popup) => popup.id !== id));
  };

  return (
    <div className={styles.container}>
      {popups.map((popup) => (
        <div
          key={popup.id}
          className={styles.popup}
          style={{ top: popup.top, left: popup.left }}
        >
          <div className={styles.popupHeader}></div>
          <div className={styles.popupBody}>{popup.message}</div>
        </div>
      ))}
    </div>
  );
}
