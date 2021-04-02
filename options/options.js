
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
      },
      // no prior config...
      (e) => { }
    );
}

function saveOptions() {
  // Parse from form...
  let blockedList =
    document.querySelector("#blockedta").value.trim().split("\n");
  let start =
    parseInt(document.querySelector("#starthour").value);
  let end =
    parseInt(document.querySelector("#endhour").value);

  // Save
  let config = {
    blockedList,
    schedule: { start, end }
  };
  browser.storage.local.set({config})
    .then(() => {}, (e) => { console.log(error); });

  console.log("saved config: ");
  console.log(config);
}

document.addEventListener('DOMContentLoaded', loadOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
