// ==UserScript==
// @name         FormulaCopier
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Copy LaTeX formulas when copying text on Zhihu and Wikipedia.
// @author       Yuhang Chen(github.com/yuhangchen0)
// @match        https://www.zhihu.com/*
// @match        https://zhuanlan.zhihu.com/p/*
// @match        https://*.wikipedia.org/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.addEventListener('copy', function(event) {
        let selectedHtml = getSelectionHtml();

        if (window.location.hostname.includes('zhihu.com')) {
            handleZhihu(selectedHtml, event);
        } else if (window.location.hostname.includes('wikipedia.org')) {
            handleWiki(selectedHtml, event);
        }
    });

    document.addEventListener('selectionchange', function() {
        const allFormulas = document.querySelectorAll('.ztext-math');
        allFormulas.forEach(formula => removeHighlightStyle(formula));

        const sel = window.getSelection();
        if (sel.rangeCount) {
            for (let i = 0; i < sel.rangeCount; i++) {
                const range = sel.getRangeAt(i);
                const selectedFormulas = range.cloneContents().querySelectorAll('.ztext-math');
                selectedFormulas.forEach(selectedFormula => {
                    allFormulas.forEach(pageFormula => {
                        if (selectedFormula.getAttribute('data-tex') === pageFormula.getAttribute('data-tex')) {
                            applyHighlightStyle(pageFormula);
                        }
                    });
                });
            }
        }
    });

    function handleZhihu(selectedHtml, event) {
        if (selectedHtml.includes('data-tex')) {
            const container = document.createElement('div');
            container.innerHTML = selectedHtml;
            replaceZhihuFormulas(container, '.ztext-math', 'data-tex');
            setClipboardData(event, container.textContent);
        }
    }

    function handleWiki(selectedHtml, event) {
        if (selectedHtml.includes('mwe-math-element')) {
            const container = document.createElement('div');
            container.innerHTML = selectedHtml;
            replaceWikipediaFormulas(container);
            setClipboardData(event, container.textContent);
        }
    }

    function applyHighlightStyle(formula) {
        const mathJaxSVG = formula.querySelector('.MathJax_SVG');
        if (mathJaxSVG) {
            mathJaxSVG.style.backgroundColor = 'lightblue';
        }
    }

    function removeHighlightStyle(formula) {
        const mathJaxSVG = formula.querySelector('.MathJax_SVG');
        if (mathJaxSVG && mathJaxSVG.style) {
            mathJaxSVG.style.backgroundColor = '';
        }
    }

    function replaceWikipediaFormulas(container) {
        const formulas = container.querySelectorAll('.mwe-math-element');
        formulas.forEach(formula => {
            const annotation = formula.querySelector('annotation[encoding="application/x-tex"]');
            if (annotation) {
                const texCode = annotation.textContent;
                const texNode = document.createTextNode('$' + texCode + '$');
                formula.replaceWith(texNode);
            }
        });
    }

    function replaceZhihuFormulas(container, selector, attribute) {
        const formulas = container.querySelectorAll(selector);
        formulas.forEach(formula => {
            const texCode = formula.getAttribute(attribute);
            const texNode = document.createTextNode('$' + texCode + '$');
            formula.replaceWith(texNode);
        });
    }


    function setClipboardData(event, text) {
        event.clipboardData.setData('text/plain', text);
        event.preventDefault();
    }

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