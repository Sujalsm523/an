"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

const greetings = [
  "Happy Birthday, Anushka!🩷",
  "¡Feliz cumpleaños, Anushka!🩷",
  "Joyeux anniversaire, Anushka !🩷",
  "Alles Gute zum Geburtstag, Anushka!🩷",
  "Buon compleanno, Anushka🩷!",
  "Feliz aniversário, Anushka!🩷",
  "Gefeliciteerd met je verjaardag, Anushka!🩷",
  "С днём рождения, Анушка!🩷",
  "जन्मदिन मुबारक हो, अनुष्का!🩷",
  "শুভ জন্মদিন, অনুষ্কা!🩷",
  "જન્મદિવસ ની શુભેચ્છાઓ, અનુષ્કા!🩷",
  "பிறந்த நாள் வாழ்த்துகள், அனுஷ்கா!🩷",
  "పుట్టినరోజు శుభాకాంక్షలు, అనుష్కా!🩷",
  "ಹುಟ್ಟುಹಬ್ಬದ ಶುಭಾಶಯಗಳು, ಅನುಷ್ಕಾ!🩷",
  "お誕生日おめでとう、アヌシュカ！🩷",
  "생일 축하해요, 아누슈카!🩷",
  "生日快乐，阿努什卡！🩷",
  "عيد ميلاد سعيد، أنوشكا!🩷",
  "Doğum günün kutlu olsun, Anushka!🩷",
  "Χρόνια πολλά, Anushka!🩷",
  "Heri ya siku ya kuzaliwa, Anushka!🩷",
];

export default function BirthdayMultilangCard() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef(null);

  const startCelebration = () => {
    setStarted(true);
    launchConfetti();
    if (audioRef.current && !muted) {
      audioRef.current.play().catch(() => {});
    }
  };

  const launchConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 },
    });
    setTimeout(launchConfetti, 4000);
  };

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const current = greetings[index];
    setText("");
    const typing = setInterval(() => {
      setText((prev) => prev + current.charAt(i));
      i++;
      if (i === current.length) clearInterval(typing);
    }, 80);

    const cursorBlink = setInterval(() => {
      setShowCursor((c) => !c);
    }, 500);

    const nextTimeout = setTimeout(() => {
      setIndex((prev) => (prev + 1) % greetings.length);
    }, current.length * 80 + 1500);

    return () => {
      clearInterval(typing);
      clearInterval(cursorBlink);
      clearTimeout(nextTimeout);
    };
  }, [index, started]);

  return (
    <div className="relative max-w-2xl mx-auto p-4 text-center">
      <motion.div
        className="bg-pink-100 rounded-2xl shadow-xl p-6 border-4 border-pink-300"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        <h2 className="text-2xl font-bold text-pink-800 mb-4">
          🎉 Birthday Wishes 🌍
        </h2>

        {started ? (
          <p className="text-xl text-pink-700 font-mono min-h-[3rem]">
            {text}
            <span className="inline-block w-1">
              {showCursor ? "|" : "\u00A0"}
            </span>
          </p>
        ) : (
          <button
            onClick={startCelebration}
            className="bg-pink-500 text-white px-4 py-2 mt-2 rounded-full hover:bg-pink-600 transition"
          >
            🌐 Translate Wishes
          </button>
        )}

        {started && (
          <button
            onClick={() => {
              setMuted(!muted);
              const audio = audioRef.current;
              if (audio) muted ? audio.play() : audio.pause();
            }}
            className="mt-4 inline-block text-sm bg-white border px-3 py-1 rounded-full hover:bg-gray-100 text-pink-600"
          >
            {muted ? "🔇 Unmute Music" : "🔊 Mute Music"}
          </button>
        )}

        <audio ref={audioRef} loop>
          <source src="/bd.mp3" type="audio/mpeg" />
        </audio>
      </motion.div>
    </div>
  );
}
