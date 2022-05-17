function initCarousel() {
	let right = document.querySelector(".carousel__arrow_right");
	let left = document.querySelector(".carousel__arrow_left");
	let slide = document.querySelector(".carousel__inner");
	let offsetWidthSlide = slide.offsetWidth;
	left.style.display = 'none';
	slide.style.transform = 'translateX(0px)';
	let count = 0;

	let adress = function () {
		left.style.display = '';
		if (count === 2) { right.style.display = 'none' }
		count++
		slide.style.transform = `translateX(${-offsetWidthSlide * count}px)`
	};

	let leftAdress = function () {
		right.style.display = ''
		if (count === 1) { left.style.display = 'none' }
		count--;
		slide.style.transform = `translateX(${-offsetWidthSlide * count}px)`;
	};

	right.addEventListener("click", adress);
	left.addEventListener("click", leftAdress);
}