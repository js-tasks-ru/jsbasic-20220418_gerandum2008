import createElement from "../../assets/lib/create-element.js";
export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.render();
    this.segment = this.steps - 1;
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
    sliderThumb.ondragstart = () => false;
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
    //  сборка
    slider.append(sliderThumb);
    slider.append(sliderProgress);
    slider.append(sliderStep);
    //  активности
    slider.addEventListener("click", this.onClick.bind(this));
    document.addEventListener('pointerdown', this.onPoint.bind(this));

    return slider;
  }
  onClick(event) {
    let dataWindows = event.target.closest(".slider").getBoundingClientRect().x;
    let thumb = this.elem.querySelector(".slider__thumb");
    let progress = this.elem.querySelector(".slider__progress");
    let value = this.elem.querySelector(".slider__value");

    if (event.target.closest(".slider")) {
      let numb = Math.round(
        ((event.clientX - dataWindows) / this.elem.offsetWidth) * this.segment
      );
      if (this.elem.querySelector(".slider__step-active")) {
        this.elem
          .querySelector(".slider__step-active")
          .classList.remove("slider__step-active");
      }
      this.sliderStep.childNodes[numb].classList.add("slider__step-active");

      thumb.style.left = `${(numb / this.segment) * 100}%`;
      progress.style.width = `${(numb / this.segment) * 100}%`;

      this.value = numb;
      value.innerText = numb;

      let evt = new CustomEvent("slider-change", {
        detail: this.value,
        bubbles: true,
      });

      this.elem.dispatchEvent(evt);
    }
    console.log("приветики");
  }
  onPoint(event) {
    document.onpointermove = this.pointMove.bind(this);
    document.onpointerup = this.pointUp.bind(this);
  }
  pointMove(event) {
	  this.elem.classList.add('slider_dragging');
    let dataWindows = this.elem.getBoundingClientRect().x;
    let thumb = this.elem.querySelector(".slider__thumb");
    let progress = this.elem.querySelector(".slider__progress");
    let value = this.elem.querySelector(".slider__value");
    let offset = this.elem.offsetWidth;
    let numb = (event.clientX - dataWindows) / offset;

    if (numb < 0) {
      numb = 0;
    }
    if (numb > 1) {
      numb = 1;
    }
    thumb.style.left = `${numb * 100}%`;
    progress.style.width = `${numb * 100}%`;
    if (this.elem.querySelector(".slider__step-active")) {
      this.elem
        .querySelector(".slider__step-active")
        .classList.remove("slider__step-active");
    }
    this.value = Math.round(numb * this.segment);
    value.innerText = Math.round(numb * this.segment);
    this.sliderStep.childNodes[this.value].classList.add("slider__step-active");

   
  }
  pointUp(event) {
	  this.elem.classList.remove("slider_dragging");
	   let evt = new CustomEvent("slider-change", {
       detail: this.value,
       bubbles: true,
     });

     this.elem.dispatchEvent(evt);
    document.onpointerup = null;
    document.onpointermove = null;
  }
}
