// большая кнопка воспроизведения
const playBtn = document.querySelector(".video__player-img");
// маленькая кнопка восроизведения
const playerPlayBrn = document.querySelector(".duration__img");
// само видео
const video = document.getElementById("player");
// input с помощью которого выставляется время воспроизведения
const durationControl = document.getElementById("durationLevel");
// input с помощью которого выставляется громкость
const soundControl = document.getElementById("micLevel");
// обёртка управления громкостью
const soundBtn = document.getElementById("soundBtn");
// кнопка с динамиком, с помощью которой мы будем включить или выключать громкость 
const dynamicBtn = document.getElementById('dynamic');
// идентификатор интервала, который будет отрисовывать текущее время воспроизведения
let intervalId;
// переменная для сохранения уровня громкости перед выключением звука
let soundLevel;

// отслеживаем загрузку медифайлов страницы
window.addEventListener('load', function() {
    // при клике на само видео выполняем функцию playStop
    video.addEventListener("click", playStop);
    // находим все кнопки управления play/pause
    let playButtons = document.querySelectorAll(".play");

    for (let i = 0; i < playButtons.length; i++) {
        // при клике на эти кнопки выполняем функцию playStop
        playButtons[i].addEventListener("click", playStop);
    }

    // выставляем минимальное значение ползунка времени воспроизведения
    durationControl.min = 0;
    // выставляем время воспроизведения в ноль
    durationControl.value = 0;
    // выставляем максимальное значение ползунка времени воспроизведения по длительности видео
    durationControl.max = video.duration;
    // при кликах или перетягивании ползунка выполняем функцию setVideoDuration
    durationControl.addEventListener("input", setVideoDuration);

    // выставляем минимальное значение ползунка громкости
    soundControl.min = 0;
    // выставляем максимальное значение ползунка громкости
    soundControl.max = 10;
    // выставляем текущее положение ползунка громкости на максимум
    soundControl.value = soundControl.max;
    // при кликах или перетягивании ползунка выполняем функцию changeSoundVolume
    soundControl.addEventListener("input", changeSoundVolume);

    // при клике на динамик выполняем soundOf
    dynamicBtn.addEventListener('click', soundOf);

    // когда видео закончится
    video.addEventListener('ended', () => {
        // выставляем классы на кнопки, чтоб отобразить, что можно воспроизводить снова
        playBtn.classList.toggle('video__player-img--active');
        playerPlayBrn.classList.remove('active');
        // устанавливаем время воспроизведения в ноль
        video.currentTime = 0;
    })
});

// функция воспроизводить/поставить на паузу
function playStop() {
    // устанавливаем активные классы на элементы чтоб показать воспроизводится сейчас видео или нет
    playBtn.classList.toggle("video__player-img--active");
    playerPlayBrn.classList.toggle("active");

    // если видео на паузе
    if (video.paused) {
        // запускаем его
        video.play();
        // запускаем отрисовку ползунка времени воспроизведения
        intervalId = setInterval(updateDuration, 1000 / 60);
        // если видео не на паузе
    } else {
        // останавливаем отрисовку ползунка времени воспроизведения
        clearInterval(intervalId);
        // ставим видео на паузу
        video.pause();
    }
}

// функция установить текущее время воспроизведения
function setVideoDuration() {
    // установливает текущее время воспроизведения видео по позиции ползунка
    video.currentTime = durationControl.value;
    // отрисовывает полосу прогресса
    updateDuration();
}

/*
  Функция для обновления позиции ползунка продолжительности видео.   
*/
function updateDuration() {
    // устанавливаем в наш инпут текущее время
    durationControl.value = video.currentTime;
    // рассчитываем процент для закраски прогресса
    let step = video.duration / 100; // 121 / 100 = 1.21
    let percent = video.currentTime / step; // 60 / 1.21
    // устанавливаем стили
    durationControl.style.background = `linear-gradient(90deg, #FEDB3F 0%, #FEDB3F ${percent}%, #626262 ${percent}%)`;
}

// функция изменения уровня громкости
function changeSoundVolume() {
    // видео принимает только значения от 0 до 1, то есть дробные числа
    // поэтому текущее значение ползунка громкости делим на 10
    video.volume = soundControl.value / 10; // 0.1 0.8...
    // если мы выставили ползунок в ноль
    if (video.volume === 0) {
        // то отображаем на динамике что звук выключен
        soundBtn.classList.add("active");
        // если звук не выключен, то снимаем отображение выключенного звука с икноки динамика
    } else {
        soundBtn.classList.remove("active");
    }
}

// функция включения/выключения звука
function soundOf() {
    // если при запуске функции звук выключен
    if (video.volume === 0) {
        // мы берем предыдущее сохраненное значение громкости и выставляем в видео
        video.volume = soundLevel;
        // отрисовываем это в ползунок громкости
        soundControl.value = soundLevel * 10;
        // убираем отображение выключенного звука с иконки динамика
        soundBtn.classList.remove('active');
        // если при запуске функции звук включен
    } else {
        // сохраняем текущее значение громкости
        soundLevel = video.volume;
        // выставляем громкость в ноль
        video.volume = 0;
        // отрисовываем это на ползунке громкости
        soundControl.value = 0;
        // отображаем на иконке динамика, что звук выключен
        soundBtn.classList.add('active');
    }
}