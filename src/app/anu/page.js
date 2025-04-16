"use client";
import { useEffect, useState } from "react";
import styles from "../home.module.css";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [popups, setPopups] = useState([]);
  const [remainingMessages, setRemainingMessages] = useState([]);

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
  const popupHeight = 75;

  const shuffle = (arr) => {
    return [...arr].sort(() => Math.random() - 0.5);
  };

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
    return null;
  };

  useEffect(() => {
    // Shuffle messages on mount
    setRemainingMessages(shuffle(messages));
  }, []);

  useEffect(() => {
    if (!showIntro && remainingMessages.length > 0) {
      const interval = setInterval(() => {
        if (popups.length >= 50 || remainingMessages.length === 0) return;

        const position = generatePosition(popups);
        if (!position) return;

        const nextMessage = remainingMessages[0];

        const newPopup = {
          id: Date.now() + Math.random(),
          message: nextMessage,
          ...position,
        };

        setPopups((prev) => [...prev, newPopup]);
        setRemainingMessages((prev) => prev.slice(1));
      }, 200);

      return () => clearInterval(interval);
    }
  }, [showIntro, popups, remainingMessages]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 4000); // Show intro text for 3s

    return () => clearTimeout(timer);
  }, []);

  const removePopup = (id) => {
    setPopups((prev) => prev.filter((popup) => popup.id !== id));
  };

  return (
    <div className={styles.container}>
      {showIntro && (
        <h1 className={styles.revealText}>What do I like about you???</h1>
      )}

      {!showIntro &&
        popups.map((popup) => (
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
