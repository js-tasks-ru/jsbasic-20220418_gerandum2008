function truncate(str, maxlength) {
	let rot = str.length + 1;
	if (rot !== maxlength) {
		if (rot > maxlength) {
			return (str.slice(0, maxlength - 1) + `…`)
		} else { return str }
	} return str
}
