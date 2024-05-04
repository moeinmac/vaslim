"use client";

import { useState } from "react";
import Shake from "shake.js";

import Modal from "../Modal/Modal";
import ReportProblem from "./ReportProblem";

const ShakeMobileDevice = ({id}) => {
  const [isShake, setIsShake] = useState(false);
  const closeShakeHandler = () => setIsShake(false);
  const [isReport, setIsReport] = useState(false);
  const reportChangeHandler = () => {
    setIsShake(false);
    setIsReport(!isReport);
  };
  const shakeEventDidOccur = () => setIsShake(true);
  var myShakeEvent = new Shake({
    threshold: 5,
  });
  myShakeEvent.start();
  window.addEventListener("shake", shakeEventDidOccur, false);
  return (
    <>
      <ReportProblem isReport={isReport} id={id} closeReport={reportChangeHandler} />
      {isShake && (
        <Modal
          className={"w-[90%] left-[5%] rounded-xl bg-blue flex flex-col items-center bottom-[2vh] gap-4"}
          onClose={closeShakeHandler}
        >
          <h2 className="mb-2 font-kalameh text-4xl text-border-2 text-[#5D85DD]">
            آیــا مشکـــلی وجود دارد؟
          </h2>
          <p className="font-alibaba">
            شما با تکان دادن موبایل خود میتوانید مشکــل یا ایــرادی که در وصلیم وجود دارد را به بخش
            توسعه وصلیم اطلاع دهید ، آیا قصد این کـار را دارید؟
          </p>
          <div className="flex items-center gap-4 w-full">
            <button
              onClick={reportChangeHandler}
              className="border-2 border-[#5D85DD]  w-full rounded-lg py-1 text-4xl font-kalameh"
            >
              بــله
            </button>
            <button
              onClick={closeShakeHandler}
              className="border-2 border-[#5D85DD] w-full rounded-lg py-1 text-4xl font-kalameh"
            >
              خـــیر
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ShakeMobileDevice;
