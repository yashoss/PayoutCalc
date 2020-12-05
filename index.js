const ABS_MIN = 0;
const LOCAL_MIN = 1000000;
const ABS_MAX = 5000000;

let currentValue = -1;
let overridePercent = -1;

const init = () => {
  setValue(LOCAL_MIN);
  setPercent(0);
}

const setPercent = (percent) => {
  const newPercent = Number.parseFloat(percent)/100
  if (newPercent !== overridePercent) {
    document.getElementById('overridePercent').value = newPercent * 100;
    overridePercent = newPercent;
  }
  const outcome = currentValue * overridePercent;
  const difference = currentValue - outcome;

  document.getElementsByClassName('overrideOutcome')[0].innerHTML = outcome;
  document.getElementsByClassName('overrideDifference')[0].innerHTML = difference;
}

const setValue = (num) => {
  if (num === currentValue) return;
  currentValue = Math.min(Math.max(num, ABS_MIN), ABS_MAX);
  document.getElementById('slider').value = currentValue;
  document.getElementById('sliderValInput').value = currentValue;
  calc(currentValue);

  setPercent(overridePercent * 100);
}

const getRatio = (num) => {
  let ratio = 0;
  if (num > LOCAL_MIN) {
		ratio = ((((num - LOCAL_MIN) * .2)/(ABS_MAX - LOCAL_MIN)) + .2);
	} else {
    ratio = (num * .2)/LOCAL_MIN;
  }

  document.getElementsByClassName('percent')[0].innerHTML = `${ratio * 100}%`;
  return ratio;
}

const calc = (num) => {
  let result = getRatio(num) * num;

	document.getElementsByClassName('outcome')[0].innerHTML = `$${result.toFixed(2)}`;
	document.getElementsByClassName('difference')[0].innerHTML = `$${(num - result).toFixed(2)}`;
  return result;
}

window.possiblyShow = (dumbPass) => {
  if (dumbPass === '1234q') {
    Array.prototype.filter.call(document.getElementsByClassName('possiblyHide'), function(el){el.style.display = 'block'});
  } else {
    Array.prototype.filter.call(document.getElementsByClassName('possiblyHide'), function(el){el.style.display = 'none'});
  }
}
