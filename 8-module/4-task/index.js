import createElement from "../../assets/lib/create-element.js";
import escapeHtml from "../../assets/lib/escape-html.js";

import Modal from "../../7-module/2-task/index.js";

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.addEventListeners();
  }

  addProduct(product) {
    if (product != null) {
      for (let key of this.cartItems) {
        if (key.product.id == product.id) {
          key.count += 1;
          this.onProductUpdate();
          return;
        }
      }
      let arr = {};
      arr.product = product;
      arr.count = 1;
      this.cartItems.push(arr);
      this.onProductUpdate();
    }
  }
  updateProductCount(productId, amount) {
    this.cartItems.forEach((key, index) => {
      if (key.product.id == productId) {
        key.count += amount;
      }
      if (key.count == 0) {
        this.cartItems.splice(index, 1);
      }
    });
    this.onProductUpdate();
  }

  isEmpty() {
    for (let key in this.cartItems) {
      return false;
    }
    return true;
  }

  getTotalCount() {
    let summProduct = 0;
    for (let key of this.cartItems) {
      summProduct += key.count;
    }
    return summProduct;
  }

  getTotalPrice() {
    let summPrice = 0;
    for (let key of this.cartItems) {
      summPrice += key.count * key.product.price;
    }
    return summPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    let modal = new Modal();
    modal.setTitle("Your order");
    for (let key of this.cartItems) {
      modal.setBody(this.renderProduct(key.product, key.count));
    }
    modal.setBody(this.renderOrderForm());
    modal.open();

    document
      .querySelector(".modal__body")
      .addEventListener("click", (event) => {
        if (event.target.closest(".cart-counter__button_minus")) {
          for (let key of this.cartItems) {
            if (
              event.target.closest(".cart-product").dataset.productId ==
              key.product.id
            ) {
              this.updateProductCount(key.product.id, -1);
            }
            if (key.count == 0) {
              event.target.closest(".cart-product").remove();
            }
          }
          this.onProductUpdate();
        }
        if (event.target.closest(".cart-counter__button_plus")) {
          for (let key of this.cartItems) {
            if (
              event.target.closest(".cart-product").dataset.productId ==
              key.product.id
            ) {
              this.updateProductCount(key.product.id, 1);
            }
          }
          this.onProductUpdate();
        }
        if (this.isEmpty()) {
          modal.close();
        }
      });
    document
      .querySelector(".cart-form")
      .addEventListener("submit", this.onSubmit.bind(this));
  }

  onProductUpdate(cartItem) {
    if (document.querySelector(".is-modal-open")) {
      let modalBody = document.querySelector(".modal__body");

      for (let key of this.cartItems) {
        let productId = key.product.id;

        let productCount = modalBody.querySelector(
          `[data-product-id="${productId}"] .cart-counter__count`
        );

        let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);
        let productPrice = modalBody.querySelector(
          `[data-product-id="${productId}"] .cart-product__price`
        );

        productCount.innerHTML = key.count;

        productPrice.innerHTML = `€${(key.count * key.product.price).toFixed(
          2
        )}`;

        infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
      }
    }
    this.cartIcon.update(this);
  }

  onSubmit(event) {
    event.preventDefault();
      document.querySelector(".button").classList.add("is-loading");
      fetch("https://httpbin.org/post", {
        method: "POST",
        body: new FormData(document.querySelector(".cart-form")),
      }).then((response) => {
        if (response.ok) {
          document.querySelector(".modal__title").innerHTML = "Success!";
          this.cartItems = [];
          document.querySelector(
            ".modal__body"
          ).innerHTML = `<div class="modal__body-inner">
          <p>
			 Order successful! Your order is being cooked :) <br>
             We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif">
				</p>
				</div>`;
        }
      });
    
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}
