// ==UserScript==
// @name         FormulaCopier 
// @namespace    http://tampermonkey.net/
// @version      0.22
// @description  Copy LaTeX formulas when copying text on Zhihu.
// @author       YuhangChen(github.com/yuhangchen0)
// @match        https://www.zhihu.com/*
// @match        https://zhuanlan.zhihu.com/p/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Style for highlighting selected formulas
    const highlightStyle = 'background-color: lightblue;';

    document.addEventListener('copy', function(event) {
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
            event.preventDefault();
        }
    });

    // When selection changes, check if any formula is selected
    document.addEventListener('selectionchange', function() {
        const allFormulas = document.querySelectorAll('.ztext-math');
        allFormulas.forEach(formula => {
            formula.removeAttribute('style'); // Clear previous highlights
        });

        const sel = window.getSelection();
        if (sel.rangeCount) {
            for (let i = 0; i < sel.rangeCount; i++) {
                const range = sel.getRangeAt(i);
                const selectedFormulas = range.cloneContents().querySelectorAll('.ztext-math');
                selectedFormulas.forEach(selectedFormula => {
                    allFormulas.forEach(pageFormula => {
                        if (selectedFormula.getAttribute('data-tex') === pageFormula.getAttribute('data-tex') && selectedFormula.isEqualNode(pageFormula)) {
                            pageFormula.setAttribute('style', highlightStyle);
                        }
                    });
                });
            }
        }
    });

    function convertLineBreaks(node) {
        if (node.nodeName === 'BR') {
            node.parentNode.replaceChild(document.createTextNode('\n'), node);
        } else if (node.nodeName === 'P' && node.nextElementSibling) {
            // Add a newline after the section
            node.appendChild(document.createTextNode('\n\n'));
        } else {
            const children = Array.from(node.childNodes);
            for (let child of children) {
                convertLineBreaks(child);
            }
        }
    }

    function getSelectionHtml() {
        const sel = window.getSelection();
        if (sel.rangeCount) {
            const container = document.createElement('div');
            for (let i = 0, len = sel.rangeCount; i < len; ++i) {
                container.appendChild(sel.getRangeAt(i).cloneContents());
            }

            // Keep newline
            convertLineBreaks(container);

            return container.innerHTML;
        }
        return '';
    }
})();