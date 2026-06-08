# Chrome Web Store Publishing Guide

This guide details the steps to publish the **YouTube Pause on Tab Switch** extension to the Chrome Web Store.

---

## 📋 Prerequisites

1. **Google Account**: A standard Google account is required to access the developer console.
2. **Chrome Developer Account**: Register at the [Chrome Developer Dashboard](https://chrome.google.com/developer/dashboard).
   - *Note: There is a one-time registration fee of $5 USD charged by Google to verify developer identity and prevent spam.*

---

## 📦 Step 1: Package the Extension

The Chrome Web Store requires you to upload the extension as a `.zip` file containing only the production assets.

To package the extension on macOS/Linux, run the following command in your terminal from the project root directory:

```bash
zip -r youtube-pause-extension.zip manifest.json background.js content.js images/
```

> [!TIP]
> This command explicitly includes only the required files and directory, automatically excluding system files like `.DS_Store` or other development assets.

---

## 📝 Step 2: Fill Out Store Listing Details

Once logged into the Chrome Developer Dashboard, click **Add new item** and upload the `youtube-pause-extension.zip` file. You will then need to fill out the store listing information.

### Product Description
Here is a recommended description template for the store listing:

```text
YouTube Pause on Tab Switch automatically pauses your YouTube video when you switch to another tab and instantly resumes playback when you return. 

Whether you are multitasking, replying to a message, or looking up info in another tab, you will never miss a second of your favorite video.

✨ Features:
- Seamless Auto-Pause: Pauses playback the moment you navigate away from a YouTube tab.
- Smart Auto-Resume: Automatically resumes playback when you switch back.
- Clean & Lightweight: Runs entirely in the browser with zero background bloat, minimal permissions, and zero tracking.

How to use:
1. Install the extension.
2. Open any YouTube video and start playing it.
3. Switch to another tab, and watch the video pause.
4. Return to the YouTube tab, and watch it resume playing!
```

### Store Assets
- **Store Icon**: Upload `images/icon128.png` (must be exactly 128x128 pixels).
- **Screenshots**: You must upload at least one screenshot. 
  - Supported dimensions: **1280x800** or **640x400** pixels.
  - *Tip: Take a screenshot of a YouTube page with the active tab highlighted to show the extension in action.*

---

## 🔒 Step 3: Privacy & Permission Justifications

Chrome Web Store reviewers strictly audit extensions requesting host permissions and scripting APIs. During submission, you will be prompted to explain why you need these permissions in the **Privacy practices** tab.

Use the following justifications for the fields:

### 1. Single Purpose Description
> "This extension serves the single purpose of automatically pausing active YouTube videos when the user switches away from the YouTube tab, and resuming the video when the user returns."

### 2. Permission Justifications

| Permission | Purpose / Justification |
| :--- | :--- |
| **`tabs`** | Required to monitor tab activation switches (`chrome.tabs.onActivated`) and tab URL updates (`chrome.tabs.onUpdated`) so the background worker can detect when a YouTube tab is focused or unfocused. |
| **`activeTab`** | Used to temporarily interact with the active tab when switching tabs, ensuring scripts are executed with the user's focus. |
| **`scripting`** | Required to execute the lightweight play/pause Javascript functions (`chrome.scripting.executeScript`) in the context of the YouTube page. |
| **`*://*.youtube.com/*`** | Host permission required to allow script execution exclusively on YouTube web pages to pause and play the video element. |

### 3. Data Usage Declaration
Select **No** for collecting or transmitting user data.
> "This extension runs entirely locally in the user's browser. It does not collect, store, track, or transmit any user history, credentials, personal information, or analytics."

---

## 🚀 Step 4: Submit for Review

1. Complete the **Distribution** section (select visibility: *Public*, *Unlisted*, or *Private*).
2. Review all fields for accuracy.
3. Click **Submit for review**. 
4. The review process typically takes anywhere from a few hours to a few days. Once approved, the extension will be live on the Chrome Web Store!
