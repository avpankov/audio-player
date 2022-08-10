let audio = document.querySelector('.audio');
let play = document.querySelector('.play-button');
let isPlaying = false;
let currentTime = document.querySelector('.current_time');
let restTime = document.querySelector('.rest_time');
let duration = audio.duration;

play.addEventListener('click', playMusic);

function playMusic() {
    if (!isPlaying) {
        play.src = './src/assets/svg/pause.png';
        audio.play();
        setInterval(() => {
            currentTime.innerHTML = convertTime(audio.currentTime);
        }, 1000);
        setInterval(() => {
            restTime.innerHTML = convertTime(audio.duration - audio.currentTime);
        }, 1000);
        isPlaying = true;
        console.dir(audio);
    } else {
        play.src = './src/assets/svg/play.png';
        audio.pause();
        isPlaying = false;
    }
}

function convertTime(duration) {
    duration = Math.floor(duration);
    let min = Math.floor(duration / 60);
    let sec = duration - min * 60;
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
}