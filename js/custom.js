/*
Custom script

This file will not be overwritten by the updater
*/

// JavaScript code for search functionality
function search_animal() {
  let input = document.getElementById("searchbar").value;
  input = input.toLowerCase();
  let x = document.getElementsByClassName("animals");

  for (let i = 0; i < x.length; i++) {
    if (!x[i].innerHTML.toLowerCase().includes(input)) {
      x[i].style.display = "none";
    } else {
      x[i].style.display = "block";
    }
  }
}

// Google Analytics (Updated)
(function() {
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-R67D1PW8H5';
  document.head.appendChild(script);

  script.onload = function() {
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-R67D1PW8H5');
  };
})();

// Function to detect if it's a mobile device
function isMobileDevice() {
    return window.matchMedia("(max-width: 767px)").matches || /Mobi|Android/i.test(navigator.userAgent);
}

// PWA Code with Analytics Tracking
$(window).on('load', function () {
    // Dynamically add the manifest link with scope
    const manifestLink = document.createElement('link');
    manifestLink.rel = 'manifest';
    manifestLink.href = '/manifest.json';
    manifestLink.setAttribute('scope', '/');
    document.head.appendChild(manifestLink);

    // Register Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }).catch(function(error) {
                console.log('ServiceWorker registration failed: ', error);
            });
    }

    let deferredPrompt;
    const isPwaInstalled = localStorage.getItem('pwaInstalled');

    if (!isPwaInstalled && !isMobileDevice()) {
        const popupHTML = `
            <div id="pwa-popup" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(255,255,255,0.8); color: #333; text-align: center; z-index: 1000; display: flex; align-items: center; justify-content: center;">
                <div style="padding: 25px; background: #f5f5f5; border-radius: 20px; width: 90%; max-width: 450px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); text-align: center;">
                    <h2 style="font-size: 22px; margin-bottom: 15px; color: #2c3e50;">Hey there! 👋</h2>
                    <p style="font-size: 16px; color: #444; margin-bottom: 25px; font-weight: bold; color: #ff7f50;">
                        Don't Miss Out - <span style="color: #ff4500;">Install Our</span> Desktop App!
                    </p>
                    <button id="install-button" aria-label="Install the app" style="padding: 12px 28px; font-size: 18px; cursor: pointer; background: #7f2525; color: white; border: none; border-radius: 30px; margin-right: 10px;">
                        <i class="fas fa-download" style="margin-right: 10px;"></i>Add to Home Screen
                    </button>
                    <button id="close-popup" aria-label="Close the popup" style="padding: 12px 28px; font-size: 18px; cursor: pointer; background-color: transparent; color: #888; border: none; border-radius: 30px;">
                        Not Now
                    </button>
                </div>
            </div>
        `;
        $('body').append(popupHTML);

        const popup = document.getElementById('pwa-popup');
        const installButton = document.getElementById('install-button');
        const closePopupButton = document.getElementById('close-popup');

        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            popup.style.display = 'flex';

            gtag('event', 'pwa_install_prompt_shown', {
              'event_category': 'PWA',
              'event_label': 'PWA Install Prompt'
            });
        });

        installButton.addEventListener('click', () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        gtag('event', 'pwa_installed', {
                          'event_category': 'PWA',
                          'event_label': 'PWA Installed'
                        });
                    } else {
                        gtag('event', 'pwa_install_dismissed', {
                          'event_category': 'PWA',
                          'event_label': 'PWA Install Dismissed'
                        });
                    }
                    popup.style.display = 'none';
                });
            }
        });

        closePopupButton.addEventListener('click', () => {
            popup.style.display = 'none';
            gtag('event', 'pwa_popup_closed', {
              'event_category': 'PWA',
              'event_label': 'PWA Popup Closed'
            });
        });
    }
});
