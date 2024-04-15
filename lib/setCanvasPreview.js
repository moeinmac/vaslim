const setCanvasPreview = (image, canvas, crop) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("No 2d context");
  }

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  canvas.width = 1024;
  canvas.height = 1024;
  
  // canvas.width = Math.floor(crop.width)
  // canvas.height = Math.floor(crop.height)

  ctx.imageSmoothingQuality = "high";
  ctx.save();

  const cropX = crop.x * scaleX
  const cropY = crop.y * scaleX

  ctx.drawImage(
    image,
    cropX,
    cropY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    canvas.width,
    canvas.height,
  );

  ctx.restore();
};
export default setCanvasPreview;
