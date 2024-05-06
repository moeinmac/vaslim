"use client"

import { getDataBlurUrl } from "@/lib/getDataBlurURL";
import Image from "next/image";
import { useEffect, useState } from "react";

const ViewProfile = ({ src, width, height, className , alt , load }) => {
  const [blurData, setBlurData] = useState(false);
  useEffect(() => {
    getDataBlurUrl(src).then((base64) => {
      setBlurData(base64);
    });
  }, []);

  return blurData ? (
    <Image
      onContextMenu={(e) => e.preventDefault()}
      src={src}
      width={width}
      height={height}
      className={className}
      placeholder="blur"
      blurDataURL={blurData}
      alt={alt}
    />
  ) : (
    load ? <div className="profieLoader mx-auto"></div> : <></>
  );
};

export default ViewProfile;
