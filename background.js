chrome.commands.onCommand.addListener((command) => {
  if (command === "open-extension-popup") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      const url = activeTab.url;
      
      // Execute a script in the tab to copy to clipboard
      chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        func: (text) => {
          navigator.clipboard.writeText(text)
            .then(() => {
              console.log("URL copied to clipboard");
            })
            .catch((error) => {
              console.error("Error copying URL to clipboard:", error);
            });
        },
        args: [url]
      });
    });
  }
});
