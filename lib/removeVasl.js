const removeVasl = (vaslList, username) => {
  const index = vaslList.indexOf(username);
  if (index != -1) {
    vaslList.splice(index, 1);
    return vaslList;
  }
  return new Error("Username not found!")
};

export default removeVasl;
