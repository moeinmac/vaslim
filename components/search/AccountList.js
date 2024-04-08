import Image from "next/image";
import Link from "next/link";

const AccountItem = ({ profile, fullname, username, motasel }) => {
  return (
    <Link href={`/${username}/`}>
      <div className="flex flex-col items-center gap-4 bg-blue p-2 pb-1 rounded-lg">
        <Image width={60} height={60} src={profile} alt={fullname} className="rounded-lg" />
        <div className="flex flex-col items-center">
          <p className="font-alibaba text-base">{username}@</p>
          <p className="font-alibaba text-[0.7rem]">{fullname}</p>
          <p className="flex gap-2">
            <span className="font-kalameh text-2xl">{motasel}</span>
            <span className="pt-1">متصل</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

const AccountList = ({ accounts }) => {
  if (accounts.length === 1 && accounts[0] === "clear") return;
  if (accounts.length === 0) {
    return (
      <p className="p-4 font-alibaba">
        نام کاربری وارد شده هیچ حسابی در وصـــلیم ندارد ، شما میتوانید دوستتان را به وصــــلیم دعوت
        کنید
      </p>
    );
  }
  return (
    <div className="grid grid-cols-3 gap-2 p-2">
      {accounts.map((account) => (
        <AccountItem
          profile={account.profile}
          fullname={account.fullname}
          username={account.username}
          motasel={account.vasl.length}
          key={account.username}
        />
      ))}
    </div>
  );
};

export default AccountList;
