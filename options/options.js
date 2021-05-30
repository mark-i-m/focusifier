
function exceptionToStr(e) {
  return e.regex + ", " + e.day + ", " + e.start + ", " + e.end;
}

function loadOptions() {
  browser.storage.local.get("config")
    .then(
      // success!
      (item) => {
        let configStr = item.config.blockedList.join("\n");
        document.querySelector("#blockedta").value = configStr;

        let startHour = item.config.schedule.start;
        document.querySelector("#starthour").value = startHour;
        let endHour = item.config.schedule.end;
        document.querySelector("#endhour").value = endHour;

        let exceptionStr = item.config.exceptionList
          .map(exceptionToStr).join("\n");
        document.querySelector("#exceptionsta").value = exceptionStr;
      },
      // no prior config...
      (e) => { }
    );
}

function parseExceptionStr(exceptionStr) {
  let exception = {
    regex: null,
    day: 0,
    start: 0,
    end: 0,
  };

  const parts = exceptionStr.split(",");
  exception.regex = parts[0];
  exception.day = parseInt(parts[1]);
  exception.start = parseInt(parts[2]);
  exception.end = parseInt(parts[3]);

  return exception;
}

function saveOptions() {
  // Parse from form...
  let blockedList =
    document.querySelector("#blockedta").value.trim().split("\n");
  let start =
    parseInt(document.querySelector("#starthour").value);
  let end =
    parseInt(document.querySelector("#endhour").value);
  let exceptionList =
    document.querySelector("#exceptionsta")
      .value.trim().split("\n").map(parseExceptionStr);

  // Save
  let config = {
    blockedList,
    schedule: { start, end },
    exceptionList
  };
  browser.storage.local.set({config})
    .then(() => {}, (e) => { console.log(error); });

  console.log("saved config: ");
  console.log(config);
}

document.addEventListener('DOMContentLoaded', loadOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
