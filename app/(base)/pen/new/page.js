import NewPenText from "@/components/pen/NewPenText";


const newPen = ({ searchParams }) => {
  return (
    <>
      <header className="px-6 py-4 flex flex-col gap-2">
        <h1 className="font-kalameh text-5xl">دســـت به قـــلم شوید</h1>
        <p className="font-alibaba">لحظات تان را با دوستان تان در میان بگـذارید</p>
      </header>
      <form className="px-6 py-4 flex flex-col gap-3">
        <NewPenText />
      </form>
      {searchParams.error && (
        <p className="font-alibaba text-red-600">
          ارسال نوشته انجام نشد ، لطفا ابتدا اتصال خود به اینترنت را چک کرده و سپس دوباره امتحان
          کنید
        </p>
      )}
    </>
  );
};

export default newPen;
