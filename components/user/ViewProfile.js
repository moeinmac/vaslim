import { getDataBlurUrl } from "@/lib/getDataBlurURL";
import Image from "next/image";
import { useEffect, useState } from "react";

const ViewProfile = ({ src, width, height, className }) => {
  const [blurData, setBlurData] = useState(false);
  useEffect(() => {
    getDataBlurUrl(src).then((base64) => {
      setBlurData(base64);
    });
  }, []);

  return blurData ? (
    <Image
      src={src}
      width={width}
      height={height}
      className={className}
      placeholder="blur"
      blurDataURL={blurData}
      alt="پروفایل کاربر"
    />
  ) : (
    <div className="profieLoader mx-auto"></div>
  );
};

export default ViewProfile;
