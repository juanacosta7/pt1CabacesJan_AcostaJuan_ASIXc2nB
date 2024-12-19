
const horaActualDisplay = document.getElementById('hora-actual-display');
const contadorDisplay = document.getElementById('contador');
const tempsFaltaInput = document.getElementById('temps-falta');
const horaFinalitzacioInput = document.getElementById('hora-finalitzacio');
const soSelect = document.getElementById('so');
let countdownInterval;
let selectedSound = document.getElementById('sound1');

function actualitzarHora() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  horaActualDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}

function començarContador() {
  const tempsFalta = tempsFaltaInput.value.split(":");
  let totalSegons = parseInt(tempsFalta[0]) * 3600 + parseInt(tempsFalta[1]) * 60 + parseInt(tempsFalta[2]);

  clearInterval(countdownInterval);
  
  countdownInterval = setInterval(function () {
    const hours = Math.floor(totalSegons / 3600);
    const minutes = Math.floor((totalSegons % 3600) / 60);
    const seconds = totalSegons % 60;

    contadorDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    if (totalSegons <= 0) {
      clearInterval(countdownInterval);
      sonarSo();
    } else {
      totalSegons--;
    }
  }, 1000);
}

function començarPerHora() {
  const horaFinal = new Date();
  const tempsFinal = horaFinalitzacioInput.value.split(":");
  horaFinal.setHours(parseInt(tempsFinal[0]), parseInt(tempsFinal[1]), 0, 0);
  
  const totalMillis = horaFinal.getTime() - new Date().getTime();
  let totalSegons = totalMillis / 1000;

  clearInterval(countdownInterval);

  countdownInterval = setInterval(function () {
    const hours = Math.floor(totalSegons / 3600);
    const minutes = Math.floor((totalSegons % 3600) / 60);
    const seconds = totalSegons % 60;

    contadorDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    if (totalSegons <= 0) {
      clearInterval(countdownInterval);
      sonarSo();
    } else {
      totalSegons--;
    }
  }, 1000);
}

soSelect.addEventListener('change', function () {
  selectedSound = document.getElementById(soSelect.value);
});

function sonarSo() {
  selectedSound.play(); 
}

setInterval(actualitzarHora, 1000);

document.getElementById('començar').addEventListener('click', començarContador);
document.getElementById('començar-hora').addEventListener('click', començarPerHora);

