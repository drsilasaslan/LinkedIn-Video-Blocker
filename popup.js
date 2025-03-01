document.addEventListener('DOMContentLoaded', function() {
  const toggleSwitch = document.getElementById('blocker-toggle');
  const statusText = document.getElementById('status-text');

  // Load saved state
  chrome.storage.sync.get(['blockerEnabled'], function(result) {
    toggleSwitch.checked = result.blockerEnabled || false;
    updateStatusText(result.blockerEnabled || false);
  });

  // Handle toggle changes
  toggleSwitch.addEventListener('change', function() {
    const isEnabled = toggleSwitch.checked;
    
    // Save state
    chrome.storage.sync.set({blockerEnabled: isEnabled}, function() {
      updateStatusText(isEnabled);
      
      // Send message to content script
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs[0] && tabs[0].url.includes('linkedin.com')) {
          chrome.tabs.sendMessage(tabs[0].id, {action: 'toggleBlocker', enabled: isEnabled});
        }
      });
    });
  });

  function updateStatusText(isEnabled) {
    statusText.textContent = isEnabled ? 'Aktiv' : 'Inaktiv';
    statusText.style.color = isEnabled ? '#0077B5' : '#666';
  }
});
