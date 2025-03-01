/**
 * LinkedIn Video Blocker
 * 
 * Dieses Content-Script identifiziert und entfernt Videoposts aus dem LinkedIn-Feed
 */

// Globaler Status
let blockerEnabled = false;

// Initialisierung
function init() {
  // Lade gespeicherten Status
  chrome.storage.sync.get(['blockerEnabled'], function(result) {
    blockerEnabled = result.blockerEnabled || false;
    if (blockerEnabled) {
      processExistingVideos();
      startObserving();
    }
  });

  // Höre auf Nachrichten vom Popup
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'toggleBlocker') {
      blockerEnabled = request.enabled;
      
      if (blockerEnabled) {
        processExistingVideos();
        startObserving();
      } else {
        stopObserving();
        showAllPosts(); // Zeige alle Posts wieder an, wenn der Blocker deaktiviert wird
      }
      
      sendResponse({status: 'success'});
    }
    return true;
  });
}

// MutationObserver für dynamisch geladene Inhalte
let observer = null;

function startObserving() {
  if (observer) return;
  
  observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes && mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach(function(node) {
          // Prüfe nur Element-Knoten
          if (node.nodeType === Node.ELEMENT_NODE) {
            // Prüfe auf Feed-Posts
            if (node.matches('div[data-urn^="urn:li:activity"]')) {
              checkForVideos(node);
            } else {
              const posts = node.querySelectorAll('div[data-urn^="urn:li:activity"]');
              posts.forEach(post => checkForVideos(post));
            }
          }
        });
      }
    });
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false,
    characterData: false
  });
}

function stopObserving() {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
}

// Verarbeite bereits vorhandene Videos beim Aktivieren
function processExistingVideos() {
  // Suche nach allen Feed-Posts
  const feedPosts = document.querySelectorAll('div[data-urn^="urn:li:activity"]');
  feedPosts.forEach(function(post) {
    checkForVideos(post);
  });
}

// Überprüfe einen Post auf Videos
function checkForVideos(node) {
  if (!blockerEnabled) return;
  
  // Verschiedene Methoden zur Videodetektion
  const isVideo = 
    // 1. Suche nach Video-Tags
    node.querySelector('video') || 
    // 2. Suche nach Video-Containern
    node.querySelector('.video-player__container') ||
    node.querySelector('div[data-id^="video-urn"]') ||
    // 3. Suche nach Zeitanzeigen (typisch für Videos)
    node.querySelector('.video-duration') ||
    // 4. Prüfe auf Video-Posts
    node.querySelector('.feed-shared-update-v2__content:has(video)') ||
    // 5. Suche nach Video-Vorschaubildern
    node.querySelector('img[data-test-feed-video-thumbnail]') ||
    // 6. Prüfe auf typische Video-Texte
    (node.innerText && /\d+:\d+ \/ \d+:\d+/.test(node.innerText));
  
  if (isVideo) {
    hidePost(node);
  }
}

// Verstecke einen Post mit Video
function hidePost(postNode) {
  postNode.style.display = 'none';
  postNode.classList.add('linkedin-video-post-hidden');
}

// Zeige alle versteckten Posts wieder an
function showAllPosts() {
  const hiddenPosts = document.querySelectorAll('.linkedin-video-post-hidden');
  hiddenPosts.forEach(post => {
    post.style.display = '';
    post.classList.remove('linkedin-video-post-hidden');
  });
}

// Starte die Initialisierung, wenn das DOM geladen ist
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
