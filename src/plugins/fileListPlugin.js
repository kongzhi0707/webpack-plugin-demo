
class FileListPlugin { 
  constructor(options) { 
    // 获取插件配置项
    this.filename = options && options.filename ? options.filename : 'FILELIST.md';
  }
  apply(compiler) { 
    // 监听emit事件，编译完成后，文件内容输出到硬盘上，触发该事件
    compiler.hooks.emit.tapAsync('FileListPlugin', (compilation, cb) => { 

      // 通过 compilation.assets 获取文件数量
      let len = Object.keys(compilation.assets).length;

      // 添加统计信息
      let content = `# ${len} file${len > 1 ? 's' : ''} emitted by webpack \n\n`;

      // 通过 compilation.assets 获取文件名列表
      for (let filename in compilation.assets) { 
        content += `- ${filename}\n`;
      }

      // 往 compilation.assets 中添加清单文件
      compilation.assets[this.filename] = {
        // 写入写文件的内容
        source: function () { 
          return content;
        },
        // 新文件大小(给webpack输出展示使用)
        size: function () { 
          return content.length;
        }
      }
      // 执行回调，让webpack继续执行
      cb();
    })
  }
}

module.exports = FileListPlugin;