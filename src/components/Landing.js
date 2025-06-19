import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import HBD from "../assets/hbd.jpg";
import "./Landing.css";

export default function Landing({ setAllowScroll }) {
  const steps = React.useMemo(
    () => [
      {
        type: "text",
        message: (
          <span className="arrow-down">
            <span className="material-symbols-outlined arrow-down keyboard_arrow_down">keyboard_arrow_down</span>
          </span>
        ),
      },
      {
        type: "text",
        message: (
          <span className="with-stars-left">
            <span className="material-symbols-outlined star">star</span>
          </span>
        ),
      },
      {
        type: "text",
        message: (
          <span>
            <img className="beer-pic" src={HBD} alt="Happy Birthday" />
          </span>
        ),
      },
      {
        type: "text",
        message: (
          <span className="with-stars-right">
            <span className="material-symbols-outlined star">star</span>
          </span>
        ),
      },
    ],
    []
  );

  const [step, setStep] = useState(0);
  const scrollLockRef = useRef(false);
  const touchStartY = useRef(null);

  const handleScrollStep = (direction) => {
    if (scrollLockRef.current) return;
    scrollLockRef.current = true;

    if (step === steps.length - 1) {
      setAllowScroll(false);
    } else {
      setAllowScroll(true);
    }

    if (direction === "down" && step < steps.length - 1) {
      setStep((prev) => prev + 1);
    } else if (direction === "up" && step > 0) {
      setStep((prev) => prev - 1);
    } else {
      scrollLockRef.current = false;
    }
  };

  useEffect(() => {
    const handleWheel = (e) => {
      const direction = e.deltaY > 0 ? "down" : "up";
      handleScrollStep(direction);
    };

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (touchStartY.current === null) return;
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) < 30) return;

      const direction = deltaY > 0 ? "down" : "up";
      handleScrollStep(direction);
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
  }, [step, steps.length]);

  return (
    <div className="stacked-steps">
      {steps.slice(0, step + 1).map((entry, i) => (
        <motion.div
          key={i}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onAnimationComplete={() => {
            if (i === step) scrollLockRef.current = false;
          }}
          className="content-wrapper"
          style={{
            marginTop: `${i * 40}px`,
          }}
        >
          {entry.type === "text" && (
            <h1 className="message">{entry.message}</h1>
          )}
          {entry.type === "image" && (
            <img src={entry.src} alt={`step ${i}`} className="photo" />
          )}
        </motion.div>
      ))}
    </div>
  );
}
