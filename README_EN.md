[中文](./README.md) | English

# FormulaCopier
When copying content from certain websites (e.g., zhihu.com), if there are rendered LaTeX formulas, they might not be copied correctly.

This Tampermonkey script allows you to copy the text along with its LaTeX formulas on these websites. Additionally, when you select text containing LaTeX formulas, it will highlight the formulas.

It's currently only tested to work on Google Chrome and hasn't been tested on other browsers.

## Supported Websites

* https://www.zhihu.com/*
* https://zhuanlan.zhihu.com/p/*

## Features
- **Copy Formulas**: When you copy text, the LaTeX formulas will be copied along with the text, ensuring the formulas are correctly formatted when pasted elsewhere.

- **Formula Highlight**: When you select text that contains LaTeX formulas, the formulas will be highlighted, making it easy for you to identify if the text is copied.

## Installation
1. Ensure you have [Tampermonkey](http://tampermonkey.net/) or a similar user script manager installed.
2. Visit the main page of this project to copy; the Tampermonkey installation link will be updated later.

## Usage
1. After installing the script, visit Zhihu or Zhihu Zhuanlan.
2. When you select text containing LaTeX formulas, they will be automatically highlighted.
3. Copy the text and paste it elsewhere, and you'll see that the LaTeX formulas have been copied correctly.

## Feedback and Suggestions
If you encounter any issues or have any suggestions while using it, feel free to raise them in the Issues section of this project.

## License
This project is licensed under the MIT license.
