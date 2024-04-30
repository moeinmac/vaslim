import Image from "next/image";
import Link from "next/link";
import VerifiedButton from "../user/VerfiedButton";
import { persianNumbers } from "@/lib/persianNumbers";

const UserItem = ({ data, path, small }) => {
  return (
    <Link
      className="py-2 px-6 flex items-center gap-2 transition-transform duration-100 active:scale-90 active:bg-[#06171d] focus:bg-[#06171d]"
      href={`/${path}`}
    >
      <Image
        src={data.profile}
        alt={data.fullname}
        width={small ? 40 : 55}
        height={small ? 40 : 55}
        className="rounded-lg"
      />
      <div className="flex w-full text-black font-alibaba items-center justify-between">
        <div>
          <p className={`text-white ${small ? "text-sm" : "text-base"}`}>{data.fullname}</p>
          <VerifiedButton
            small={small}
            isVerified={data.isVerified}
            username={data.username}
            className={`${small ? "text-[0.7rem]" : "text-sm"} text-white`}
          />
        </div>
      </div>
      {data.unread >= 1 && (
        <div className="font-alibaba text-orange text-xl">{persianNumbers(data.unread)}+</div>
      )}
    </Link>
  );
};

export default UserItem;
