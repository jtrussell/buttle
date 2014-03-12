# buttle

Simple static file (+ markdown) server.

## goal

Another static file server? Why buttle? Well... if you came here looking for a
blazing fast server of static files, something with caching and compression
options then you're in luck, [that does exist][1]! It just isn't buttle.

Buttle is tailored for use in *development*. It has baked in live reloading for
html and markdown files. It'll on-the-fly convert your LESS filess to CSS... and
cache nothing because it assumes you're actively hacking away. With buttle you
can test drive that angular app you just cloned or maybe have your test runner
page refresh whenever a source file is changed.


## get it

```
npm install -g buttle
```


## usage

```
buttle
```

Now you're serving files from your current working directory.


## super advanced usage

Use your favorite port:

```
buttle --port [your favorite port]
```

Disable automatic directory listing:

```
buttle --nodir
```

Live reload your html and markdown pages whenever watched files change:

```
buttle --watch **/*.md
```

Open files on server startup:

```
buttle --open index.html
```

Set automatic index file names:

```
buttle --index foo.html,bar.html
```

## other fancy features

### on the fly less conversion

Requests for `styles/main.css` will also find `styles/main.less` if the vanilla
CSS file does not exist.

### basic `php` support

Buttle will happily serve up your `.php` files, just make sure the `php`
executable is in your path.

### read .buttlerc for options

It's can be a pain to specify the same config options over and over. Place a
JSON file named `.buttlerc` in the directory your run `buttle` from:

```javascript
{
  "port": 9000,
  "open": "README.md",
  "watch": "*.md"
}
```


## changelog

- v0.0.7 Add "index" detection
- v0.0.6 Read .buttlerc for options if it exists
- v0.0.5 Add support for opening files on server startup
- v0.0.4 Add ability to list directory contents


## license

MIT

[1]: https://github.com/isaacs/st "Production ready static file server"
