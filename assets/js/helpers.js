// ВКЛ/ВЫКЛ Звука
export const soundToggle = () => {
  const soundBtn = document.querySelector('[data-sound]');
  if (!soundBtn) return;

  const soundPath = soundBtn.getAttribute('data-sound');
  const audio = new Audio(soundPath);
  audio.loop = true;
  audio.volume = 1;

  let isPlaying = false;

  const handleSoundToggle = () => {
    if (!isPlaying) {
      audio
        .play()
        .then(() => {
          isPlaying = true;
          soundBtn.classList.add('is-playing');
        })
        .catch(err => {
          console.warn('Ошибка при воспроизведении:', err);
        });
    } else {
      audio.pause();
      isPlaying = false;
      soundBtn.classList.remove('is-playing');
    }
  };

  soundBtn.addEventListener('click', handleSoundToggle);
};

// ТАЙМЕР МИЛИСЕКУНД
export const startMillisecondTimer = () => {
  const timerEl = document.querySelector('[data-timer]');
  if (!timerEl) return;

  const startTime = Date.now();

  const update = () => {
    const elapsed = Date.now() - startTime;

    const minutes = String(Math.floor(elapsed / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((elapsed % 60000) / 1000)).padStart(2, '0');
    const milliseconds = String(elapsed % 1000).padStart(3, '0');

    timerEl.textContent = `${minutes}:${seconds},${milliseconds}`;
    requestAnimationFrame(update);
  };

  requestAnimationFrame(update);
};
