document.addEventListener('DOMContentLoaded', () => {
  const extensionEnabled = document.getElementById('extensionEnabled');
  const autoResume = document.getElementById('autoResume');
  const pauseOnFocusLoss = document.getElementById('pauseOnFocusLoss');

  // Load saved configurations from chrome.storage.local
  chrome.storage.local.get({
    extensionEnabled: true,
    autoResume: true,
    pauseOnFocusLoss: true
  }, (items) => {
    extensionEnabled.checked = items.extensionEnabled;
    autoResume.checked = items.autoResume;
    pauseOnFocusLoss.checked = items.pauseOnFocusLoss;

    // Sub-settings depend on whether the main switch is enabled
    toggleSubSettingsState(items.extensionEnabled);
  });

  // Save configurations on toggle
  extensionEnabled.addEventListener('change', () => {
    const isEnabled = extensionEnabled.checked;
    chrome.storage.local.set({ extensionEnabled: isEnabled });
    toggleSubSettingsState(isEnabled);
  });

  autoResume.addEventListener('change', () => {
    chrome.storage.local.set({ autoResume: autoResume.checked });
  });

  pauseOnFocusLoss.addEventListener('change', () => {
    chrome.storage.local.set({ pauseOnFocusLoss: pauseOnFocusLoss.checked });
  });

  // Helper to visually disable options if main switch is off
  function toggleSubSettingsState(isEnabled) {
    if (isEnabled) {
      autoResume.disabled = false;
      pauseOnFocusLoss.disabled = false;
      autoResume.closest('.setting-item').style.opacity = '1';
      autoResume.closest('.setting-item').style.pointerEvents = 'auto';
      pauseOnFocusLoss.closest('.setting-item').style.opacity = '1';
      pauseOnFocusLoss.closest('.setting-item').style.pointerEvents = 'auto';
    } else {
      autoResume.disabled = true;
      pauseOnFocusLoss.disabled = true;
      autoResume.closest('.setting-item').style.opacity = '0.5';
      autoResume.closest('.setting-item').style.pointerEvents = 'none';
      pauseOnFocusLoss.closest('.setting-item').style.opacity = '0.5';
      pauseOnFocusLoss.closest('.setting-item').style.pointerEvents = 'none';
    }
  }
});
