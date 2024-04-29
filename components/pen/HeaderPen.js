"use client";
import { timeSince } from "@/lib/timeSince";
import { useEffect, useState } from "react";
import { SlShareAlt } from "react-icons/sl";
import { MdOutlineMoreVert } from "react-icons/md";
import { BsTrash3Fill } from "react-icons/bs";
import { MdOutlineEditNote } from "react-icons/md";
import { VscCloseAll } from "react-icons/vsc";
import Modal from "../Modal/Modal";
import { deletePen } from "@/lib/pen/deletePen";

const HeaderPen = ({ created_at, pen_id, ismypen }) => {
  const convertedDate = new Date(created_at);

  const [isCopied, setIsCopied] = useState();

  const [showMenu, setShowMenu] = useState();
  const showMenuHandler = (event) => {
    event.preventDefault();
    setShowMenu(!showMenu);
  };
  const [confirmDelete, setConfirmDelte] = useState();
  const confirmDeleteHandler = (event) => {
    event.preventDefault();
    setConfirmDelte(!confirmDelete);
    setShowMenu(false);
  };
  const deletePenHandler = async (event) => {
    event.preventDefault();
    await deletePen(pen_id);
    setConfirmDelte(false);
  };

  const copyToClipBoard = async (event) => {
    event.preventDefault();
    await navigator.clipboard.writeText(`vaslim.vercel.app/pen/${pen_id}`);
    setIsCopied(true);
  };

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  }, [isCopied]);

  return (
    <>
      {confirmDelete && (
        <Modal
          className={"bg-blue flex flex-col items-center gap-2 font-kalameh text-3xl"}
          onClose={confirmDeleteHandler}
        >
          <h2 className="mb-6">آیا مطمئن هستید که این قلم را پاک کنید؟</h2>
          <button onClick={deletePenHandler} className="bg-red-600  w-full rounded-lg py-2">
            پاکــــش کن
          </button>
          <button onClick={confirmDeleteHandler} className="bg-[#5D85DD] w-full rounded-lg py-2">
            نه ولـــش کن
          </button>
        </Modal>
      )}
      <p className="font-alibaba text-[0.6rem]">{timeSince(convertedDate)}</p>
      <div className="flex items-center gap-2">
        {isCopied && <p className="font-alibaba text-xs">لینک این قلم در کلیپ بورد شما کپی شد</p>}
        {!ismypen && <SlShareAlt onClick={copyToClipBoard} />}
        {ismypen && <MdOutlineMoreVert onClick={showMenuHandler} className="text-xl" />}
        {showMenu && (
          <ul
            className="flex flex-col gap-1 items-end rounded-tl-xl rounded-sm shadow-lg text-sm px-2 py-2 border-2 border-white bg-blue absolute top-0 left-0"
            onClick={(e) => e.preventDefault()}
          >
            <VscCloseAll onClick={showMenuHandler} className="text-xl" />
            <li className="flex items-center gap-4">
              <MdOutlineEditNote className="text-xl  " /> ویرایش
            </li>
            <li className="flex items-center gap-8" onClick={confirmDeleteHandler}>
              <BsTrash3Fill /> حذف
            </li>
          </ul>
        )}
      </div>
    </>
  );
};

export default HeaderPen;
