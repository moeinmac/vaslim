"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const Error = ({ error, reset }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <h2 className="font-kalameh text-9xl text-orange">ای وای!</h2>
      <p className="font-alibaba px-6 text-lg">
        متاسفم ولی یه خطایی پیش اومد ، یا شاید اینترنتت قطع شده! در هر حال با زدن دکــمه زیر ، وصلیم
        خود اتصالی میکنه
      </p>
      <div className="flex flex-col gap-4 py-8">
        <button
          onClick={() => reset()}
          className="text-black bg-orange py-3 px-6 font-kalameh text-4xl rounded-lg"
        >
          خود اتصــالی دوباره
        </button>
        <Link
          href={"/home"}
          className="text-black bg-orange py-3 px-6 font-kalameh text-4xl rounded-lg"
        >
          برگـــــشت بــه خـــــانه
        </Link>
      </div>
      <Image
        width={350}
        height={341}
        className="px-6"
        src={"https://icvuxqufvnpifmhnduir.supabase.co/storage/v1/object/public/profile/error.png"}
      />
    </div>
  );
};

export default Error;
