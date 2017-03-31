/**
  * t.co Remove
  *
  * Chrome extension to remove t.co links on Twitter and Tweetdeck and replace them with their original URLs.
  * Why remove t.co links? Because t.co links are slow, crappy, redundant and unnecessary.
  *
  * https://github.com/jonsuh/tco-remove/
  * Copyright (c) 2016 Jonathan Suh <hello@jonsuh.com>
  */

var FT = (function() {
  "use strict";

  /**
   * forEach implementation for Objects/NodeLists/Arrays, automatic type loops and context options
   *
   * @private
   * @author Todd Motto
   * @link https://github.com/toddmotto/foreach
   * @param {Array|Object|NodeList} collection - Collection of items to iterate, could be an Array, Object or NodeList
   * @callback requestCallback      callback   - Callback function for each iteration.
   * @param {Array|Object|NodeList} scope=null - Object/NodeList/Array that forEach is iterating over, to use as the this value when executing callback.
   * @returns {}
   */
  var forEach = function (collection, callback, scope) {
    if (Object.prototype.toString.call(collection) === "[object Object]") {
      for (var prop in collection) {
        if (Object.prototype.hasOwnProperty.call(collection, prop)) {
          callback.call(scope, collection[prop], prop, collection);
        }
      }
    } else {
      for (var i = 0, len = collection.length; i < len; i++) {
        callback.call(scope, collection[i], i, collection);
      }
    }
  };

  /**
   * Initializes the app
   * Gets the polling interval in milliseconds (default: 3000)
   * Then run start()
   *
   * @public
   */
  var init = function() {
    // Get polling interval. Set default of 3000 if not set
    chrome.storage.sync.get({
      interval: 3000,
      tco     : true,
      replies : true
    }, function(data) {
      start(data);
    });
  };

  /**
   * Starts and polls based on interval
   *
   @param {Interval} interval - polling interval in milliseconds
   *
   * @private
   */
  var start = function(data) {
    if (data.tco === true || data.replies === true) {
      function justDoIt() {
        if (data.tco === true) {
          tcoRemove();
        }

        if (data.replies === true) {
          repliesShow();
        }
      }

      // First run
      justDoIt();

      // Continously poll
      setInterval(function() {
        // justDoIt();
      }, data.interval);
    }
  };
  /**
    * Searches for tweets with “hidden” list of people replying to and appends them to the tweet
   */

  var repliesShow = function() {
    var replies = document.querySelectorAll(".ReplyingToContextBelowAuthor, .other-replies");

    if (replies.length > 0) {
      forEach(replies, function(reply) {
        // Get list of people replying to, remove (“Replying to”) and trim whitespace
        var peopleHtml = reply.innerHTML.trim().replace(/\s+/g, " ").replace(/Replying to/g, "") + " ";

        // Find .tweet-text (if Twitter.com) or .tweet-text
        var tweetClass = ".tweet-text";
        var replyParentNode;

        // If Twitter
        if (reply.classList.contains("ReplyingToContextBelowAuthor")) {
          replyParentNode = reply.parentNode;
        }
        // If TweetDeck
        else if (reply.classList.contains("other-replies")) {
          replyParentNode = reply.parentNode.parentNode;

          // For quoted tweets
          if (replyParentNode.classList.contains("js-reply-info-container")) {
            replyParentNode = replyParentNode.parentNode;

            tweetClass = ".js-quoted-tweet-text";
          }
        }

        // Append peopleHtml to tweet
        replyParentNode.querySelector(tweetClass).insertAdjacentHTML("afterbegin", peopleHtml);

        // Remove reply node from DOM
        reply.remove();
      });
    }
  };

  /**
   * Searches the page for t.co links and replaces them with their original URLs (if available)
   *
   * @private
   */
  var tcoRemove = function() {
    // Search the page for unmodified Twitter timeline and Tweetdeck links
    var links = document.querySelectorAll(".twitter-timeline-link:not([data-tco-removed]), a[data-full-url]:not([data-tco-removed])");

    // Make sure that there are one or more links found
    if (links.length > 0) {
      var linkChanged;

      forEach(links, function(link) {
        linkChanged = false;
        // If the link has attribute `data-expanded-url`,
        // replace the t.co link with the value of `data-expanded-url`
        if (link.hasAttribute("data-expanded-url")) {
          link.href = link.getAttribute("data-expanded-url");
          linkChanged = true;
        }
        // If link has attribute `data-full-url` (Tweetdeck support),
        // replace the t.co link with the value of `data-full-url`
        else if (link.hasAttribute("data-full-url")) {
          link.href = link.getAttribute("data-full-url");
          linkChanged = true;
        }
        else {
          // Get the inner HTML of the link
          var linkHTML = link.innerHTML;

          // If the inner HTML starts with "pic.twitter.com/",
          // replace the t.co link with the pic.twitter.com link
          if (linkHTML.substring(0, 16) === "pic.twitter.com/") {
            link.href = window.location.protocol + "//" + linkHTML;
            linkChanged = true;
          }
        }

        // Mark the link as being changed (so it doesn’t get picked up when the script runs again)
        if (linkChanged === true) {
          tcoMarkChanged(link);
        }
      });
    }
  };

  /**
   * Marks link as being changed by adding attribute `data-tco-removed`
   *
   * @private
   * @el {Element} The link element
   */
  var tcoMarkChanged = function(el) {
    el.setAttribute("data-tco-removed", "");
  };

  /**
   * Expose public methods
   */
  return {
    init: init
  };
})();

FT.init();
