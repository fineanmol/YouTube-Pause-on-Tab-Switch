chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Target the main video player first, fallback to standard video element
  const video = document.querySelector('video.html5-main-video') || document.querySelector('video');

  if (request.action === "getVideoState") {
    if (video) {
      const isPlaying = !video.paused && !video.ended && video.readyState > 2;
      sendResponse({ hasVideo: true, isPlaying: isPlaying });
    } else {
      sendResponse({ hasVideo: false, isPlaying: false });
    }
    return true;
  }

  if (request.action === "pauseVideo") {
    if (video && !video.paused) {
      video.pause();
      sendResponse({ success: true });
    } else {
      sendResponse({ success: false });
    }
    return true;
  }

  if (request.action === "playVideo") {
    if (video && video.paused) {
      video.play()
        .then(() => sendResponse({ success: true }))
        .catch((err) => {
          console.warn("YouTube Pause: Playback failed (browser autoplay block?):", err);
          sendResponse({ success: false, error: err.message });
        });
      return true;
    } else {
      sendResponse({ success: false });
    }
    return true;
  }
});