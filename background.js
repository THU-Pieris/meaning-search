function openMeaningSearch(text) {
  const t = (text || "").trim();
  if (!t) return;
  const q = "meaning of " + t;
  chrome.tabs.create({ url: "https://www.google.com/search?q=" + encodeURIComponent(q) });
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "meaning-search",
    title: 'Search meaning of "%s"',
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === "meaning-search" && info.selectionText) {
    openMeaningSearch(info.selectionText);
  }
});
