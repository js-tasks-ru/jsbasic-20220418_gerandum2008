import createElement from "../../assets/lib/create-element.js";
import ProductCard from "../../6-module/2-task/index.js";

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = this.render();
  }

  render() {
    let prodGrid = createElement(
      `<div class="products-grid"><div class="products-grid__inner"></div></div>`
    );
    this.prodGridInner = prodGrid.querySelector(".products-grid__inner");
    for (let key of this.products) {
      let cart = new ProductCard(key);
      this.cart = cart.elem;
      this.prodGridInner.append(this.cart);
    }
    this.filters = {
      noNuts: false,
      vegeterianOnly: false,
      maxSpiciness: 4,
      category: "",
    };

    return prodGrid;
  }
  updateFilter(filters) {
    this.prodGridInner.innerHTML = "";
    this.filtrArr = this.products;
	 
    if (filters.noNuts !== undefined) this.filters.noNuts = filters.noNuts;

    if (filters.vegeterianOnly !== undefined)
      this.filters.vegeterianOnly = filters.vegeterianOnly;

    if (filters.maxSpiciness !== undefined)
      this.filters.maxSpiciness = filters.maxSpiciness;

    if (filters.category !== undefined)
      this.filters.category = filters.category;
    this.filtr();
  }
  filtr() {
    if (this.filters.noNuts) this.noNuts();
    if (this.filters.vegeterianOnly) this.vegeterianOnly();
    if (this.filters.maxSpiciness != 4) this.maxSpiciness();
    if (this.filters.category != "") this.category();
    this.renderCard();
  }

  noNuts() {
    this.filtrArr = this.filtrArr.filter((key) => {
      return !key.nuts;
    });
  }

  vegeterianOnly() {
    this.filtrArr = this.filtrArr.filter((key) => {
      return key.vegeterian;
    });
  }
  maxSpiciness() {
    this.filtrArr = this.filtrArr.filter((key) => {
      return key.spiciness <= this.filters.maxSpiciness;
    });
  }
  category() {
    this.filtrArr = this.filtrArr.filter((key) => {
      return key.category == this.filters.category;
    });
  }
  renderCard() {
	   for (let key of this.filtrArr) {
       let cart = new ProductCard(key);
       this.cart = cart.elem;
       this.prodGridInner.append(this.cart);
     }
  }
}
