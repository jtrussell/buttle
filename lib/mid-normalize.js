
module.exports = function(indexes) {
  
  return function(req, res, next) {

    /**
     * Normalize requests around indexes, i.e. if a folder is requested and it
     * contain's an index.html file (or a README.md file...) redirect to that.
     *
     * @todo 
     */
    next();
  };
};
