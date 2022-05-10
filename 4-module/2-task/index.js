function makeDiagonalRed(table) {
  for(let i=0;i<table.rows.length;i++){
    let mass = table.rows[i]
    mass.cells[i].style.backgroundColor = 'red'
    }
    return
}