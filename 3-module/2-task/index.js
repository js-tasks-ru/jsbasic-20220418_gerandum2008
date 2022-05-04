function filterRange(arr, a, b) {
  let newS = arr.filter(function (num) {
    for (let i = 0; i < arr.length; i++) {
      return num >= a && num <= b;
    }
  });
  return newS;
}
