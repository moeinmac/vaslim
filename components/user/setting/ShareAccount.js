import useCopy from "@/lib/useCopy";
import html2canvas from "html2canvas";

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
        className="bg-black border-white rounded-lg border-2 px-6 py-4 flex flex-col items-center gap-4"
      >
        <img src={user.profile} width={180} height={180} className="rounded-xl " />
        <p className="font-alibaba text-3xl">{user.fullname}</p>
        <div className="flex items-center gap-2">
          <p className={`${user.isVerified ? "mb-6" : ""} text-xl font-alibaba`}>
            {user.username}@
          </p>
          {user.isVerified && (
            <svg
              aria-label="Verified"
              fill="rgb(0, 149, 246)"
              width={`18`}
              height={`18`}
              role="img"
              viewBox="0 0 40 40"
            >
              <title>Verified</title>
              <path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z"></path>
            </svg>
          )}
        </div>
        <div className="font-alibaba text-sm flex-col gap-2 text-gray flex text-center mt-4">
          <p>به وصــلیم بپیوندید ، با وصــلیم شما به همه جا وصلین!</p>
          <p>vaslim.vercel.app</p>
        </div>
      </div>
      <button onClick={downloadProfileHandler} className="font-kalameh text-3xl border-2 border-white rounded-lg py-1 bg-[#5D85DD]">دانلود پروفایل</button>
      <button onClick={copyToClipBoard} className="font-kalameh text-3xl border-2 border-white rounded-lg py-1 bg-[#5D85DD]">کپی کردن آدرس صفحه</button>
      {isCopied && <p className="font-alibaba text-sm">آدرس این کاربر در کلیپ بورد شما کپی شد</p>}
    </>
  );
};

export default ShareAccount;
