let startTime, updatedTime, difference, tInterval, running = false;
const timeDisplay = document.getElementById('time');
const lapsList = document.getElementById('laps-list');
const startStopButton = document.getElementById('start-stop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', recordLap);

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 10);
        startStopButton.innerText = 'Pause';
        running = true;
    } else {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        startStopButton.innerText = 'Start';
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    startTime = null;
    difference = null;
    running = false;
    startStopButton.innerText = 'Start';
    timeDisplay.innerText = '00:00:00.000';
    lapsList.innerHTML = '';
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    timeDisplay.innerText = 
        (hours < 10 ? '0' : '') + hours + ':' +
        (minutes < 10 ? '0' : '') + minutes + ':' +
        (seconds < 10 ? '0' : '') + seconds + '.' +
        (milliseconds < 10 ? '0' : '') + milliseconds;
}

function recordLap() {
    if (running) {
        const lapTime = document.createElement('li');
        lapTime.innerText = timeDisplay.innerText;
        lapsList.appendChild(lapTime);
    }
}