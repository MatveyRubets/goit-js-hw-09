import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
	searchRef: document.querySelector("button[data-start]"),
	daysRef: document.querySelector("span[data-days]"),
	hoursRef: document.querySelector("span[data-hours]"),
	minutesRef: document.querySelector("span[data-minutes]"),
	secondsRef: document.querySelector("span[data-seconds]"),
};

refs.searchRef.setAttribute("disabled", true);

let selectedDate = null;
let currentDate = null;
let timerId = null;

function convertMs(ms) {
	const second = 1000;
	const minute = second * 60;
	const hour = minute * 60;
	const day = hour * 24;

	const days = Math.floor(ms / day);
	const hours = Math.floor((ms % day) / hour);
	const minutes = Math.floor(((ms % day) % hour) / minute);
	const seconds = Math.floor((((ms % day) % hour) % minute) / second);
	return { days, hours, minutes, seconds };
}

function addLeadingZero(int) {
	const value = int.toString();
	if (value.length < 3) {
		return value.padStart(2, 0);
	}
	return value;
}

function renderTimer(selectedDate, currentDate) {
	const { days, hours, minutes, seconds } = convertMs(
		selectedDate - currentDate
	);
	refs.daysRef.textContent = addLeadingZero(days);
	refs.hoursRef.textContent = addLeadingZero(hours);
	refs.minutesRef.textContent = addLeadingZero(minutes);
	refs.secondsRef.textContent = addLeadingZero(seconds);
	return refs;
}

function onStartClick() {
	timerId = setInterval(() => {
		if (selectedDate <= new Date()) {
			clearInterval(timerId);
			butStartRef.setAttribute("disabled", true);
			return;
		}

		renderTimer(selectedDate, new Date().getTime());
	}, 1000);
}

const options = {
	enableTime: true,
	time_24hr: true,
	defaultDate: new Date(),
	minuteIncrement: 1,
	onClose(selectedDates) {
		selectedDate = selectedDates[0];
		currentDate = new Date();

		if (selectedDate.getTime() < currentDate.getTime()) {
			refs.searchRef.setAttribute("disabled", true);
			alert("Please choose a date in the future");
			return;
		}

		refs.searchRef.removeAttribute("disabled");
		renderTimer(selectedDate, currentDate);
		clearInterval(timerId);
	},
};

flatpickr("#datetime-picker", options);

refs.searchRef.addEventListener("click", onStartClick);
