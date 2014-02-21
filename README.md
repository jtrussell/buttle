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


## other fancy features

### on the fly less conversion

Requests for `styles/main.css` will also find `styles/main.less` if the vanilla
CSS file does not exist.


## changelog

- v0.0.5 Add support for opening files on server startup
- v0.0.4 Add ability to list directory contents


## license

MIT
