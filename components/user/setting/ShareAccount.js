import useCopy from "@/lib/useCopy";
import html2canvas from "html2canvas";
import { VerifiedSVG } from "../VerfiedButton";
import { BsInstagram } from "react-icons/bs";
import { LuLink } from "react-icons/lu";
import { SlCloudDownload } from "react-icons/sl";
import { HiShare } from "react-icons/hi2";
import { dataUrltofile } from "@/lib/dataUrltofile";

const ShareAccount = ({ user }) => {
  const { isCopied, copyToClipBoard } = useCopy(`vaslim.vercel.app/${user.username}`);
  const createPhoto = async () => {
    const element = document.getElementById("print"),
      canvas = await html2canvas(element, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
      });
    return canvas.toDataURL("image/jpg");
  };

  const downloadPhotoHandler = async () => {
    const data = await createPhoto();
    const link = document.createElement("a");
    link.href = data;
    link.download = "profile.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareToInstagram = async () => {
    await downloadPhotoHandler();
    const link = document.createElement("a");
    link.href = "instagram://story-camera";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareAppsHandler = async () => {
    const data = await createPhoto();
    const file = dataUrltofile(data, "profile.jpg", "image/jpeg");
    const shareData = {
      title: "Vaslim",
      files: [file],
    };
    if (navigator.canShare && navigator.canShare(shareData)) {
      await navigator.share(shareData);
    }
  };

  return (
    <>
      <div
        id="print"
        className="bg-black pb-6 rounded-b-xl rounded-t-lg flex flex-col items-center relative gap-6"
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
        <img
          className="max-w-[80px]"
          src="https://icvuxqufvnpifmhnduir.supabase.co/storage/v1/object/public/profile/logo.png"
        />
        <div className="font-alibaba text-sm flex-col gap-2 text-gray flex text-center">
          <p>به وصــلیم بپیوندید ، با وصــلیم شما به همه جا وصلین!</p>
          <p>vaslim.vercel.app</p>
        </div>
      </div>
      <div className="flex w-full items-center justify-between stamp px-6 py-3 rounded-xl">
        <button onClick={copyToClipBoard}>
          <LuLink className="text-5xl" />
        </button>

        <button onClick={shareToInstagram}>
          <BsInstagram className="text-5xl" />
        </button>

        <button onClick={shareAppsHandler}>
          <HiShare className="text-5xl" />
        </button>

        <button onClick={downloadPhotoHandler}>
          <SlCloudDownload className="text-5xl" />
        </button>
      </div>

      {isCopied && (
        <p className="font-alibaba text-sm text-center">آدرس این کاربر در کلیپ بورد شما کپی شد</p>
      )}
    </>
  );
};

export default ShareAccount;
