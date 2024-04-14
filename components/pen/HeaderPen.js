import { timeSince } from "@/lib/timeSince";
import { SlShareAlt } from "react-icons/sl";

const HeaderPen = ({created_at}) => {
  const convertedDate = new Date(created_at)
  return (
    <>
      <p className="font-alibaba text-[0.6rem]">{timeSince(convertedDate)}</p>
      <SlShareAlt />
    </>
  );
};

export default HeaderPen
