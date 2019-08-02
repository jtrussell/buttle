
module.exports = {
  wrapInHtml: function (snip) {
    return [
      '<!DOCTYPE HTML>',
      '<html>',
      '<head></head>',
      '<body>',
      snip,
      '</body>',
      '</html>'
    ].join('\n')
  }
}
