# 🎥 YouTube Pause on Tab Switch

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Chrome Web Store](https://img.shields.io/badge/Chrome_Web_Store-Available-blue.svg)](https://chromewebstore.google.com/detail/youtube-pause-on-tab-swit/cmdndknhgabpknljbncefpockcjpmihh?authuser=0&hl=en-GB)
[![Privacy Policy](https://img.shields.io/badge/Privacy_Policy-Zero_Data_Collection-success.svg)](https://fineanmol.github.io/youtube-pause-privacy-policy.html)

A lightweight, seamless Google Chrome extension that automatically manages YouTube playback based on your tab focus. It automatically pauses active YouTube videos the moment you switch to another tab or minimize your browser, and instantly resumes playback when you switch back. 

Never miss a moment of your favorite podcasts, tutorials, or music videos while multitasking!

🔒 **[Read Our Privacy Policy](https://fineanmol.github.io/youtube-pause-privacy-policy.html)**

---

## ✨ Features

- **⚡ Zero-Latency Auto-Pause**: Instantly pauses any playing YouTube video the moment you switch to a different browser tab.
- **🔄 Auto-Resume (Optional)**: Seamlessly plays the video again when you switch focus back to the YouTube tab.
- **🧠 Smart State Tracking**: Respects your manual pauses! If you pause a video manually, it won't auto-resume when you switch back.
- **🖥️ Window & Minimize Support**: Automatically pauses the video when Chrome loses system focus or is minimized, and resumes when focus returns.
- **🎛️ User Settings Options UI**: A clean, modern dark-mode popup menu to toggle features like master enable/disable, auto-resume, and focus settings.
- **🚀 Ultra-Lightweight**: Runs on a background service worker using Manifest V3, consuming virtually zero memory or CPU when idle.
- **🔒 Privacy First**: Zero third-party tracking, zero analytics scripts, and runs entirely locally in your browser.

---

## 📦 Installation

### From Chrome Web Store
You can install the extension directly from the official store listing:

👉 **[YouTube Pause on Tab Switch on Chrome Web Store](https://chromewebstore.google.com/detail/youtube-pause-on-tab-swit/cmdndknhgabpknljbncefpockcjpmihh?authuser=0&hl=en-GB)**



### Load from Source (Developer Mode)
To run this extension locally or test custom modifications:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/fineanmol/YouTube-Pause-on-Tab-Switch.git
   cd YouTube-Pause-on-Tab-Switch
   ```

2. **Open Extensions Page**:
   Open Google Chrome and navigate to `chrome://extensions/` by typing it in the address bar.

3. **Enable Developer Mode**:
   Toggle the **Developer mode** switch in the top-right corner of the page.

4. **Load the Extension**:
   - Click the **Load unpacked** button in the top-left corner.
   - Select the `Youtube-Pause-Extension` directory containing the `manifest.json` file.

5. **Start Watching**:
   Open a YouTube video, start playing it, and switch tabs to see the extension in action!

---

## 🛠️ How It Works

The extension is powered by three main components:
1. **Background Service Worker (`background.js`)**:
   - Monitors tab activation, load states, and window focus changes.
   - Saves playback states to track whether a video was playing before loss of focus.
   - Communicates with content scripts via Chrome messaging.
2. **Content Script Injection (`content.js`)**:
   - Runs in the context of YouTube pages to inspect, play, or pause the video elements.
   - Responds to query messages about playback states safely.
3. **Popup Interface (`popup.html` / `popup.js`)**:
   - Provides a settings UI that persists preferences in `chrome.storage.local`.

---

## 📂 Project Structure

```text
YouTube-Pause-Extension/
├── manifest.json       # Metadata, permissions, and popup settings
├── background.js       # Background service worker coordinating state and logic
├── content.js          # Injected content script interfacing with YouTube player
├── popup.html          # Beautiful HTML settings panel UI
├── popup.js            # JavaScript backing the settings panel
├── LICENSE             # Open-source MIT License
├── README.md           # Documentation and overview
└── images/             # Extension logo icons
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

---

## 🔒 Privacy & Security

This extension is built with a strict privacy-first architecture:
- **Zero Data Collection**: No information is ever collected, stored, or transmitted to any remote servers.
- **Local Execution**: All logic runs locally on your device within the browser sandbox.
- **📑 [Read the Full Privacy Policy](https://fineanmol.github.io/youtube-pause-privacy-policy.html)**

---

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
