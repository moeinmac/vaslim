import Image from "next/image";
import VerifiedButton from "../user/VerfiedButton";
import { GiStamper } from "react-icons/gi";
import { BsArrow90DegDown } from "react-icons/bs";
import { LiaCommentDotsSolid } from "react-icons/lia";
import Link from "next/link";
import { limitData } from "@/lib/limitData";

const NotificationItem = ({ data }) => {
  return (
    <Link
      href={`/pen/${data.id}`}
      className="flex flex-col gap-3 transition-transform duration-100 active:scale-90 active:bg-[#06171d] focus:bg-[#06171d]"
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            {data.type === "stamp" && (
              <GiStamper className="top-1 left-1 absolute rounded-lg bg-[#fcf7ef] p-2 notif text-orange text-[2.5rem]" />
            )}
            {data.type === "comment" && (
              <LiaCommentDotsSolid className="top-1 left-1 absolute rounded-lg bg-[#d3dcef] p-2 notif text-blue text-[2.5rem]" />
            )}
            <Image
              width={40}
              height={40}
              src={data.user.profile}
              alt={data.user.fullname}
              className="rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-alibaba text-[0.7rem]">{data.user.fullname}</p>
            <VerifiedButton
              isVerified={data.user.isVerified}
              username={data.user.username}
              small
              className="text-[0.65rem]"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <p className="font-alibaba">
            {data.type === "stamp" ? "این قــلم شما را" : "به این قــلم شما"}
          </p>
          <BsArrow90DegDown />
        </div>
      </div>
      <div className="flex items-center gap-1">
        <p className="font-alibaba bg-amber-100 text-black py-1 px-2 rounded-lg">
          {limitData(data.pen, 30)}
        </p>
        <p className="font-alibaba">{data.type === "stamp" ? "مـُــهر کــرد" : "نــظر داد"}</p>
      </div>
    </Link>
  );
};

export default NotificationItem;
