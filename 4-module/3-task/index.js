function highlight(table) {
  for(let i = 1;i<table.rows.length;i++)
  {let mass = table.rows[i]
    if(mass.cells[3].dataset.available === undefined){
      mass.hidden = true}else if(mass.cells[3].dataset.available === 'true'){
        mass.className += ' available'}else{mass.className += ' unavailable'}
    if(mass.cells[2].innerHTML==='m'){mass.className += ' male'}else{mass.className +=' female'}
    if(mass.cells[1].innerHTML<18){ mass.style.textDecoration+='line-through'}
     
  }
  return
}
