
const params = new URLSearchParams(window.location.search);

if (params.has("url")) {
  const url = params.get("url");
  document.querySelector("#blockedurl").innerHTML =
    "<a href=\"" + url + "\">" + url + "</a>";
}
