import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import "./App.css";

import Wordle from "./components/Wordle";

import Landing from "./components/Landing";

function App() {
  const [allowScroll, setAllowScroll] = useState(true);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState("down"); // 👈 NEW
  const scrollLockRef = useRef(false);
  const touchStartY = useRef(null);

  const imageSteps = Array.from({ length: 14 }, (_, i) => ({
    type: "image",
    src: require(`./assets/${i + 1}.png`)
  }));

  const steps = React.useMemo(
    () => [
      { type: "component", content: <Landing setAllowScroll={setAllowScroll} /> },
      ...imageSteps
    ],
    []
  );

  const scrollByDirection = (dir) => {
    if (allowScroll || scrollLockRef.current) return;
    scrollLockRef.current = true;
    setDirection(dir); // 👈 SET direction before transition

    if (dir === "down" && step < steps.length - 1) {
      setStep((prev) => prev + 1);
    } else if (dir === "up" && step > 0) {
      setStep((prev) => prev - 1);
    } else {
      scrollLockRef.current = false;
    }

    setTimeout(() => {
      scrollLockRef.current = false;
    }, 800);
  };

  useEffect(() => {
    const handleWheel = (e) => {
      const dir = e.deltaY > 0 ? "down" : "up";
      scrollByDirection(dir);
    };

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (touchStartY.current === null) return;

      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) < 30) return;

      const dir = deltaY > 0 ? "down" : "up";
      scrollByDirection(dir);
      touchStartY.current = null;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [step, steps.length, allowScroll]);

  return (
    <div className="screen">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ 
            y: direction === "down" ? 200 : -200, 
            opacity: 0 
          }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ 
            y: direction === "down" ? -200 : 200, 
            opacity: 0 
          }}
          transition={{ duration: 0.75, ease: "easeInOut" }}
          onAnimationComplete={() => {
            scrollLockRef.current = false;
          }}
          className="content-wrapper"
        >
          {steps[step].type === "image" && (
            <img src={steps[step].src} alt={`step ${step}`} className="photo" />
          )}
          {steps[step].type === "text" && (
            <h1 className="message">{steps[step].message}</h1>
          )}
          {steps[step].type === "component" && (
            <div className="component-wrapper">{steps[step].content}</div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}


export default App;
