"use client";

import { useRouter } from "next/navigation";
import { IoReturnUpBackSharp } from "react-icons/io5";

const BackButton = ({className }) => {
  const router = useRouter();
  const backHandler = () => router.back()
  return (
    <button onClick={backHandler}>
      <IoReturnUpBackSharp className={className} />
    </button>
  );
};

export default BackButton;
