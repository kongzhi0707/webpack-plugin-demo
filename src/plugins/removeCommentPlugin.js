
class RemoveCommentPlugin { 
  constructor(options) { 
    this.options = options;
  }
  apply(compiler) { 
    // 去除注释正则
    const reg = /("([^\\\"]*(\\.)?)*")|('([^\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/)|(\/\*\*\*\*\*\*\/)/g;
    
    compiler.hooks.emit.tapAsync('RemoveComment', (compilation, cb) => { 
      // 遍历构建产物， .assets 中包含构建产物的文件名
      Object.keys(compilation.assets).forEach(item => { 
        // .source() 是获取构建产物的文本
        let content = compilation.assets[item].source();
        content = content.replace(reg, function (word) { // 去除注释后的文本
          return /^\/{2,}/.test(word) || /^\/\*!/.test(word) || /^\/\*{3,}\//.test(word) ? "" : word;
        });
        // 更新构建产物对象
        compilation.assets[item] = {
          source: () => content,
          size: () => content.length
        }
      })
      // 执行回调，让webpack继续执行
      cb();
    })
  }
}

module.exports = RemoveCommentPlugin;