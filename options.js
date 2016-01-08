var _defaultInterval = 3000;

function saveOptions() {
  var interval = document.getElementById("interval");
  var value = parseInt(interval.value, 10);
  var valid = true;

  if (isNaN(value) || value <= 0) {
    value = _defaultInterval;
    valid = false;
  }

  var options = {};
  options.interval = value;

  chrome.storage.sync.set(options, function() {
    interval.value = value;

    var submit = document.getElementById("submit");

    if (valid) {
      submit.setAttribute("placeholder", submit.innerHTML);
      submit.innerHTML = "✓ Saved!";
      submit.setAttribute("disabled", "disabled");

      setTimeout(function() {
        submit.innerHTML = submit.getAttribute("placeholder");
        submit.removeAttribute("disabled");
      }, 1000);
    }
  });
}

function getOptions() {
  var options = {};
  options.interval = _defaultInterval;

  chrome.storage.sync.get(options, function(options) {
    document.getElementById("interval").value = options.interval;
  });
}

document.addEventListener("DOMContentLoaded", getOptions);
document.getElementById("submit").addEventListener("click", saveOptions);
document.getElementById("form").addEventListener("submit", function(event) {
  event.preventDefault();
});
