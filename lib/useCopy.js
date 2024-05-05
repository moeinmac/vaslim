import { useEffect, useState } from "react";

const useCopy = (urlcopy) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipBoard = async (event) => {
    event.preventDefault();
    await navigator.clipboard.writeText(urlcopy);
    setIsCopied(true);
  };

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  }, [isCopied]);

  return { copyToClipBoard, isCopied };
};

export default useCopy;
