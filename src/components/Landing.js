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
          <span className="with-stars-left">
            <span className="material-symbols-outlined star">star</span>
          </span>
        ),
      },
      {
        type: "text",
        message: (
          <span >
            <img className="beer-pic" src={HBD} alt="Happy Birthday"></img>
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

  useEffect(() => {
    const handleWheel = (e) => {
      if (scrollLockRef.current) return;
      scrollLockRef.current = true;

      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;

      if (step === steps.length - 1) {
        console.log("we got here")
        setAllowScroll(false);
      } else {
        setAllowScroll(true);
      }
      if (isScrollingDown && step < steps.length - 1) {
        setStep((prev) => prev + 1);
      } else if (isScrollingUp && step > 0) {
        setStep((prev) => prev - 1);
      } else {
        scrollLockRef.current = false; // Unlock if no step change
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
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
            marginTop: `${i * 40}px`, // staggered vertical positioning
          }}
        >
          {entry.type === "text" && (
            <h1 className="message">{entry.message}</h1>
          )}
           {entry.type === "image" && (
            <img src={steps[step].src} alt={`step ${step}`} className="photo" />
          )}
        </motion.div>
      ))}
    </div>
  );
}
