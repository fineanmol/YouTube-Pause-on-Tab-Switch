// Keep track of the playback state of YouTube tabs
const tabStates = {};

// Helper to retrieve user settings
function getSettings() {
  return new Promise((resolve) => {
    chrome.storage.local.get({
      extensionEnabled: true,
      autoResume: true,
      pauseOnFocusLoss: true
    }, (items) => {
      resolve(items);
    });
  });
}

// Helper to send messages to content scripts wrapped in a promise
function sendMessageToTab(tabId, message) {
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(tabId, message, (response) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(response);
      }
    });
  });
}

// Pause a specific YouTube tab and record if it was playing
async function handlePauseAndTrack(tabId) {
  try {
    const response = await sendMessageToTab(tabId, { action: "getVideoState" });
    if (response && response.hasVideo) {
      tabStates[tabId] = { wasPlaying: response.isPlaying };
      if (response.isPlaying) {
        await sendMessageToTab(tabId, { action: "pauseVideo" });
      }
    }
  } catch (err) {
    // Content script might not be ready or active on this tab
    console.debug(`Unable to get video state for tab ${tabId}:`, err.message);
  }
}

// Listen for tab switches
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const settings = await getSettings();
  if (!settings.extensionEnabled) return;

  try {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    const isYouTube = tab.url && tab.url.includes('youtube.com');

    if (isYouTube) {
      if (settings.autoResume && tabStates[activeInfo.tabId]?.wasPlaying) {
        await sendMessageToTab(activeInfo.tabId, { action: "playVideo" }).catch(() => {});
      }
    } else {
      // Pause YouTube tabs only in the current window (handles side-by-side windows)
      const youtubeTabs = await chrome.tabs.query({ windowId: activeInfo.windowId, url: '*://*.youtube.com/*' });
      for (const ytTab of youtubeTabs) {
        if (ytTab.id !== activeInfo.tabId) {
          await handlePauseAndTrack(ytTab.id);
        }
      }
    }
  } catch (err) {
    console.error("Error handling tab activation:", err);
  }
});

// Listen for tab updates (e.g. page finished loading)
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    const settings = await getSettings();
    if (!settings.extensionEnabled) return;

    const isYouTube = tab.url && tab.url.includes('youtube.com');
    if (isYouTube) {
      // If a YouTube tab finishes loading in the background, pause it to prevent background autoplay
      const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (activeTab && activeTab.id !== tabId) {
        await handlePauseAndTrack(tabId);
      }
    }
  }
});

// Listen for browser window focus changes (e.g., minimization, switching apps)
chrome.windows.onFocusChanged.addListener(async (windowId) => {
  const settings = await getSettings();
  if (!settings.extensionEnabled || !settings.pauseOnFocusLoss) return;

  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    // User switched to another OS application (browser lost system focus)
    const youtubeTabs = await chrome.tabs.query({ url: '*://*.youtube.com/*' });
    for (const ytTab of youtubeTabs) {
      await handlePauseAndTrack(ytTab.id);
    }
  } else {
    // Browser regained focus; auto-resume if the active tab is YouTube
    try {
      const [activeTab] = await chrome.tabs.query({ active: true, windowId: windowId });
      if (activeTab && activeTab.url && activeTab.url.includes('youtube.com')) {
        if (settings.autoResume && tabStates[activeTab.id]?.wasPlaying) {
          await sendMessageToTab(activeTab.id, { action: "playVideo" }).catch(() => {});
        }
      }
    } catch (err) {
      console.debug("Failed to query active tab on focus change:", err.message);
    }
  }
});

// Clean up tab states when tabs are closed to prevent memory leaks
chrome.tabs.onRemoved.addListener((tabId) => {
  delete tabStates[tabId];
});