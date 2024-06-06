# YouTube Pause on Tab Switch

## Description
This Chrome extension automatically pauses a YouTube video when you switch to another tab and resumes playback when you switch back to the YouTube tab. This helps you avoid missing any part of the video when you're multitasking.

## Features
- Pauses the YouTube video when you switch to a non-YouTube tab.
- Resumes the YouTube video when you switch back to the YouTube tab.

## Installation

### From Source
1. Clone the repository:
    ```sh
    git clone https://github.com/fineanmol/YouTube-Pause-on-Tab-Switch.git
    cd youtube-pause-on-tab-switch
    ```
2. Open Chrome and go to `chrome://extensions/`.

3. Enable "Developer mode" using the toggle switch in the top right corner.

4. Click on the "Load unpacked" button and select the `my-chrome-extension` directory.

### From Chrome Web Store
*(Once published)*

1. Go to the Chrome Web Store.
2. Search for "YouTube Pause on Tab Switch".
3. Click "Add to Chrome".

## Usage
1. After installation, open any YouTube video and start playing it.
2. Switch to another tab; the video will automatically pause.
3. Switch back to the YouTube tab; the video will automatically resume.

## Development
### Project Structure

```my-chrome-extension/
├── manifest.json
├── background.js
└── content.js
```

### manifest.json
Defines the permissions and files used in the extension.

### background.js
Handles tab activation and updates to send appropriate messages to the content script.

### content.js
Listens for messages from the background script and pauses or plays the video accordingly.

## Contributing
Feel free to fork the repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
