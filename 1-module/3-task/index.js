function ucFirst(str) {
	if (!str || 0 === str.length) { return str } else {
		let big = str[0].toUpperCase()
		return(big + str.slice(1))
	}
}
