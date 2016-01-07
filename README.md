# Introduction

t.co Remove is a Chrome browser extension to that removes t.co links on twitter.com and replaces them with their original URLs (if the original URL is available).

Why remove t.co links? Because t.co links are slow, crappy, redundant and unnecessary.

![](http://i.imgur.com/fz6N8Mk.jpg)

## Install

1. Either (A) download and unzip the files or (B) clone this repository where you want to store this extension:

```
$ cd ~/Downloads/
$ git clone git@github.com:jonsuh/tco-remove.git
```

2. Chrome Preferences > Extensions (Make sure *Developer mode* is checked at the top right)
3. Select *Load unpacked extension...*, then navigate to and select the directory of where you unzipped/cloned this repository.

## Details

- This extension should replace most but not *all* t.co links—it only replaces ones where the data of the original URL is available in the markup (e.g. `<a href="https://t.co/blahblah" data-extended-url="http://original-url.com">`)
- This extension runs in the background and only executes in tabs open to twitter.com.
- It runs every 3 seconds and only replaces new t.co links that haven’t already been changed (i.e. when you first load twitter.com, navigate to a new page, open a modal, load more tweets, etc.)
- The permissions for this extension is listed as being able to “*Read and change your data on twitter.com*“ but none of your data is being read, stored, sent or otherwise by me or anyone else. If you’re curious or skeptical, see the `background.js` to see what’s happening under the hood.

## Todos

- Options page to customize the polling interval
- Toolbar button to toggle extension on and off
- Submit to the Chrome Web Store

## License

The MIT License (MIT)

Copyright (c) 2016 Jonathan Suh

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
