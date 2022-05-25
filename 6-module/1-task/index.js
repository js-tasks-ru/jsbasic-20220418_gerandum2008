/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.elem = this.render();
  }

  
  render() {
    let table = document.createElement("TABLE");
    table.innerHTML = `<thead><tr><th>Имя</th><th>Возраст</th><th>Зарплата</th><th>Город</th><th></th></tr></thead>`;
    table.innerHTML += this.rows
      .map((elem) => {
        return `<tr><td>${elem.name}</td><td>${elem.age}</td><td>${elem.salary}</td><td>${elem.city}</td><td><button>X</button></td></tr>`;
      })
      .join("");

    table.addEventListener("click", this.click);

    return table;
  }
  click(event) {
    if (event.target.closest("button")) {
      event.target.closest("tr").remove();
    }
  }
}
