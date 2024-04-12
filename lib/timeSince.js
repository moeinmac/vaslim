
export function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " مال قبل";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " روز قبل";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " ساعت قبل";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " دقیقه قبل";
  }
  return Math.floor(seconds) + " ثانیه قبل";
}
