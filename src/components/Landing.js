import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Landing.css";

export default function Landing({ setAllowScroll }) {
  const steps = React.useMemo(
    () => [
      { type: "text", message: "1" },
      { type: "text", message: "2" },
      { type: "text", message: "3" },
      { type: "text", message: "4" },
      { type: "text", message: "5" },
      { type: "text", message: "6" },
      { type: "text", message: "7" },
      { type: "text", message: "HAfdgdgdgdPPY  SAM!!! 🎂🎉" },
      { type: "text", message: "HAdfgfgdfgdPPY BIRTHDAY !!! 🎂🎉" },
      { type: "text", message: "HAdfgdfgdfgdfgdfgPPY  SAM!!! 🎂🎉" },
      { type: "text", message: "HAPdfgdfggPY BIRTHDAY !!! 🎂🎉" },
    ],
    []
  );

  const [step, setStep] = useState(0);
  const scrollLockRef = useRef(false); // 👈 persistent lock

  useEffect(() => {
    const handleWheel = (e) => {
      console.log("step ", step);
      if (scrollLockRef.current) return;

      scrollLockRef.current = true;
      if (step === steps.length - 1) {
        setAllowScroll(false);
      }
      if (e.deltaY > 0 && step < steps.length - 1) {
        setStep((prev) => prev + 1);
      } else if (e.deltaY < 0 && step > 0) {
        setStep((prev) => prev - 1);
      } 

      setTimeout(() => {
        scrollLockRef.current = false;
      }, 800); // adjust for timing
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [steps, steps.length, step, setAllowScroll]);
  return (
    <div className="screen">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -200, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}

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
