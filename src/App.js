import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import "./App.css";

import Wordle from "./components/Wordle";
import One from "./assets/1.png";
import Two from "./assets/2.png";
import Three from "./assets/3.png";
import Four from "./assets/4.png";
import Five from "./assets/5.png";
import Six from "./assets/6.png";
import Seven from "./assets/7.png";
import Landing from "./components/Landing";


function App() {
  const [allowScroll, setAllowScroll] = useState(true);

  const steps = React.useMemo(
    () => [
      { type: "component", content: <Landing setAllowScroll={setAllowScroll} />    },
      { type: "image", src: One },
      { type: "component", content: <Wordle /> },
      { type: "image", src: Two },
      { type: "image", src: Three },
      { type: "image", src: Four },
      { type: "image", src: Five },
      { type: "image", src: Six },
      { type: "image", src: Seven },

    ],
    []
  );

  const [step, setStep] = useState(0);
  const scrollLockRef = useRef(false); // 👈 persistent lock
 
  useEffect(() => {
    const handleWheel = (e) => {
      if (allowScroll || scrollLockRef.current) return;
    
      scrollLockRef.current = true;
    
      if (e.deltaY > 0 && step < steps.length - 1) {
        setStep((prev) => prev + 1);
      } else if (e.deltaY < 0 && step > 0) {
        setStep((prev) => prev - 1);
      }
    
      setTimeout(() => {
        scrollLockRef.current = false;
      }, 800);
    };
    

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [steps, step, allowScroll]);
  return (
    <div className="screen">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -200, opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
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
