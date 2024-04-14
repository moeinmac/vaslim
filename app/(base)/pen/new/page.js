import SubmitButton from "@/components/Auth/SubmitButton";
import NewText from "@/components/pen/NewText";
import sendNewPen from "@/lib/pen/sendNewPen";

const newPen = ({ searchParams }) => {
  return (
    <>
      <header className="px-6 py-4 flex flex-col gap-2">
        <h1 className="font-kalameh text-5xl">دســـت به قـــلم شوید</h1>
        <p className="font-alibaba">لحظات تان را با دوستان تان در میان بگـذارید</p>
      </header>
      <form className="px-6 py-4 flex flex-col gap-3">
        <NewText />
        <SubmitButton
          formAction={sendNewPen}
          pendingText="آماده سازی چاپار..."
          className="bg-orange text-black text-4xl font-kalameh rounded-xl px-8 py-4 "
        >
          ارسال نوشته
        </SubmitButton>
      </form>
      {searchParams.error && (
        <p className="font-alibaba text-red-600">
        ارسال نوشته انجام نشد ، لطفا ابتدا اتصال خود به اینترنت را چک کرده و سپس دوباره امتحان کنید
        </p>
      )}
    </>
  );
};

export default newPen;
