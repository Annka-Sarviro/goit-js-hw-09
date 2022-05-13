
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import { Report } from 'notiflix/build/notiflix-report-aio';

const startBtn = document.querySelector('[data-start]')
const daysEL = document.querySelector('[data-days]');
const hoursEL = document.querySelector('[data-hours]');
const minutesEL = document.querySelector('[data-minutes]');
const secondsEL = document.querySelector('[data-seconds]');

let timeSet = {};
let selectedDate;
let intervalId = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      selectedDate = selectedDates[0];           
      if (selectedDate > options.defaultDate){
        startBtn.disabled = false;
      } else {Report.warning('ALERT', 'Please choose a date in the future', 'Try again');
       }

      getTimerInterval();
  },
  };

flatpickr("#datetime-picker", options);


function getTimerInterval() {
  let interval = selectedDate - Date.now();
  timeSet = convertMs(interval);
  if (interval > 0) {updateTimerValue(timeSet);}
  if (interval < 1000) clearInterval(intervalId);
}


startBtn.addEventListener('click', () => {

 intervalId = setInterval(getTimerInterval, 1000)
});

function updateTimerValue ({days, hours, minutes, seconds}) {
  daysEL.textContent = addLeadingZero(days);
  hoursEL.textContent = addLeadingZero(hours);
  minutesEL.textContent = addLeadingZero(minutes);
  secondsEL.textContent = addLeadingZero(seconds);
    
}

function addLeadingZero(data) {
  return String(data).padStart(2, "0")
}

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
  
//   console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
//   console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
//   console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}