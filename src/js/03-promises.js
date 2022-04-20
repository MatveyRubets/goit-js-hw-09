import { Notify } from "notiflix/build/notiflix-notify-aio";
const formRef = document.querySelector(".form");

function createPromise(position, delay) {
	const shouldResolve = Math.random() > 0.3;
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (shouldResolve) {
				resolve({ position, delay });
			} else {
				reject({ position, delay });
			}
		});
	});
}

function submit(e) {
	e.preventDefault();

	let delay = Number(formRef.elements.delay.value);
	let step = Number(formRef.elements.step.value);
	let amount = Number(formRef.elements.amount.value);

	for (let position = 1; position <= amount; position++) {
		createPromise(position, delay)
			.then(({ position, delay }) => {
				setTimeout(() => {
					Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
				}, delay);
			})
			.catch(({ position, delay }) => {
				Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
			});
		delay += step;
	}
}

formRef.addEventListener("submit", submit);
