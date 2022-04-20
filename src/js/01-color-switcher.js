function getRandomHexColor() {
	return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
	bodyRef: document.querySelector("body"),
	startRef: document.querySelector("button[data-start]"),
	stopRef: document.querySelector("button[data-stop]"),
};

refs.startRef.addEventListener("click", handleClickChangeColor);
refs.stopRef.addEventListener("click", handleStopChangeColor);

let colorInterval = null;

function handleClickChangeColor() {
	refs.stopRef.removeAttribute("disabled");
	refs.startRef.setAttribute("disabled", true);
	colorInterval = setInterval(() => {
		refs.bodyRef.style.backgroundColor = getRandomHexColor();
	}, 1000);
}
function handleStopChangeColor() {
	refs.startRef.removeAttribute("disabled");
	refs.stopRef.setAttribute("disabled", true);
	clearInterval(colorInterval);
}
