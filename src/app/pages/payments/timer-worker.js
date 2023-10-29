let countdown = 900; // 15 minutes in seconds

function tick() {
  if (countdown > 0) {
    countdown--;
    postMessage(countdown);
    setTimeout(tick, 1000); // Call itself after 1 second
  } else {
    postMessage('timer-complete');
  }
}

tick();