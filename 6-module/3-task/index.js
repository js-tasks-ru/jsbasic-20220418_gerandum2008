import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this.render();
    this.count = 0;
	 this.slidesLength = slides.length-2;
  }
  render() {
    let slide = document.createElement("div");
    slide.classList = "carousel";

    let arrowRight =
      createElement(`<div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>`);
    let arrowLeft = createElement(`
    <div class="carousel__arrow carousel__arrow_left" style="display: none;">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>`);

    let obJCarousel = document.createElement("div");
    obJCarousel.classList = "carousel__inner";


    for (let elem of this.slides) {
      obJCarousel.append(
        createElement(`
	  <div class="carousel__slide" data-id=${elem.id}>
  <img src="/assets/images/carousel/${
    elem.image
  }" class="carousel__img" alt="slide">
  <div class="carousel__caption">
    <span class="carousel__price">€${elem.price.toFixed(2)}</span>
    <div class="carousel__title">${elem.name}</div>
    <button type="button" class="carousel__button">
      <img src="/assets/images/icons/plus-icon.svg" alt="icon">
    </button>
  </div>
</div>
`)
      );
    }

    //свойства из переменных для использования в кнопках
    this.left = arrowLeft;
    this.right = arrowRight;
    this.box = obJCarousel;
	 this.widthCont = obJCarousel;
	 
    //собираем html блок из всего
    slide.append(arrowRight);
    slide.append(arrowLeft);
    slide.append(obJCarousel);

    //активности
    arrowRight.addEventListener("click", this.rightAdress.bind(this));
    arrowLeft.addEventListener("click", this.leftAdress.bind(this));
    slide.addEventListener("click", this.click.bind(this));

    return slide;
  }

  click(event) {
    if (event.target.closest(".carousel__button")) {
      let evt = new CustomEvent("product-add", {
        detail: event.target.closest(".carousel__slide").dataset.id,
        bubbles: true,
      });
      this.elem.dispatchEvent(evt);
		
    }
	
  }

  rightAdress() {
    this.left.style.display = "";
    if (this.count === this.slidesLength) {
      this.right.style.display = "none";
    }
    this.count++;
    this.box.style.transform = `translateX(${
      -this.widthCont.offsetWidth * this.count
    }px)`;
  }

  leftAdress() {
    this.right.style.display = "";
    if (this.count === 1) {
      this.left.style.display = "none";
    }
    this.count--;
    this.box.style.transform = `translateX(${
      -this.widthCont.offsetWidth * this.count
    }px)`;
  }
}
