export const throttle = (func, limit) => {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func.apply(this, args);
    }
  };
};

export const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

export const passwordToggle = () => {
  const passwords = document.querySelectorAll('[data-password]');

  if (!passwords || passwords.langth === 0) return;

  const handlePasswordToggle = e => {
    e.preventDefault();
    const icon = e.currentTarget.querySelector('img');
    const iconUrl = icon.src.split('password');
    const input = e.currentTarget.closest('.password-wrapper').querySelector('input[name="password"]');

    if (!icon || !input) return;

    if (iconUrl[1].includes('2.svg')) {
      icon.src = `${iconUrl[0]}password.svg`;
      input.type = 'text';
      return;
    }

    icon.src = `${iconUrl[0]}password2.svg`;
    input.type = 'password';
    // console.log(icon.src);
  };

  passwords.forEach(password => password.addEventListener('click', handlePasswordToggle));
};
