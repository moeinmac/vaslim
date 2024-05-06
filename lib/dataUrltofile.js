// from stackoverflow

export function dataUrltofile(dataURI, filename, type) {
  var byteString = atob(dataURI.split(",")[1]);
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new File([ab], `${filename ? filename : "uplodedprofile.png"}`, {
    type: `${type ? type : "image/png"}`,
  });
}
