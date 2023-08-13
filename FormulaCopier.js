// ==UserScript==
// @name         Copy Formulas from Zhihu
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Copy LaTeX formulas when copying text on Zhihu.
// @author       YuhangChen(github.com/yuhangchen0)
// @match        https://www.zhihu.com/*
// @match        https://zhuanlan.zhihu.com/p/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.addEventListener('copy', function(event) {
        const selection = window.getSelection();
        let selectedHtml = getSelectionHtml();

        // Check if we have any formula in the selection.
        if (selectedHtml.includes('data-tex')) {
            const container = document.createElement('div');
            container.innerHTML = selectedHtml;

            const formulas = container.querySelectorAll('.ztext-math');
            formulas.forEach(formula => {
                const texCode = formula.getAttribute('data-tex');
                const texNode = document.createTextNode('$' + texCode + '$');
                formula.replaceWith(texNode);
            });

            // Modify clipboard content
            event.clipboardData.setData('text/plain', container.textContent);
            event.preventDefault(); // Prevent default copy action
        }
    });

    function getSelectionHtml() {
        const sel = window.getSelection();
        if (sel.rangeCount) {
            const container = document.createElement('div');
            for (let i = 0, len = sel.rangeCount; i < len; ++i) {
                container.appendChild(sel.getRangeAt(i).cloneContents());
            }
            return container.innerHTML;
        }
        return '';
    }
})();