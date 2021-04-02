// This is where the magic happens!

// Will contain the config for the plugin... always synced with local storage.
let config = {
  blockedList: [],
  schedule: {
    start: 0, // starting hour
    end: 12 + 6 // ending hour
  }
};

// Checks what to do and maybe cancels the request.
function blockPage (details) {
  console.log(details.url);

  function isScheduleBlocked(schedule) {
    const h = (new Date()).getHours();
    return schedule.start <= h && h < schedule.end;
  }

  function isInBlockList(blockList, url) {
    return blockList.some(blocked => url.match(blocked));
  }

  if (isScheduleBlocked(config.schedule)
        && isInBlockList(config.blockedList, details.url))
  {
    const blockedUrl = browser.runtime.getURL("blocked.html");

    console.log("Blocking!");
    return { redirectUrl: blockedUrl };
  } else {
    return {};
  }
};

///////////////////////////////////////////////////////////////////////////////
// Action!

// Read the config from local storage.
browser.storage.local.get("config")
  .then(
    // success!
    (c) => { Object.assign(config, c.config); },
    // no prior config...
    (e) => { }
  );

// Register a listener on config changes.
browser.storage.onChanged.addListener((changes, area) => {
  config = changes.config.newValue;
  console.log("updated config.");
});

// Register a listener on requests to load a new top-level page.
console.log("register request listener...");
browser.webRequest.onBeforeRequest.addListener(
  blockPage,
  {
    urls: ['*://*/*'],
    types: ["main_frame", "sub_frame"]
  },
  ["blocking"]
);
