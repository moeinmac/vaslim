"use client";

import { TbMessage2Off } from "react-icons/tb";
import UserItem from "@/components/user/UserItem";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { deleteChatItem } from "@/lib/message/deleteChatItem";

const UserMessageList = ({ messageList }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const confirmDeleteHandler = (id) => {
    confirmDelete ? setConfirmDelete(false) : setConfirmDelete(id);
  };
  const deleteChatHandler = () => {
    deleteChatItem(confirmDelete);
    setConfirmDelete(false);
  };
  return (
    <div>
      {confirmDelete && (
        <Modal
          className={"bg-blue flex flex-col items-center top-[30vh] gap-2 font-kalameh text-3xl"}
          onClose={confirmDeleteHandler}
        >
          <h2 className="mb-6">آیا مطمئن هستید که میخواهید این گفتگو را دو طرفه پاک کنید؟</h2>
          <button onClick={deleteChatHandler} className="bg-red-600  w-full rounded-lg py-2">
            پاکــــش کن
          </button>
          <button onClick={confirmDeleteHandler} className="bg-[#5D85DD] w-full rounded-lg py-2">
            نه ولـــش کن
          </button>
        </Modal>
      )}
      {messageList.map((item) => (
        <div
          className="active:bg-[#06171d] focus:bg-[#06171d] active:scale-90 flex items-center justify-between relative"
          key={item.id}
        >
          <UserItem data={item} path={`message/${item.id}`} />
          <button
            className="absolute left-0 pl-6"
            onClick={() => {
              confirmDeleteHandler(item.id);
            }}
          >
            <TbMessage2Off className="text-3xl" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default UserMessageList;
