//clock
setInterval(showTime, 1000);
function showTime() {
    let clockTime = new Date();
    let cHour = clockTime.getHours();
    let cMin = clockTime.getMinutes();
    let cSec = clockTime.getSeconds();
    am_pm = "AM";
  
    if (cHour > 12) {
        cHour -= 12;
        am_pm = "PM";
    }
    if (cHour == 0) {
        hr = 12;
        am_pm = "AM";
    }
  
    cHour = cHour < 10 ? "0" + cHour : cHour;
    cMin = cMin < 10 ? "0" + cMin : cMin;
    cSec = cSec < 10 ? "0" + cSec : cSec;
  
    let currentTime = `${cHour} : ${cMin} : ${cSec} ${am_pm}`;
  
    document.getElementById("clock-text")
            .innerHTML = currentTime;
}
showTime();

//countdown
const timerHour = document.getElementsByClassName("timer-hour")[0];
const timerMinute = document.getElementsByClassName("timer-minute")[0];
const timerSecond = document.getElementsByClassName("timer-second")[0];
const timerStart = document.getElementById("timer-start");
const timerReset = document.getElementById("timer-reset");
const timerPlay = document.getElementById("timer-play");

const clockInside = document.getElementById("clock-inside");

const timer_hour=document.getElementById("timer-hour");
const timer_minute=document.getElementById("timer-minute");
const timer_second=document.getElementById("timer-second");

let timer;
let timerPaused = false;
let _Tsec = 0;
let _Tmin = 0;
let _Thour = 0;
let time_remaining = 0;

const setTimer = () => {
	clearInterval(timer);
	clockInside.classList.remove("toggled");
	_Tsec = parseInt(timer_second.value);
	_Tmin = parseInt(timer_minute.value);
	_Thour = parseInt(timer_hour.value);
	if(_Thour=="" || isNaN(_Thour)) _Thour = 0;
	if(_Tmin=="" || isNaN(_Tmin)) _Tmin = 0;
	if(_Tsec=="" || isNaN(_Tsec)) _Tsec = 0;
	time_remaining = _Tsec + (_Tmin * 60) + (_Thour * 60 * 60);
	startTimer();
}

const countdown = () => {
		let remain;

	const output_hours = parseInt(time_remaining / 3600);
	remain = time_remaining % 3600;
	const output_minutes = parseInt(remain / 60);
	remain = remain % 60; 
	const output_seconds = remain;

	timerHour.innerHTML = `${output_hours} :`;
	timerMinute.innerHTML = `&nbsp;${output_minutes} :`;
	timerSecond.innerHTML = `&nbsp;${output_seconds}`;


	time_remaining--;
	if (time_remaining === -1) {
		clockInside.classList.add("toggled");
		clearInterval(timer);
	}
}

const startTimer = () => {
	timer = setInterval(countdown, 1000);

	timerReset.classList.remove("hidden");
	timerPlay.classList.remove("hidden");
	timerPlay.innerHTML = "Pause";
	timerPlay.classList.remove("toggled");
}

const playPauseTimer = () => {
	if(timerPaused){
		startTimer();

	}else{
		clearInterval(timer);
		timerPlay.classList.add("toggled");
		timerPlay.innerHTML = "Play";
	}
	timerPaused = !timerPaused;
	
}

const resetTimer = () => {
	clearInterval(timer);
	clockInside.classList.remove("toggled");
	timerReset.classList.add("hidden");
	timerPlay.classList.add("hidden");
	tHour = 0;
	tMinute = 0;
	tSec = 0;
	timerHour.innerHTML = `${tHour} :`;
	timerMinute.innerHTML = `&nbsp;${tMinute} :`;
	timerSecond.innerHTML = `&nbsp;${tSec}`;
	timer_hour.value = '';
	timer_minute.value = '';
	timer_second.value = '';
	
}

timerStart.addEventListener("click", setTimer);
timerReset.addEventListener("click", resetTimer);
timerPlay.addEventListener("click", playPauseTimer);


//stopwatch
const playButton = document.getElementsByClassName("play")[0];
const lapButton = document.getElementsByClassName("lap")[0];
const resetButton = document.getElementsByClassName("reset")[0];
const clearAllButton = document.getElementsByClassName("lap-clear-button")[0];
const minute = document.getElementsByClassName("minute")[0];
const second = document.getElementsByClassName("sec")[0];
const centiSecond = document.getElementsByClassName("msec")[0];
const laps = document.getElementsByClassName("laps")[0];


let isPlay = false;
let minl
let secCounter = 0;
let sec;
let centiSec;
let centiCounter = 0;;
let minCounter = 0;
let lapItem = 0;
let isReset = false;

const toogleButton = () => {
	lapButton.classList.remove("hidden");
	resetButton.classList.remove("hidden");
}

const play =() => {
	if (!isPlay && !isReset) {
		playButton.innerHTML = 'Pause';
		min = setInterval(() => {
				minute.innerHTML = `${++minCounter} :`;
			}, 60*1000);
		sec = setInterval(() => {
				if(secCounter === 60){
					secCounter = 0;
				}
				second.innerHTML = `&nbsp;${++secCounter} :`;
			}, 1000);
		centiSec = setInterval(() => {
				if(centiCounter === 100){
					centiCounter = 0;
				}
				centiSecond.innerHTML = `&nbsp;${++centiCounter}`;
			}, 10);
		isPlay = true;
		isReset = true;
	}else{
		playButton.innerHTML = 'Play';
		clearInterval(min);
		clearInterval(sec);
		clearInterval(centiSec);
		isPlay = false;
		isReset = false;
	}
	toogleButton();
}


const reset = () => {
	isReset = true
	play();
	lapButton.classList.add("hidden")
	resetButton.classList.add("hidden");
	minute.innerHTML = '0 :'
	second.innerHTML = '&nbsp;0 :';
	centiSecond.innerHTML = '&nbsp;0';
}

const lap = () => {
	const li = document.createElement("li");
	const number = document.createElement("span");
	const timeStamp = document.createElement("span");

	li.setAttribute("class", "lap-item");
	number.setAttribute("class", "number");
	timeStamp.setAttribute("class", "time-stamp");

	number.innerHTML = `${++lapItem}`;
	timeStamp.innerHTML = `${minCounter} : ${secCounter} : ${centiCounter}`;

	li.append(number, timeStamp);
	laps.append(li);

	clearAllButton.classList.remove("hidden")
}

const clearAll =() => {
	lapItem = 0;
	laps.innerHTML = '';
	laps.append(clearAllButton);
	clearAllButton.classList.add("hidden")
	lapItem = 0;
}

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", lap);
clearAllButton.addEventListener("click", clearAll);

//Tabs
function openPage(pageName, elmnt, color) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

 
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }

  document.getElementById(pageName).style.display = "block";
  
  elmnt.style.backgroundColor = color;
}

document.getElementById("defaultOpen").click();