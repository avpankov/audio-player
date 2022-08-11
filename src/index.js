// Element selectors
let audio = document.querySelector('.audio');
let play = document.querySelector('.play-button');
let prev = document.querySelector('.prev-button');
let next = document.querySelector('.next-button');
let progress = document.querySelector('.progress');
let author = document.querySelector('.audio-author');
let title = document.querySelector('.audio-title');
let currentTime = document.querySelector('.current_time');
let restTime = document.querySelector('.rest_time');
let cover = document.querySelector('.cover_art');
let background = document.querySelector('.background');
let timeline = document.querySelector('.timeline');

//Flag
let isPlaying = false;

//Data
let songsSrc = ['./src/assets/audio/beyonce.mp3', './src/assets/audio/dontstartnow.mp3'];
let coverArts = ['./src/assets/img/lemonade.png', './src/assets/img/dontstartnow.png'];
let songs = {
    'Beyonce': "Don't hurt yourself", 
    'Dua Lipa': "Don't start now"
};
let n = 0;

currentTime.innerHTML = convertTime(audio.currentTime);
restTime.innerHTML = convertTime(audio.duration);
progress.max = audio.duration;
progress.value = 0;

play.addEventListener('click', playMusic);
prev.addEventListener('click', () => {
    if (audio.currentTime > 3) {
        audio.currentTime = 0;
    } else {
        --n;
        n = n < 0 ? songsSrc.length - 1 : n;
        audio.src = songsSrc[n];
        cover.src = coverArts[n];
        background.src = coverArts[n];
        author.innerHTML = Object.keys(songs)[n];
        title.innerHTML = Object.values(songs)[n];
        if (isPlaying) audio.play();
        audio.currentTime = 0;
        restTime.innerHTML = convertTime(audio.duration)
    }
});

next.addEventListener('click', playNextSong);

timeline.addEventListener('click', (e) => {
    audio.currentTime = audio.duration * e.offsetX / timeline.clientWidth;
    progress.style.width = (audio.currentTime * 100 / audio.duration) + '%';
    currentTime.innerHTML = convertTime(audio.currentTime);
    restTime.innerHTML = convertTime(audio.duration - audio.currentTime);
})

timeline.addEventListener('drag', (e) => {
    console.log(e.offsetX)
})

function playMusic() {
    if (!isPlaying) {
        play.src = './src/assets/svg/pause.png';
        audio.play();
        setInterval(() => {
            currentTime.innerHTML = convertTime(audio.currentTime);
            if (audio.currentTime == audio.duration) return playNextSong();
        }, 1000);
        setInterval(() => {
            restTime.innerHTML = convertTime(audio.duration - audio.currentTime);
        }, 1000);
        setInterval(() => {
            progress.style.width = (audio.currentTime * 100 / audio.duration) + '%';
        }, 500);
        isPlaying = true;
    } else {
        play.src = './src/assets/svg/play.png';
        audio.pause();
        isPlaying = false;
    }
}

function convertTime(duration) {
    duration = Math.floor(duration);
    let min = Math.floor(duration / 60) || 0;
    let sec = duration - min * 60 || 0;
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
}

function playNextSong() {
    ++n;
    n = n > songsSrc.length - 1 ? 0 : n;
    audio.src = songsSrc[n];
    cover.src = coverArts[n];
    background.src = coverArts[n];
    author.innerHTML = Object.keys(songs)[n];
    title.innerHTML = Object.values(songs)[n];
    if (isPlaying) audio.play();
    audio.currentTime = 0;
    setTimeout(() => {
        currentTime.innerHTML = convertTime(audio.currentTime);
        restTime.innerHTML = convertTime(audio.duration);
    }, 100);
}