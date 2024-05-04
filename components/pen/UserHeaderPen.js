"use client";
import { timeSince } from "@/lib/timeSince";
import { useState } from "react";
import { MdOutlineMoreVert } from "react-icons/md";
import { BsTrash3 } from "react-icons/bs";
import { SlPencil } from "react-icons/sl";
import { VscCloseAll } from "react-icons/vsc";
import Modal from "../Modal/Modal";
import { deletePen } from "@/lib/pen/deletePen";
import TextareaAutosize from "react-textarea-autosize";
import SubmitButton from "../Auth/SubmitButton";
import { editPen } from "@/lib/pen/editPen";

const UserHeaderPen = ({ created_at, pen_id, pen }) => {
  const convertedDate = new Date(created_at);

  const [isEditing, setIsEditing] = useState();
  const [showMenu, setShowMenu] = useState();
  const [confirmDelete, setConfirmDelte] = useState();

  const showMenuHandler = () => setShowMenu(!showMenu);

  const isEditingHandler = () => {
    setIsEditing(!isEditing);
    setShowMenu(false);
  };
  const editpenHandler = (formData) => {
    editPen(pen_id, formData);
    setIsEditing(false);
  };

  const confirmDeleteHandler = () => {
    setConfirmDelte(!confirmDelete);
    setShowMenu(false);
  };

  const deletePenHandler = async () => {
    await deletePen(pen_id);
    setConfirmDelte(false);
  };

  return (
    <>
      {isEditing && (
        <Modal
          onClose={isEditingHandler}
          className={"top-[15vh] bg-black flex flex-col items-center"}
        >
          <h1 className={"font-kalameh text-4xl"}>ویــرایش قــلم</h1>
          <form className="flex flex-col gap-4 w-full">
            <TextareaAutosize
              name="pen"
              defaultValue={pen}
              minRows={1}
              dir="auto"
              maxLength={100}
              className="my-3 bg-white text-black rounded-lg px-4 py-2 resize-none outline-0 text-lg overflow-hidden w-full font-alibaba"
            ></TextareaAutosize>
            <SubmitButton
              className={"bg-orange w-full rounded-lg py-2 font-kalameh"}
              pendingText={"در حال ارسال..."}
              formAction={editpenHandler}
            >
              ذخیره تغییرات
            </SubmitButton>
            <button
              onClick={isEditingHandler}
              className="font-kalameh bg-[#5D85DD] w-full rounded-lg py-2"
            >
              نه ولـــش کن
            </button>
          </form>
        </Modal>
      )}
      {confirmDelete && (
        <Modal
          className={"bg-blue flex flex-col items-center top-[30vh] gap-2 font-kalameh text-3xl"}
          onClose={confirmDeleteHandler}
        >
          <h2 className="mb-6">آیا مطمئن هستید که این قلم را پاک کنید؟</h2>
          <button
            onClick={deletePenHandler}
            className="bg-red-600  w-full rounded-lg py-2 text-2xl"
          >
            پاکــــش کن
          </button>
          <button
            onClick={confirmDeleteHandler}
            className="bg-[#5D85DD] w-full rounded-lg py-2 text-2xl"
          >
            نه ولـــش کن
          </button>
        </Modal>
      )}
      <p className="font-alibaba text-[0.6rem]">{timeSince(convertedDate)}</p>
      <div className="flex items-center gap-2">
        <MdOutlineMoreVert onClick={showMenuHandler} className="text-xl" />
        {showMenu && (
          <ul className="flex flex-col gap-1 items-end rounded-tl-xl rounded-sm shadow-lg text-sm px-2 py-2 border-2 border-white bg-blue absolute top-0 left-0 font-alibaba">
            <VscCloseAll onClick={showMenuHandler} className="text-xl mb-3" />
            <li className="flex items-center gap-5" onClick={isEditingHandler}>
              <SlPencil /> ویرایش
            </li>
            <li className="flex items-center gap-8" onClick={confirmDeleteHandler}>
              <BsTrash3 /> حذف
            </li>
          </ul>
        )}
      </div>
    </>
  );
};

export default UserHeaderPen;
