import Input from "@/UI/Input";

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
        <label htmlFor="username">
          {/* <Input id={}/> */}
        </label>
      </div>
    </>
  );
};

export default login;
