[English](./README_EN.md) | 中文

# FormulaCopier
在某些网站（比如zhihu.com）复制内容时，如果出现被渲染的LeTeX公式，那么这个公式可能无法被复制.

这个Tampermonkey脚本可以让你在这些网页上复制文本时，同时复制其LaTeX公式。此外，当你选中包含LaTeX公式的文本时，它还会为公式添加高亮。

目前只在Google Chrome上测试可用，尚未测试其他浏览器。


## 支持网页

* https://www.zhihu.com/*
* https://zhuanlan.zhihu.com/p/*

## 功能
- **复制公式**：当你复制文本时，LaTeX公式会与文本一起复制，使得公式复制到其他地方时格式正确。
  
- **公式高亮**：当你选中包含LaTeX公式的文本时，公式会被高亮显示，使你能够轻松地识别是否复制文本。

## 安装
1. 确保你已经安装了[Tampermonkey](http://tampermonkey.net/)或类似的用户脚本管理器并启动。
2. 点击 [安装插件](https://github.com/yuhangchen0/FormulaCopier/raw/main/FormulaCopier.user.js) 即可弹出油猴安装页面，点击安装即可。

## 使用方法
1. 安装脚本后，访问知乎或知乎专栏。
2. 当你选中包含LaTeX公式的文本时，公式会被自动高亮。
3. 复制文本，然后粘贴到其他地方，你会看到LaTeX公式已经被正确复制。

## 反馈与建议
如果你在使用过程中遇到任何问题或有任何建议，欢迎在本项目的Issues区域提出。

## 许可证
本项目使用MIT许可证。

## 预览

![预览](./img/preview.png)