chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "pauseVideo") {
      const video = document.querySelector('video');
      if (video && !video.paused) {
        video.pause();
      }
    } else if (request.action === "playVideo") {
      const video = document.querySelector('video');
      if (video && video.paused) {
        video.play();
      }
    }
  });
  