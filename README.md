# Introduction

t.co Remove is a Chrome browser extension to that removes t.co links on [Twitter](https://twitter.com) and [Tweetdeck](https://tweetdeck.twitter.com), and replaces them with their original URLs (if the original URL is available).

Why remove t.co links? Because t.co links are slow, crappy, redundant and unnecessary.

![](http://i.imgur.com/fz6N8Mk.jpg)

## Install

t.co Remove is available on the Chrome Web Store: [chrome.google.com/webstore/detail/tco-remove/gnmfhemkaclbeooiklobpejpoihpfnfd](https://chrome.google.com/webstore/detail/tco-remove/gnmfhemkaclbeooiklobpejpoihpfnfd).

However, if you’d like to manually install this extension:

1. Either (A) download and unzip the files or (B) clone this repository where you want to store this extension:

```
cd ~/Downloads/
git clone git@github.com:jonsuh/tco-remove.git
```

2. Chrome Preferences > Extensions (Make sure *Developer mode* is checked at the top right)
3. Select *Load unpacked extension...*, then navigate to and select the directory where you unzipped/cloned this repository.

## Details

- Should replace most but not *all* t.co links—it only replaces ones where the data of the original URL is available in the markup (e.g. `<a href="https://t.co/blahblah" data-extended-url="http://original-url.com">`)
- Runs in the background and only executes in tabs open to [twitter.com](https://twitter.com) or [tweetdeck.twitter.com](https://tweetdeck.twitter.com).
- Runs every 3 seconds (polling interval customizable in extension options) and only replaces new t.co links that haven’t already been changed (i.e. when you first load [twitter.com](https://twitter.com), navigate to a new page, open a modal, load more tweets, etc.)
- Permission is listed as being able to “*Read and change your data on tweetdeck.twitter.com and twitter.com*” but none of your data is being read, stored, sent or otherwise by me or anyone else. If you’re curious or skeptical, see the `background.js` to see what’s happening under the hood.

## Pssst!

If you use Tweetbot 2 for Mac, you can also replace t.co links by running the following in Terminal:

```
defaults write com.tapbots.TweetbotMac OpenURLsDirectly YES
```

## Todos

- ~~Options page to customize the polling interval~~
- Toolbar button to toggle extension on and off
- ~~Submit to the Chrome Web Store~~

You’re welcome!

## License

The MIT License (MIT)

Copyright (c) 2016 Jonathan Suh

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
