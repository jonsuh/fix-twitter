var _defaultInterval  = 3000;
var _defaultTco       = true;
var _defaultReplies   = true;
var _defaultOldSchool = false;
var _defaultIcym      = false;

var elInterval  = document.getElementById("interval");
var elTco       = document.getElementById("tco");
var elReplies   = document.getElementById("replies");
var elOldSchool = document.getElementById("old_school");
var elIcym      = document.getElementById("icym");

var elSubmit = document.getElementById("submit");

function saveOptions() {
  var interval = elInterval;
  var intervalValue = parseInt(interval.value, 10);
  var valid = true;

  if (isNaN(intervalValue) || intervalValue <= 0) {
    intervalValue = _defaultInterval;
    valid = false;
  }

  var tco = elTco;
  var tcoChecked = tco.checked;

  var replies = elReplies;
  var repliesChecked = replies.checked;

  var oldSchool = elOldSchool;
  var oldSchoolChecked = oldSchool.checked;

  var icym = elIcym;
  var icymChecked = icym.checked;

  var options = {
    interval : intervalValue,
    tco      : tcoChecked,
    replies  : repliesChecked,
    oldSchool: oldSchoolChecked,
    icym     : icymChecked
  };

  chrome.storage.sync.set(options, function() {
    interval.value    = intervalValue;
    tco.checked       = tcoChecked;
    replies.checked   = repliesChecked;
    oldSchool.checked = oldSchoolChecked;
    icym.checked      = icymChecked;

    var submit = elSubmit;

    if (valid) {
      submit.setAttribute("placeholder", submit.innerHTML);
      submit.innerHTML = "✓ Saved!";
      submit.setAttribute("disabled", "disabled");

      setTimeout(function() {
        submit.innerHTML = submit.getAttribute("placeholder");
        submit.removeAttribute("disabled");
      }, 3000);
    }
  });
}

function getOptions() {
  var options = {
    interval : _defaultInterval,
    tco      : _defaultTco,
    replies  : _defaultReplies,
    oldSchool: _defaultOldSchool,
    icym     : _defaultIcym
  };

  chrome.storage.sync.get(options, function(options) {
    elInterval.value    = options.interval;
    elTco.checked       = options.tco;
    elReplies.checked   = options.replies;
    elOldSchool.checked = options.oldSchool;
    elIcym.checked      = options.icym;

    if (options.replies === false) {
      elOldSchool.setAttribute("disabled", "disabled");
    }

    elReplies.addEventListener("change", function(event) {
      if (this.checked === true) {
        elOldSchool.removeAttribute("disabled");
      }
      else {
        elOldSchool.setAttribute("disabled", "disabled");
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", getOptions);
elSubmit.addEventListener("click", saveOptions);
document.getElementById("form").addEventListener("submit", function(event) {
  event.preventDefault();
});
