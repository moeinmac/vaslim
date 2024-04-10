import Link from "next/link";
import { IoReturnUpBackSharp } from "react-icons/io5";

const BackButton = ({ path, className }) => {
  return (
    <Link href={`${path}`}>
      <IoReturnUpBackSharp className={className} />
    </Link>
  );
};

export default BackButton;
