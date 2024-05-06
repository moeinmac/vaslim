import useCopy from "@/lib/useCopy";
import html2canvas from "html2canvas";
import { VerifiedSVG } from "../VerfiedButton";

const ShareAccount = ({ user }) => {
  const { isCopied, copyToClipBoard } = useCopy(`vaslim.vercel.app/${user.username}`);
  const downloadProfileHandler = async () => {
    const element = document.getElementById("print"),
      canvas = await html2canvas(element, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
      }),
      data = canvas.toDataURL("image/jpg"),
      link = document.createElement("a");

    link.href = data;
    link.download = "profile.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <>
      <div
        id="print"
        className="bg-black pb-6 rounded-b-xl rounded-t-lg flex flex-col items-center relative mx-2 gap-6"
      >
        <div className="penItem_bg w-full h-36 rounded-t-lg rounded-b-3xl"></div>
        <img
          src={user.profile}
          width={130}
          height={130}
          className="rounded-3xl border-4 border-white absolute top-20"
        />
        <div className="flex flex-col gap-2 items-center mt-16">
          <p className="font-alibaba text-2xl">{user.fullname}</p>
          <div className="flex items-center gap-2">
            <p className={`${user.isVerified ? "mb-6" : ""} text-xl font-alibaba`}>
              {user.username}@
            </p>
            {user.isVerified && <VerifiedSVG />}
          </div>
        </div>
        <img className="max-w-[80px]" src="https://icvuxqufvnpifmhnduir.supabase.co/storage/v1/object/public/profile/logo.png"/>
        <div className="font-alibaba text-sm flex-col gap-2 text-gray flex text-center">
          <p>به وصــلیم بپیوندید ، با وصــلیم شما به همه جا وصلین!</p>
          <p>vaslim.vercel.app</p>
        </div>
      </div>
      <button
        onClick={downloadProfileHandler}
        className="font-kalameh text-3xl border-2 border-white rounded-lg py-1 bg-black"
      >
        دانلود پروفایل
      </button>
      <button
        onClick={copyToClipBoard}
        className="font-kalameh text-3xl border-2 border-white rounded-lg py-1 bg-black"
      >
        کپی کردن آدرس صفحه
      </button>
      {isCopied && <p className="font-alibaba text-sm">آدرس این کاربر در کلیپ بورد شما کپی شد</p>}
    </>
  );
};

export default ShareAccount;
