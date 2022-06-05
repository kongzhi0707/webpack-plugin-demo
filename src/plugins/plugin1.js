
class WebpackPlugin1 { 
  constructor(options) { 
    this.options = options;
  }
  apply(compiler) {
    compiler.hooks.done.tap('firstPlugin', () => { 
      console.log(this.options);
    })
  }
}

module.exports = WebpackPlugin1;