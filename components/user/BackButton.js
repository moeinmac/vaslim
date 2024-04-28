"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoReturnUpBackSharp } from "react-icons/io5";

const BackButton = ({ className, path }) => {
  const router = useRouter();
  const backHandler = () => router.back();
  if (path) {
    return (
      <Link href={path}>
        <IoReturnUpBackSharp className={className} />
      </Link>
    );
  }
  return (
    <button onClick={backHandler}>
      <IoReturnUpBackSharp className={className} />
    </button>
  );
};

export default BackButton;
