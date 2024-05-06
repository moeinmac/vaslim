import Image from "next/image";
import Link from "next/link";
import VerifiedButton from "../user/VerfiedButton";
import { CiCirclePlus } from "react-icons/ci";

const AccountItem = ({ profile, fullname, username, vasl, isVerified }) => {
  return (
    <Link href={`/${username}/`}>
      <div
        className={`${
          username.length <= 10 && !isVerified ? "pt-2 px-4" : "p-2"
        } flex flex-col items-center gap-4 bg-blue  pb-1 rounded-lg`}
      >
        <Image width={60} height={60} src={profile} alt={fullname} className="rounded-lg" />
        <div className="flex flex-col items-center">
          <VerifiedButton isVerified={isVerified} username={username} className={"text-base"} />
          <p className="font-alibaba text-[0.7rem]">{fullname}</p>
          <p className="flex gap-2">
            <span className="font-kalameh text-2xl">{vasl}</span>
            <span className="pt-1 font-alibaba">متصل</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

const AccountList = ({ accounts, suggest, carousel }) => {
  if (accounts.length === 1 && accounts[0] === "clear") return;
  if (accounts.length === 0 && !suggest) {
    return (
      <p className="p-4 font-alibaba">
        نام کاربری وارد شده هیچ حسابی در وصـــلیم ندارد ، شما میتوانید دوستتان را به وصــــلیم دعوت
        کنید
      </p>
    );
  }
  return (
    <div
      className={`${
        carousel ? "flex w-screen overflow-auto gap-2 px-3 noscroll" : "grid grid-cols-3 gap-2"
      }   p-2`}
    >
      {accounts.map((account) => (
        <AccountItem
          profile={account.profile}
          fullname={account.fullname}
          username={account.username}
          vasl={account.vasl.length}
          isVerified={account.isVerified}
          key={account.username}
        />
      ))}
      {carousel && (
        <Link href={"/search"}>
          <div className="flex flex-col items-center gap-4 bg-blue pt-2 px-6 pb-3 rounded-lg">
            <CiCirclePlus className="text-6xl" />
            <p className="text-[0.9rem] text-center font-alibaba">پیدا کردن دوســـتان بیشتر</p>
          </div>
        </Link>
      )}
    </div>
  );
};

export default AccountList;
