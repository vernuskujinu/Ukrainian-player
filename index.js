const background = document.querySelector('.background');
const audio = document.querySelector('.audio');
const player = document.querySelector('.player');
const cover = document.querySelector('.cover');
const playPause = document.querySelector('.play-pause');
const next = document.querySelector('.next-song');
const previous = document.querySelector('.previous-song');
const artist = document.querySelector('.artist');
const title = document.querySelector('.song');
const progressContainer = document.querySelector('.progress-container');
const progress = document.querySelector('.progress');

//Songs arrs
const songs = ["вороги","дідько, я у розпачі","божевілля двох"];
const artists = ['хейтспіч', 'Mistmorn','Mistmorn'];

//Default song
let songIndex = 0;

//Init song
function loadSong(song) {
  artist.innerHTML = artists[`${songIndex}`];
  title.innerHTML = song
  audio.src = `assets/audio/${song}.mp3`;
  background.src = `assets/img/cover${songIndex + 1}.jpg`;
  cover.src = `assets/img/cover${songIndex + 1}.jpg`;

}
loadSong(songs[songIndex]);

//Play
function playSong() {
  playPause.src = 'assets/svg/pause.png';
  player.classList.add('play');
  cover.classList.add('active');
  audio.play()
}
//Pause
function pauseSong() {
  playPause.src = 'assets/svg/play.png';
  player.classList.remove('play');
  cover.classList.remove('active');
  audio.pause()
}
playPause.addEventListener('click', () => {
  const isPlaying = player.classList.contains('play');
  if(isPlaying) {
    pauseSong();
  }else {
    playSong();
  }
});

//next song
function nextSong() {
  songIndex++;
  if(songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

next.addEventListener('click', nextSong);

//prevsong
function prevSong() {
  songIndex--;
  if(songIndex < 0){
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}
previous.addEventListener('click', prevSong);

//progressbar
function updateProgress(e) {
  const {duration, currentTime} =  e.srcElement
  const progressPercent = (currentTime / duration) * 100
  progress.style.width = `${progressPercent}%`

}
audio.addEventListener('timeupdate', updateProgress)

//setProgress
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX ;
  const duration = audio.duration

  audio.currentTime = (clickX / width) * duration

}
progressContainer.addEventListener('click', setProgress)

//autoplay
audio.addEventListener('ended',nextSong);