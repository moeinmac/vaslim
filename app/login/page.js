import Auth from "@/components/Auth"
import Button from "@/components/UI/Button";

const login = () => {
  return (
    <>
      <div className="absolute top-8 px-8 z-10 w-full flex flex-col gap-y-6">
        <h1 className="font-alibaba text-3xl text-white">
          وارد حــساب <strong className="text-orange font-kalameh text-5xl">وصـــلیم</strong> خود شــوید
        </h1>
        <Auth />
      </div>
      <div className="absolute bottom-10 w-full flex flex-col gap-y-6 px-8">
        <p className="text-lg text-gray font-alibaba">هنوز در وصلیم حساب نداری؟ منتظر چی هستی پس؟</p>
        <Button className={"bg-orange text-black"} path={"/signup"}>ثبت نام سریع</Button>
      </div>
    </>
  );
};

export default login;
