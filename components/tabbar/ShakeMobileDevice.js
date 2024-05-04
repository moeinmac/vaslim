"use client";

import { useState } from "react";
import shake from "shake.js";


const ShakeMobileDevice = () => {
  const [isShake , setIsShake] = useState();
  var myShakeEvent = new shake({
    threshold: 15,
  });
  myShakeEvent.start();
  const shakeEventDidOccur = () => setIsShake(true);
  window.addEventListener("shake", shakeEventDidOccur, false);
  return isShake && <div>تکون دادی</div>
};

export default ShakeMobileDevice;
