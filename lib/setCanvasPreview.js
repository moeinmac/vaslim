const setCanvasPreview = (image, canvas, crop) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("No 2d context");
  }

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  canvas.width = 1024;
  canvas.height = 1024;

  ctx.imageSmoothingQuality = "high";
  ctx.save();

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleX,
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
