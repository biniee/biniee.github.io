const StaticExtension = () => {
  this.tags = ['static'];

  this.parse = function(parser, nodes, lexer) {
    // get the tag token
    var tok = parser.nextToken();

    // parse the args and move after the block end. passing true
    // as the second arg is required if there are no parentheses
    var args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);

    // See above for notes about CallExtension
    return new nodes.CallExtension(this, 'run', args);
  };

  this.run = function(context, url) {
    return new nunjucks.runtime.SafeString('/' + url);
  };
}

export default StaticExtension;

// env.addExtension('StaticExtension', new StaticExtension());