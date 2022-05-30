import createElement from "../../assets/lib/create-element.js";
export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.render();
  }

  render() {
    let slider = document.createElement("div");
    slider.classList.add("slider");
    this.slider = slider;
    //  <!--Ползунок слайдера с активным значением-->
    let sliderThumb =
      createElement(`<div class="slider__thumb" style="left: ${this.value};">
      <span class="slider__value">${this.value}</span>
    </div>`);

    //  <!--Заполненная часть слайдера-->
    let sliderProgress = createElement(
      `<div class="slider__progress" style="width: ${this.value};"></div>`
    );
    //  <!--Шаги слайдера-->
    let sliderStep = document.createElement("div");
    sliderStep.classList.add("slider__steps");
    for (let i = 0; i < this.steps; i++) {
      sliderStep.append(document.createElement("span"));
    }
    this.sliderStep = sliderStep;
    sliderStep.childNodes[this.value].classList.add("slider__step-active");
    slider.append(sliderThumb);
    slider.append(sliderProgress);
    slider.append(sliderStep);
    slider.addEventListener("click", this.onClick.bind(this));
    return slider;
  }
  onClick(event) {
    let dataWindows = event.target.closest(".slider").getBoundingClientRect().x;
    let thumb = this.elem.querySelector(".slider__thumb");
    let progress = this.elem.querySelector(".slider__progress");
    let value = this.elem.querySelector(".slider__value");
    let segment = this.steps - 1;
    if (event.target.closest(".slider")) {
      let numb = Math.round(
        ((event.clientX - dataWindows) / this.elem.offsetWidth) * segment
      );
      if (this.elem.querySelector(".slider__step-active")) {
        this.elem
          .querySelector(".slider__step-active")
          .classList.remove("slider__step-active");
      }
      this.sliderStep.childNodes[numb].classList.add("slider__step-active");

      thumb.style.left = `${(numb / segment) * 100}%`;
      progress.style.width = `${(numb / segment) * 100}%`;

      this.value = numb;
      value.innerText = numb;

      let evt = new CustomEvent("slider-change", {
        detail: this.value,
        bubbles: true,
      });

      this.elem.dispatchEvent(evt);
    }
  }
}
