const pickRandom = (array, number) => {
  const output = [];
  for (let i = 0; i < number; i++) {
    const item = array[Math.floor(Math.random() * array.length)];
    const index = array.indexOf(item);
    array.splice(index, 1);
    output.push(item);
  }
  return output
};

const getAvailableSuggests = (allusers, myVasl, myUsername) => {
  const updatedMyVasl = [...myVasl, myUsername];
  const output = allusers.filter((item) => !updatedMyVasl.includes(item.username));
  if (output.length > 6) return pickRandom(output,6)
  return output;
};

export default getAvailableSuggests;
