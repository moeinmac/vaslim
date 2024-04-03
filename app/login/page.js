import Auth from "@/components/Auth"
import Button from "@/components/UI/Button";

const login = () => {
  return (
    <>
      <div className="w-screen h-screen relative overflow-hidden">
        <div className="login"></div>
      </div>
      <div className="absolute top-16 px-8 z-10 w-full flex flex-col gap-y-6">
        <h1 className="font-alibaba text-black text-4xl">
          وارد حــساب <strong className="font-kalameh text-6xl">وصـــلیم</strong> خود شــوید
        </h1>
        <Auth />
      </div>
      <div className="absolute bottom-10 w-full flex flex-col gap-y-6 px-8">
        <p className="text-2xl text-gray">هنوز در وصلیم حساب نداری؟ منتظر چی هستی پس؟</p>
        <Button className={"bg-orange text-black"} path={"/signup"}>ثبت نام سریع</Button>
      </div>
    </>
  );
};

export default login;
