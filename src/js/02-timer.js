// Описан в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  btnStart: document.querySelector('button[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]')
};

let timerId = null;
refs.btnStart.disabled = true;
refs.btnStart.addEventListener('click', onBtnStart);

function onBtnStart(){
  refs.btnStart.disabled = true;
  timerId = setInterval(() => {
    onChangeTime()
  }, 1000);
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();
    if (selectedDates[0] > currentDate) {
      refs.btnStart.disabled = false;
    } else {
      refs.btnStart.disabled = true;
      Notify.failure('Please choose a date in the future');
    }
    console.log(selectedDates[0]);
  },
};

const fp = flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function onChangeTime(){
  const currentTime = Date.now();
  const differenceTime = fp.selectedDates[0] - currentTime;
  if (differenceTime > 0) {
    let timerValue = convertMs(differenceTime);
    refs.daysEl.textContent = addLeadingZero(timerValue.days);
    refs.minutesEl.textContent = addLeadingZero(timerValue.minutes);
    refs.hoursEl.textContent = addLeadingZero(timerValue.hours);
    refs.secondsEl.textContent = addLeadingZero(timerValue.seconds);
  }
}

function addLeadingZero(value){
  //return String(value).padStart(2, 0);
  return value.toString().padStart(2, 0);
}