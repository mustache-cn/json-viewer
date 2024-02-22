chrome.webNavigation.onCompleted.addListener(
  (details) => {
    chrome.scripting.executeScript({
      target: { tabId: details.tabId },
      files: ["/content-script/content-script.js"],
    });
  },
  { url: [{ schemes: ["http", "https"] }] }
);
