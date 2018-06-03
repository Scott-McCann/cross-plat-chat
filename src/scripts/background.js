const system = getSystem();
const targetUrl = 'https://www.twitch.tv/' + STREAMER;

// Shows icon as active only when on https://www.twitch.tv/sirslaw
if(system.declarativeContent){
  system.runtime.onInstalled.addListener(function() {
    system.declarativeContent.onPageChanged.removeRules(undefined, function() {
      system.declarativeContent.onPageChanged.addRules([{
        conditions: [
          new system.declarativeContent.PageStateMatcher({
            // TODO Revise for use with multiple services
            pageUrl: { urlContains: targetUrl },
          })
        ],
        actions: [ new system.declarativeContent.ShowPageAction() ]
      }]);
    });
  });
} else {
  function initializePageAction(tab) {
    if(tab.url.includes(targetUrl)){
        system.pageAction.show(tab.id);
    }
  }

  system.tabs.onUpdated.addListener((id, changeInfo, tab) => {
    initializePageAction(tab);
  });
}

system.webNavigation.onHistoryStateUpdated.addListener(
  e => { system.tabs.sendMessage( e.tabId, {action: "contextChange", context: getContext(e.url)} ); }
);

system.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if(sender.id === system.runtime.id) {
    switch(message.action) {
      default:
        //do nothing;
        // Use this are if we need parts (content vs background vs config) to talk to each other
    }
  }
});
