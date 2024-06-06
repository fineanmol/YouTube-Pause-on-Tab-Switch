chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    if (tab.url.includes('youtube.com')) {
      chrome.scripting.executeScript({
        target: { tabId: activeInfo.tabId },
        func: playYouTubeVideo
      });
    } else {
      const youtubeTabs = await chrome.tabs.query({ url: '*://*.youtube.com/*' });
      youtubeTabs.forEach(youtubeTab => {
        chrome.scripting.executeScript({
          target: { tabId: youtubeTab.id },
          func: pauseYouTubeVideo
        });
      });
    }
  });
  
  chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
      if (tab.url.includes('youtube.com')) {
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          func: playYouTubeVideo
        });
      } else {
        const youtubeTabs = await chrome.tabs.query({ url: '*://*.youtube.com/*' });
        youtubeTabs.forEach(youtubeTab => {
          chrome.scripting.executeScript({
            target: { tabId: youtubeTab.id },
            func: pauseYouTubeVideo
          });
        });
      }
    }
  });
  
  function pauseYouTubeVideo() {
    const video = document.querySelector('video');
    if (video && !video.paused) {
      video.pause();
    }
  }
  
  function playYouTubeVideo() {
    const video = document.querySelector('video');
    if (video && video.paused) {
      video.play();
    }
  }
  