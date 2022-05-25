import createElement from "../../assets/lib/create-element.js";

export default class ProductCard {
  constructor(product) {
    this.prod = product;
    this.elem = this.render();
  }

  render() {
    let cart = createElement(`
	<div class="card">
	<div class="card__top">
	<img src="/assets/images/products/${this.prod.image}" class="card__image" alt="product">
	<span class="card__price">€${this.prod.price.toFixed(2)}</span>
	</div>
	<div class="card__body">
	<div class="card__title">${this.prod.name}</div>
	<button type="button" class="card__button">
	<img src="/assets/images/icons/plus-icon.svg" alt="icon"></button>
	</div>
	</div>
	`);

   cart.addEventListener("click", this.click.bind(this));
    return cart;
  }

  click(event) {
	  if (event.target.closest(".card__button")) {
      let evt = new CustomEvent("product-add", {
        detail: this.prod.id,
        bubbles: true,
      });
      this.elem.dispatchEvent(evt);
    }
  }
   
}
