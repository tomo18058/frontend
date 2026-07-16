window.addEventListener('DOMContentLoaded', () => {
  const welcomeScreen = document.querySelector('.welcome-screen');

  if (!welcomeScreen) return;

  requestAnimationFrame(() => {
    welcomeScreen.classList.add('is-visible');
  });

  setTimeout(() => {
    welcomeScreen.classList.add('is-exiting');
  }, 2500);

  setTimeout(() => {
    window.location.href = 'index.html';
  }, 3500);
});
