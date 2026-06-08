# 🎥 YouTube Pause on Tab Switch

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Chrome Web Store](https://img.shields.io/badge/Chrome_Web_Store-Publishing_Ready-blue.svg)](#from-chrome-web-store)

A lightweight, seamless Google Chrome extension that automatically manages YouTube playback based on your tab focus. It automatically pauses active YouTube videos the moment you switch to another tab or minimize your browser, and instantly resumes playback when you switch back. 

Never miss a moment of your favorite podcasts, tutorials, or music videos while multitasking!

---

## ✨ Features

- **⚡ Zero-Latency Auto-Pause**: Instantly pauses any playing YouTube video the moment you switch to a different browser tab.
- **🔄 Auto-Resume**: Seamlessly plays the video again when you switch focus back to the YouTube tab.
- **🚀 Ultra-Lightweight**: Runs on a background service worker using Manifest V3, consuming virtually zero memory or CPU when idle.
- **🔒 Privacy First**: Zero third-party tracking, zero analytics scripts, and runs entirely locally in your browser.
- **🛠️ No Setup Required**: Works automatically immediately after installation.

---

## 📦 Installation

### From Chrome Web Store
Once the extension is published to the Chrome Web Store:
1. Search for **"YouTube Pause on Tab Switch"**.
2. Click **Add to Chrome**.

> [!NOTE]
> For instructions on publishing your own version of this extension, see the [Chrome Web Store Publishing Guide](PUBLISHING.md).

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

The extension is powered by two main components:
1. **Background Service Worker (`background.js`)**:
   - Listens to Chrome tab event updates (`chrome.tabs.onActivated` and `chrome.tabs.onUpdated`).
   - Detects whether the newly focused tab is a YouTube page.
   - Dynamically injects script operations to either play or pause the video depending on the active tab context.
2. **Content Script Injection (`content.js`)**:
   - Interacts directly with the webpage DOM to query the HTML5 `<video>` element on YouTube.
   - Safely plays and pauses media without interrupting YouTube's native UI state.

---

## 📂 Project Structure

```text
YouTube-Pause-Extension/
├── manifest.json       # Metadata, permissions, and service worker registration
├── background.js       # Background event listener for tab focus changes
├── content.js          # Injected scripts to query and toggle video element
├── LICENSE             # Open-source MIT License
├── README.md           # Documentation and overview
├── PUBLISHING.md       # Step-by-step Chrome Web Store publishing guide
└── images/             # Extension logo icons
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

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
