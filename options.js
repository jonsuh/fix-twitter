var _defaultInterval = 3000;
var _defaultTco = true;
var _defaultReplies = true;

function saveOptions() {
  var interval = document.getElementById("interval");
  var intervalValue = parseInt(interval.value, 10);
  var valid = true;

  if (isNaN(intervalValue) || intervalValue <= 0) {
    intervalValue = _defaultInterval;
    valid = false;
  }

  var tco = document.getElementById("tco");
  var tcoChecked = tco.checked;

  var replies = document.getElementById("replies");
  var repliesChecked = replies.checked;

  var options = {};
  options.interval = intervalValue;
  options.tco = tcoChecked;
  options.replies = repliesChecked;

  chrome.storage.sync.set(options, function() {
    interval.value = intervalValue;
    tco.checked = tcoChecked;
    replies.checked = repliesChecked;

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
  options.tco = _defaultTco;
  options.replies = _defaultReplies;

  chrome.storage.sync.get(options, function(options) {
    document.getElementById("interval").value = options.interval;
    document.getElementById("tco").checked = options.tco;
    document.getElementById("replies").checked = options.replies;
  });
}

document.addEventListener("DOMContentLoaded", getOptions);
document.getElementById("submit").addEventListener("click", saveOptions);
document.getElementById("form").addEventListener("submit", function(event) {
  event.preventDefault();
});
