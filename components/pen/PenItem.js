import Image from "next/image";
import VerifiedButton from "../user/VerfiedButton";
import VaslButton from "@/components/user/VaslButton";
import HeaderPen from "./HeaderPen";

import BackButton from "../user/BackButton";

const PenItem = ({ data}) => {
  return (
    <div className="mx-3 mt-3 stamp rounded-t-xl flex flex-col mb-0">
      <header className="rounded-xl p-2 flex justify-between px-6 py-4">
        <div className={`flex items-center gap-4`}>
          <Image
            width={60}
            height={60}
            src={data.user.profile}
            alt={data.user.fullname}
            className="rounded-lg"
          />
          <div className={`flex flex-col gap-1`}>
            <p className={`font-alibaba text-sm`}>{data.user.fullname}</p>
            <VerifiedButton
              isVerified={data.user.isVerified}
              username={data.user.username}
              small
              className={"text-[0.8rem]"}
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <VaslButton vasl={data.user.vasl.length} username={data.user.username} />
          <BackButton className={"text-4xl"} />
        </div>
      </header>
      <article className="whitespace-pre-wrap px-6 font-alibaba">{data.pen}</article>
      <footer className=" flex flex-col pt-2">
        <div className="flex items-center justify-between p-4">
          <HeaderPen created_at={data.created_at} />
        </div>
      </footer>
    </div>
  );
};

export default PenItem;
