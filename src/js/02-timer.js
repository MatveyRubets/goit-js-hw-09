import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  dateInput: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
};

const timeRefs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let selectedDate = null;
let currentDate = null;

let timerId = null;

refs.startBtn.setAttribute('disabled', true);

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
  const value = int;
  if (value.length < 3) {
    return value.padStart(2, 0);
  }
  return value;
}

function startTimer() {
  timerId = setInterval(() => {
    if (selectedDate <= new Date()) {
      clearInterval(timerId);
      refs.startBtn.setAttribute('disabled', true);
      return;
    }

    renderTimer(selectedDate, new Date().getTime());
  }, 1000);
}

function renderTimer(selectedDate, currentDate) {
  // const timeLeft = convertMs(selectedDate.getTime() - currentDate.getTime());
  const { days, hours, minutes, seconds } = convertMs(selectedDate - currentDate);

  timeRefs.days.textContent = addLeadingZero(days);
  timeRefs.hours.textContent = addLeadingZero(hours);
  timeRefs.minutes.textContent = addLeadingZero(minutes);
  timeRefs.seconds.textContent = addLeadingZero(seconds);

  return timeRefs;
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    currentDate = new Date();
    selectedDate = selectedDates[0];
    if (selectedDate.getTime() < currentDate.getTime()) {
      Notify.failure('Please choose a date in the future');
      return;
    }
    refs.startBtn.removeAttribute('disabled', true);

    renderTimer(selectedDate, currentDate);
    clearInterval(timerId);
  },
};

flatpickr(refs.dateInput, options);

refs.startBtn.addEventListener('click', startTimer);
