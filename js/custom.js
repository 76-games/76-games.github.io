// Create and insert the async Funding Choices script
const fundingScript = document.createElement('script');
fundingScript.async = true;
fundingScript.src = "https://fundingchoicesmessages.google.com/i/pub-9427048641572074?ers=1";
fundingScript.setAttribute("nonce", "7M3TLdpr6ws84KtZqprB7Q");
document.head.appendChild(fundingScript);

// Create and insert the inline script
const inlineScript = document.createElement('script');
inlineScript.setAttribute("nonce", "7M3TLdpr6ws84KtZqprB7Q");
inlineScript.textContent = `
(function() {
  function signalGooglefcPresent() {
    if (!window.frames['googlefcPresent']) {
      if (document.body) {
        const iframe = document.createElement('iframe');
        iframe.style = 'width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px;';
        iframe.style.display = 'none';
        iframe.name = 'googlefcPresent';
        document.body.appendChild(iframe);
      } else {
        setTimeout(signalGooglefcPresent, 0);
      }
    }
  }
  signalGooglefcPresent();
})();
`;
document.head.appendChild(inlineScript);



(function() {
  // Create and append <link rel="dns-prefetch">
  var link = document.createElement("link");
  link.rel = "dns-prefetch";
  link.href = "https://universal.wgplayer.com";
  document.head.appendChild(link);

  // Create and append the Weegoo script dynamically
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.async = true;
  script.fetchPriority = 'high';
  script.src = "https://universal.wgplayer.com/tag/?lh=" +
    window.location.hostname +
    "&wp=" + encodeURIComponent(window.location.pathname) +
    "&ws=" + encodeURIComponent(window.location.search);

  var firstScript = document.getElementsByTagName("script")[0];
  firstScript.parentNode.insertBefore(script, firstScript);
})();



/*
Custom script

This file will not be overwritten by the updater
*/
(function() {
  var script = document.createElement('script');
  script.src = "https://analytics.ahrefs.com/analytics.js";
  script.setAttribute("data-key", "VSHMRhCtO2mqqIzel7qJAg");
  script.async = true;
  document.head.appendChild(script);
})();


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

// Detect mobile (unchanged)
function isMobileDevice() {
    return window.matchMedia("(max-width: 767px)").matches || /Mobi|Android/i.test(navigator.userAgent);
}

$(window).on('load', function () {
    // Add manifest (from root!)
    const manifestLink = document.createElement('link');
    manifestLink.rel = 'manifest';
    manifestLink.href = '/manifest.json';
    document.head.appendChild(manifestLink);

    // Register Service Worker (root scope)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/js/service-worker.js', { scope: '/' })
            .then(function(registration) {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }).catch(function(error) {
                console.log('ServiceWorker registration failed: ', error);
            });
    }

    let deferredPrompt;

    if (!window.matchMedia('(display-mode: standalone)').matches && !isMobileDevice() && !localStorage.getItem('pwaInstalled')) {
        const popupHTML = `
            <div id="pwa-popup" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(255,255,255,0.8); color: #333; text-align: center; z-index: 1000; display: none; align-items: center; justify-content: center;">
                <div style="padding: 25px; background: #f5f5f5; border-radius: 20px; width: 90%; max-width: 450px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); text-align: center;">
                    <h2 style="font-size: 22px; margin-bottom: 15px; color: #2c3e50;">Install Our App for a Faster, Seamless Experience!</h2>
                    <button id="install-button" style="padding: 12px 28px; font-size: 18px; cursor: pointer; background: #7f2525; color: white; border: none; border-radius: 30px;">Add to Home Screen</button>
                    <button id="close-popup" style="padding: 12px 28px; font-size: 18px; cursor: pointer; background-color: transparent; color: #888; border: none; border-radius: 30px;">Not Now</button>
                </div>
            </div>
        `;
        $('body').append(popupHTML);

        const popup = document.getElementById('pwa-popup');
        const installButton = document.getElementById('install-button');
        const closePopupButton = document.getElementById('close-popup');

        window.addEventListener('beforeinstallprompt', (e) => {
            console.log('beforeinstallprompt fired');
            e.preventDefault();
            deferredPrompt = e;
            popup.style.display = 'flex';
        });

        installButton.addEventListener('click', () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        localStorage.setItem('pwaInstalled', 'true');
                    }
                    popup.style.display = 'none';
                });
            }
        });

        closePopupButton.addEventListener('click', () => {
            popup.style.display = 'none';
        });

        window.addEventListener('appinstalled', () => {
            localStorage.setItem('pwaInstalled', 'true');
            console.log('PWA installed');
        });
    }
});

