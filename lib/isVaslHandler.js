const isVaslHandler = (me, user, myUsername, userUsername) => {
  const check1 = me.vasl.find((username) => username === userUsername);
  const check2 = user.vasl.find((username) => username === myUsername);
  if(check1 && check2) return true
};

export default isVaslHandler;
