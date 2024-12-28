// ==UserScript==
// @name         Dont fuck my clipboard
// @namespace    https://github.com/KoishiMoe/dont-fxxk-my-clipboard/
// @version      0.2
// @description  Prevents some annoying websites from fucking your clipboard
// @author       KoishiMoe & Gemini
// @downloadURL  https://raw.githubusercontent.com/KoishiMoe/dont-fxxk-my-clipboard/refs/heads/main/dfmc.user.js
// @require      https://cdn.jsdelivr.net/npm/toastify-js
// @resource     toastifyCSS https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css
// @match        *://m.bilibili.com/*
// @match        *://*.lofter.com/*
// @grant        GM_addStyle
// @grant        GM_getResourceText
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle(GM_getResourceText('toastifyCSS'));

    function showToast(message, type = 'success') {
        Toastify({
            text: message,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: type === 'success' ? "linear-gradient(to right, #00b09b, #96c93d)" :
                           type === 'error' ? "#f93154" :
                                              "#f39c12", // warning color
            }
        }).showToast();
    }

    // Method 1: Overriding clipboard methods (more robust)
    const originalClipboard = {
        write: navigator.clipboard.write.bind(navigator.clipboard),
        writeText: navigator.clipboard.writeText.bind(navigator.clipboard)
    };

    navigator.clipboard.write = async function() {
        console.warn('Clipboard write attempt blocked (using write method).');
        showToast('Clipboard write blocked!', 'error');
        return Promise.resolve();
    };

    navigator.clipboard.writeText = async function() {
        console.warn('Clipboard write attempt blocked (using writeText method).');
        showToast('Clipboard write blocked!', 'error');
        return Promise.resolve();
    };

    // Method 2: Overriding document.execCommand (less robust, but catches some cases)
    let originalExecCommand = null;
    try {
        originalExecCommand = document.execCommand;
    } catch (err) {
        console.warn("Could not capture original execCommand:", err);
    }

    document.execCommand = function(command) {
        if (command === 'copy') {
            console.warn('Clipboard copy attempt blocked (using execCommand).');
            showToast('Clipboard copy blocked!', 'error');
            return false;
        }

        // If need to use execCommand for other commands
        if (originalExecCommand) {
            return originalExecCommand.apply(document, arguments);
        } else {
            console.warn("Original execCommand not available. Cannot execute:", command);
            return false;
        }
    };

    // Method 3: Event listener (less robust, but might catch some cases)
    window.addEventListener('beforeunload', function (e) {
        console.warn("Clipboard modified before unload, likely an unwanted attempt. Operation not blocked by this event.");
        // There is almost no possibility to block it at this stage
    });

    window.addEventListener('copy', function (e) {
        e.stopImmediatePropagation(); // Try to stop other listeners
        console.warn("Copy event intercepted. Modification prevented (hopefully).");
        showToast('Copy event intercepted!', 'warning');
    });

    window.addEventListener('cut', function (e) {
        console.warn('Cut event triggered, likely legitimate user action.');
        showToast('Cut event triggered!', 'success');
    });

    console.log('Clipboard protection loaded');
})();