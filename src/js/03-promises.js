import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  formEl: document.querySelector('form'),
};

refs.formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(e){
  e.preventDefault();
  const { delay, step, amount } = e.currentTarget.elements;
  let delayStep = Number(delay.value);
  for (let i = 1; i <= amount.value; i++) {
    createPromise(i, delayStep).then(onSuccess).catch(onError);
    console.log(delayStep);
    delayStep += Number(step.value);
  }
  e.currentTarget.reset();
}

function createPromise(position, delay) {

  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
    
  });
  return promise;
}

function onError({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}

function onSuccess({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}