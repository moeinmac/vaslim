import Button from "@/components/UI/Button";

const welcome = () => {
  return (
    <>
      <div className="w-screen h-screen relative  overflow-hidden">
        <div className="hero"></div>
      </div>
      <div className="absolute bottom-10 z-10 w-full flex flex-col gap-y-6">
        <h1 className="text-white font-kalameh text-6xl text-center px-4">
          دوســـتان خــود را در وصـــــــلیم پیدا کــنید
        </h1>
        <p className="text-right px-10 text-lg text-gray">با وصلیم شما به همه جا وصلین.</p>
        <Button className={"mx-8 bg-blue"} path="/login">ورود / ثبت نام</Button>
      </div>
    </>
  );
};

export default welcome;
