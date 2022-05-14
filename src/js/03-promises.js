import { Notify } from 'notiflix/build/notiflix-notify-aio';



const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onGetFormValue) 

function onGetFormValue(event) {
  event.preventDefault();
  
  let delay = Number(formEl.delay.value);
  let step = Number(formEl.step.value);
  let amount = Number(formEl.amount.value);

  if (delay < 0) {return}

  for (let i = 0; i < amount; i++) {
    let position = i + 1;

  createPromise(position, delay).
  then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.warning(`❌ Rejected promise ${position} in ${delay}ms`);
  });

    delay += step;   
  }  
  
}

function createPromise(position, delay) {
   return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
  setTimeout(() => {
    if (shouldResolve) {
      resolve({position, delay});
      
    } else {
      reject({position, delay})
      
    }
  }, delay);  
})};
