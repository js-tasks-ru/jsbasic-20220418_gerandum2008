import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  constructor() {
    this.elem = this.render();
  }

  render() {
    let modal = createElement("<div>");
    modal.classList.add("modal");
    this.modal = modal;

    let overlay = createElement(`<div class="modal__overlay"></div>`);

    let constructor = createElement(`
    <div class="modal__inner">
      <div class="modal__header">
      <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>
      </div>

      <div class="modal__body">
      </div>
    </div>`);

    modal.append(overlay);
    modal.append(constructor);

    document.onkeydown = this.closeKey.bind(this);
    modal
      .querySelector(".modal__close")
      .addEventListener("click", this.closeBtn.bind(this));

    return modal;
  }

  open() {
    document.querySelector("body").prepend(this.elem);
    document.querySelector("body").classList.add("is-modal-open");
    
  }
  setTitle(str) {
    let title = createElement(`<h3 class="modal__title">${str}</h3>`);
    this.elem.querySelector(".modal__header").append(title);
  }

  setBody(strModal) {
    this.elem.querySelector(".modal__body").append(strModal);
  }
  closeBtn(event) {
    if (event.target.closest(".modal__close")) {
      document.querySelector("body").classList.remove("is-modal-open");
      this.modal.remove();
      document.onkeydown = null
    }
  }
  closeKey(event) {
    event.preventDefault()
    if (event.code === "Escape") {
      document.querySelector("body").classList.remove("is-modal-open");
      this.modal.remove();
      document.onkeydown = null
    }
  }
  close() {
    document.querySelector("body").classList.remove("is-modal-open");
    this.modal.remove();
    document.onkeydown = null
  }
}
