import SubmitButton from "@/components/Auth/SubmitButton";
import { logoutHandler } from "@/lib/logoutHandler";

const Signout = () => {
  return (
    <div className={"flex flex-col gap-4 font-alibaba"}>
      <h3 className="text-xl">خروج از حساب</h3>
      <p className="font-alibaba text-lg">
        آیا شما قصد دارید که از احساب کاربری وصلیم خود خارج شوید؟
      </p>
      <p className="text-alibaba text-base">
        توجه کنید که امکان بازیابی رمزعبور شما فعلا میسر نیست به همین خاطر پیشنهاد میشود که این کـار
        را انجام ندهدید مگــر آنکـه رمز عبور خود را می دانید.
      </p>
      <form className="flex flex-col gap-4 w-full mb-4">
        <SubmitButton
          className={"text-4xl text-black bg-red-600 w-full rounded-lg py-3 font-kalameh"}
          pendingText={"در حال خروج..."}
          formAction={logoutHandler}
        >
          خروج از حساب کاربری
        </SubmitButton>
      </form>
    </div>
  );
};

export default Signout;
