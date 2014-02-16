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

```
buttle --port [your favorite port]
```


## getting out of control

```
buttle --watch **/*.md
```

Now you've got a live reload server watching all your markdown files.


## other fancy features

### on the fly less conversion

Requests `styles/main.css` will also find `styles/main.less` if the vanilla CSS
file does not exist.


## License

MIT
