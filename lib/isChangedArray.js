const isChangedArray = (array1, array2) => {
  return array1.every((item) => array2.includes(item) && array2.length === array1.length);
};

export default isChangedArray;
