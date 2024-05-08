import UserMessageList from "@/components/message/UserMessagesList";
import SuggestUser from "@/components/search/SuggestUser";
import { convertUserItems } from "@/lib/getUsersByPrimary";
import { getChatList } from "@/lib/message/getChatList";
import { createClient } from "@/lib/supabase/server";

const message = async ({ searchParams }) => {
  const supabase = createClient();

  const myAuth = await supabase.auth.getUser();
  const data = await getChatList(myAuth.data.user.id);

  const chatListData = await convertUserItems(data.message, "with");

  return (
    <div className="flex flex-col">
      <header>
        <h1 className="font-kalameh px-6 py-4 text-5xl">لیست پــیام های شما</h1>
      </header>
      {chatListData.length === 0 && (
        <>
          <p className="font-alibaba px-6 py-4">
            هنوز با کسی گـــفتگو نداری ، میتونی از افراد زیر شروع کنی :
          </p>
          <SuggestUser myid={myAuth.data.user.id} />
        </>
      )}
      <UserMessageList chatList={chatListData} myid={myAuth.data.user.id} />
      {searchParams.error && (
        <p className="font-alibaba text-red-600 px-6 py-4">
          {searchParams.error === "nomessage" &&
            "گفتگویی که انتخاب کرده اید درحال حاضر وجود ندارد و یا به صورت دو طرفه پاک شده است"}
          {searchParams.error === "privacy" &&
            "گفتگویی که قصد وارد شدن به آن را دارید ، برای شما نیست و اجازه دسترسی به آن را ندارید"}
        </p>
      )}
    </div>
  );
};

export default message;
