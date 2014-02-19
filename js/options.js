// Saves options to localStorage.
function save_options() {
  var topbanneron = document.getElementById("topbanneron").checked;
  localStorage["enable_top_banner"] = topbanneron;

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  var favorite = localStorage["enable_top_banner"];
  if (!favorite) {
    return;
  }
  document.getElementById("topbanneron").checked = JSON.parse(favorite);
}
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);