function sumSalary(salaries) {
  let summ = 0;
  for(let key in salaries){
	  if(Number(salaries[key])&&isFinite(salaries[key])){
		  summ+=salaries[key]
	  }
  }
  return summ
}
