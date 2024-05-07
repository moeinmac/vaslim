"use client";

import { useState, useRef } from "react";
import { MdOutlineClose } from "react-icons/md";
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop } from "react-image-crop";
import setCanvasPreview from "@/lib/setCanvasPreview";
import "react-image-crop/dist/ReactCrop.css";
import { dataUrltofile } from "@/lib/dataUrltofile";
import { sendProfileHandler } from "@/lib/sendProfileHandler";
import Compressor from "compressorjs";

const ImageCropper = ({ onChangeProfile, isChangeProfile, onSetProfile, id }) => {
  const [imgSrc, setImgSrc] = useState("");
  const [error, setError] = useState("");
  const [crop, setCrop] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const closeChangeProfile = () => onChangeProfile(false); // clear input {#fix_later}

  const selectImageHandler = (e) => {
    const file = e.target.files[e.target.files.length - 1];
    if (!file) {
      onChangeProfile(false);
      return;
    }
    onChangeProfile(true);
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      imageElement.addEventListener("load", (e) => {
        if (error) setError("");
        const { naturalWidth, naturalHeight } = e.currentTarget;
        if (naturalWidth < 150 || naturalHeight < 150) {
          setError("تصویر انتخابی حداقل باید 150 در 150 باشد");
          return setImgSrc("");
        }
      });
      setImgSrc(imageUrl);
    });
    reader.readAsDataURL(file);
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (150 / width) * 100;
    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      1,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  const saveProfileHandler = async () => {
    setLoading(true);
    setCanvasPreview(
      imgRef.current,
      previewCanvasRef.current,
      convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height)
    );
    const dataUrl = previewCanvasRef.current.toDataURL();

    new Compressor(dataUrltofile(dataUrl), {
      quality: 0.9,
      convertSize: 500000,
      success(result) {
        const res = sendProfileHandler(result, id);
        res.then((url) => {
          onSetProfile(url);
          onChangeProfile(false);
          setLoading(false);
        });
      },
    });
  };

  return (
    <>
      <input
        className="hidden"
        onChange={selectImageHandler}
        type="file"
        id="change"
        accept="image/*"
      />
      {isChangeProfile && (
        <div className={`${loading ? "bg-transparent" : "stamp p-3"} w-full rounded-lg m-3 flex items-center flex-col`}>
          <header className="w-full">
            <button className="hover:bg-[#f1dfc2] p-1 rounded-xl" onClick={closeChangeProfile}>
              <MdOutlineClose className="text-xl text-orange" />
            </button>
          </header>
          {!loading && (
            <ReactCrop
              crop={crop}
              onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
              circularCrop
              keepSelection
              aspect={1}
              minWidth={150}
            >
              <img
                ref={imgRef}
                src={imgSrc}
                alt="Upload"
                style={{ maxHeight: "70vh" }}
                onLoad={onImageLoad}
              />
            </ReactCrop>
          )}
          {error && <p className="text-red-600 text-xs">{error}</p>}
          {crop && !loading && (
            <canvas
              ref={previewCanvasRef}
              style={{
                display: "none",
                objectFit: "contain",
                width: 150,
                height: 150,
              }}
            />
          )}
          {isChangeProfile && !loading && (
            <button
              onClick={saveProfileHandler}
              className="mt-3 bg-orange w-full font-kalameh text-4xl px-3 py-2 rounded-xl text-black"
            >
              ذخــیره پــروفایل
            </button>
          )}
          {loading && isChangeProfile && <div className="profieLoader"></div>}
        </div>
      )}
    </>
  );
};
export default ImageCropper;
