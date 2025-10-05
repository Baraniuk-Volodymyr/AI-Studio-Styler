# AI Studio Styler

![Chrome](https://img.shields.io/badge/Chrome-Supported-brightgreen)![Edge](https://img.shields.io/badge/Edge-Supported-blue)![Firefox](https://img.shields.io/badge/Firefox-Supported-orange)

A browser extension to enhance the user experience in Google's AI Studio by providing customizable Right-to-Left (RTL) and Left-to-Right (LTR) text direction controls. Perfect for users working with RTL languages like Persian, Arabic, or Hebrew.

This tool gives you granular control over the text direction of the main prompt area, code blocks, and code block headers, allowing you to create a comfortable and productive environment.

---

## 🌟 Features

*   **One-Click Toggle**: Easily enable or disable all custom styles with a single button.
*   **Persistent Settings**: Your preferred settings are automatically saved and applied whenever you open AI Studio.
*   **Advanced Customization**: An expandable "Advanced Settings" menu lets you fine-tune the experience:
    *   Set the direction (`RTL`/`LTR`) for the main container.
    *   Independently set the direction for code blocks.
    *   Set the text alignment (`Left`/`Right`/`Center`) for code blocks to maintain readability.
    *   Control the direction of code block headers.
*   **Reset to Defaults**: A convenient reset button restores the default recommended settings without disabling the extension.
*   **Cross-Browser Support**: Works seamlessly on Google Chrome, Microsoft Edge, and Mozilla Firefox.

## 📸 Screenshots


| Popup Menu | Before & After |
| :---: | :---: |
| ![Popup Menu Screenshot](/res/Popup.png?text=Popup+Menu) | ![Before and After Screenshot](/res/Before-After.png?text=Effect+on+AI+Studio) |

## 🛠️ Installation

First, clone or download this repository to your local machine.

```bash
git clone https://github.com/MahDN/AI-Studio-Styler.git
```

Then, follow the instructions for your specific browser.

---

### 🚀 Google Chrome

1.  Open Chrome and navigate to `chrome://extensions`.
2.  Enable **Developer mode** using the toggle switch in the top-right corner.
3.  Click the **Load unpacked** button.
4.  In the file selection dialog, navigate to the `AI-Studio-Styler` folder and select the **`Chrome`** subfolder.
5.  The extension is now installed and ready to use!

---

### 🚀 Microsoft Edge

1.  Open Edge and navigate to `edge://extensions`.
2.  Enable **Developer mode** using the toggle switch in the bottom-left corner.
3.  Click the **Load unpacked** button.
4.  In the file selection dialog, navigate to the `AI-Studio-Styler` folder and select the **`Edge`** subfolder.
5.  The extension will now be active.

---

### 🚀 Mozilla Firefox

1.  Open Firefox and navigate to `about:debugging`.
2.  In the left-hand menu, click on **This Firefox**.
3.  Click the **Load Temporary Add-on…** button.
4.  In the file selection dialog, navigate to the **`Firefox`** subfolder inside the `AI-Studio-Styler` project and select the **`manifest.json`** file.
5.  The extension will be installed for your current browser session. *Note: Temporary add-ons in Firefox are removed when you close the browser.*

## 📂 Project Structure

This repository is organized with separate folders for each browser to handle their specific `manifest.json` requirements and JavaScript API differences.

```
AI-Studio-Styler/
├── Chrome/
│   ├── manifest.json
│   ├── popup.html
│   ├── popup.js
│   └── content.js
├── Edge/
│   ├── manifest.json
│   └── ... (all other shared files)
├── Firefox/
│   ├── manifest.json
│   └── ... (all other shared files)
├── res/
│   ├── Popup.png
│   └── Before-After.png
├── README.md
└── LICENSE


```

## 🗺️ Roadmap

*   [ ] Publish the extension to the official Chrome, Edge, and Firefox add-on stores for easy installation.
*   [ ] Add a dark mode theme for the popup menu.
*   [ ] Explore options for customizing font sizes or colors.
*   [ ] Refactor the codebase to use a build script that generates browser-specific packages from a single source.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/MahDN/AI-Studio-Styler/issues).

1.  **Fork** the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a **Pull Request**

## 📜 License

Distributed under the MIT License. See `LICENSE` file for more information.