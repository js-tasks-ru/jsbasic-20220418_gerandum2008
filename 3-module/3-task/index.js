function camelize(str) {
  let newS = str.split("-");
  let mass = [];
  for (let i = 1; i < newS.length; i++) {
    mass.push(newS[i][0].toUpperCase() + newS[i].slice(1));
  }
  mass.unshift(newS[0]);
  return mass.join("");
}
