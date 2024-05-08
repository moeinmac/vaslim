"use client";

import UserItem from "@/components/user/UserItem";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { deleteChatItem } from "@/lib/message/deleteChatItem";
import { HiOutlineTrash } from "react-icons/hi2";
import { createClient } from "@/lib/supabase/client";

const updateUnReadChats = (newChatList, prevChatList) => {
  return prevChatList.map((chat, index) => {
    return {
      ...chat,
      unread: newChatList[index].unread,
    };
  });
};

const UserMessageList = ({ initChatList, myid }) => {
  const supabase = createClient();

  const [chatList, setChatList] = useState(initChatList);

  const soretedMessages = chatList.sort((a, b) => b.unread - a.unread);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const confirmDeleteHandler = (id) => {
    confirmDelete ? setConfirmDelete(false) : setConfirmDelete(id);
  };
  const deleteChatHandler = () => {
    deleteChatItem(confirmDelete);
    setConfirmDelete(false);
  };

  const handleChanges = (paylod) => {
    if (paylod.new.id === myid) {
      setChatList(updateUnReadChats(paylod.new.message, chatList));
    }
  };

  supabase
    .channel("updateUser")
    .on("postgres_changes", { event: "UPDATE", schema: "public", table: "user" }, handleChanges)
    .subscribe();

  return (
    <div>
      {confirmDelete && (
        <Modal
          className={
            "w-[90%] left-[5%] rounded-xl bg-blue flex flex-col items-center top-[30vh] gap-2 font-kalameh text-3xl"
          }
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
      {soretedMessages.map((item) => (
        <div
          className="active:bg-[#06171d] focus:bg-[#06171d] active:scale-90 flex items-center justify-between"
          key={item.id}
        >
          <UserItem data={item} path={`message/${item.id}`} />
          <button
            className="pl-6"
            onClick={() => {
              confirmDeleteHandler(item.id);
            }}
          >
            <HiOutlineTrash className="text-xl" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default UserMessageList;
