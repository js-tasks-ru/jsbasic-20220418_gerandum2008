import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.render();
  }
  render() {
    //блок основной в который все пихаем
    let ribbon = document.createElement("div");
    ribbon.classList.add("ribbon");
    //блок навигации
    let naviget = document.createElement("nav");
    naviget.classList = "ribbon__inner";
    for (let elem of this.categories) {
      naviget.append(
        createElement(`<a href="#" class="ribbon__item"  data-id=${elem.id}>${elem.id}</a>
`)
      );
    }

    //ribbon__item_active" надо прокидывать
    //блок кнопок
    let left = createElement(`
    <button class="ribbon__arrow ribbon__arrow_left ">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>`);

    let right = createElement(`
    <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>`);

    //собираем html блок из всего
    ribbon.append(left);
    ribbon.append(naviget);
    ribbon.append(right);
    //вставляем свойства для обьекта
    this.naviget = naviget;
    this.right = right;
    this.left = left;

    left.addEventListener("click", this.onClickLeft.bind(this));
    right.addEventListener("click", this.onClickRight.bind(this));
    naviget.addEventListener('click',this.onClickNaviget.bind(this));

    return ribbon;
  }


  get data() {
    return {
      scrollWidth: document.querySelector(".ribbon__inner").scrollWidth,
      clientWidth: document.querySelector(".ribbon__inner").clientWidth,
      scrollLeft: document.querySelector(".ribbon__inner").scrollLeft,
      calcScrollRight: function () {
        return this.scrollWidth - this.scrollLeft - this.clientWidth;
      },
    };
  }

  onClickLeft(event) {
    if (event.target.closest(".ribbon__arrow_left")) {
      this.naviget.scrollBy(-350, 0);
      if (this.data.scrollLeft < 1) {
        this.left.classList.remove("ribbon__arrow_visible");
      }
      this.right.classList.add("ribbon__arrow_visible");
    }
  }
  onClickRight(event) {
    if (event.target.closest(".ribbon__arrow_right")) {
      this.naviget.scrollBy(350, 0);

      this.left.classList.add("ribbon__arrow_visible");

      if (this.data.calcScrollRight() < 1) {
        this.right.classList.remove("ribbon__arrow_visible");
      }
    }
  }
  onClickNaviget(event){
    event.preventDefault()
    if(document.querySelector('.ribbon__item_active')){
      document.querySelector('.ribbon__item_active').classList.remove('ribbon__item_active')
    }
    if(event.target.closest(".ribbon__item")){
      event.target.closest(".ribbon__item").classList.add('ribbon__item_active')
     
    }
    let evt = new CustomEvent('ribbon-select', {
      detail:  event.target.closest(".ribbon__item").dataset.id,
      bubbles: true 
    })
    this.elem.dispatchEvent(evt)
  }
}

document.querySelector('body').addEventListener('ribbon-select',(event)=>{
  console.log(event.detail)
})

