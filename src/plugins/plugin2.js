
class WebpackPlugin2 { 
  constructor(options) { 
    this.options = options;
  }
  apply(compiler) { 
    // 在编译器开始读取记录前执行 
    compiler.hooks.run.tap('run', () => {
      console.log('开始编译....');
    });
    // 在一个新的 compilation 创建之前执行
    compiler.hooks.compile.tap('compile', () => {
      console.log('---compile---');
    });
    // 一次编译完成后执行
    compiler.hooks.done.tap('compilation', () => { 
      console.log('---compilation---');
    })
  }
}

module.exports = WebpackPlugin2;