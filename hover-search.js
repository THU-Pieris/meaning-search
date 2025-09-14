// Listens for right-clicks on words to trigger a meaning search
// without requiring text selection.
document.addEventListener('contextmenu', (event) => {
  const sel = window.getSelection();
  if (sel && sel.toString().trim()) {
    // Let the existing selection handler take over.
    return;
  }

  const range = document.caretRangeFromPoint?.(event.clientX, event.clientY);
  if (!range || !range.startContainer || range.startContainer.nodeType !== Node.TEXT_NODE) {
    return;
  }

  const text = range.startContainer.textContent;
  const offset = range.startOffset;
  const before = text.slice(0, offset).match(/\w+$/);
  const after = text.slice(offset).match(/^\w+/);
  const word = ((before ? before[0] : '') + (after ? after[0] : '')).trim();

  if (word) {
    chrome.runtime.sendMessage({ action: 'openMeaningSearch', text: word });
    event.preventDefault();
  }
});
