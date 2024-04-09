"use client";

import Link from "next/link";
import { TbBellCheck } from "react-icons/tb";

const BellButton = () => {
  return <Link href="/home/notification/">
    <TbBellCheck className="text-4xl"/>
  </Link>;
};

export default BellButton