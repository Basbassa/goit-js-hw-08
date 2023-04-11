import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo(iframe);

player.on('play', function () {
  console.log('played the video!');
});

player.on(
  'timeupdate',
  throttle(function () {
    const currentTime = Math.round(player.currentTime());
    localStorage.setItem('videoplayer-current-time', currentTime);
  }, 1000)
);

const storedTime = localStorage.getItem('videoplayer-current-time');
if (storedTime) {
  player.setCurrentTime(storedTime);
}
