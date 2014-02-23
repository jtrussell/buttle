# buttle

Simple static file (+ markdown) server.

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
