function toggleText() {
	let btn = document.querySelector('.toggle-text-button');
	let text = document.querySelector('#text');
	btn.addEventListener('click', function () {
		if (text.hidden) {
			text.hidden = false;
			return;
		}
		text.hidden = true;
	})
}
