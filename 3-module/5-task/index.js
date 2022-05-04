function getMinMax(str) {
  let obj = {};
  let clearObj = str.split(" ");
  let filtrNum = clearObj.filter((num) => {
    return isFinite(num);
  });
  let objNumber = filtrNum.map((str) => {
    return Number(str);
  });
  let filtrSort = objNumber.sort((a, b) => {
    if (a > b) return 1;
    if (a == b) return 0;
    if (a < b) return -1;
  });
  obj.min = filtrSort.shift();
  obj.max = filtrSort.pop();
  return obj;
}
