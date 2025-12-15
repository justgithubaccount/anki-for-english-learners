const OFFSCREEN_URL = 'bg/background.html';
const OFFSCREEN_REASON = chrome.offscreen.Reason.DOM_PARSER;

async function ensureOffscreenDocument() {
  if (!chrome.offscreen) return;
  const hasDocument = await chrome.offscreen.hasDocument?.();
  if (hasDocument) return;

  await chrome.offscreen.createDocument({
    url: OFFSCREEN_URL,
    reasons: [OFFSCREEN_REASON],
    justification: 'Runs background logic and sandboxed dictionary scripts.'
  });
}

chrome.runtime.onInstalled.addListener(() => {
  ensureOffscreenDocument();
});

chrome.runtime.onStartup.addListener(() => {
  ensureOffscreenDocument();
});

ensureOffscreenDocument();
