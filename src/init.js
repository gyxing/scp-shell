const path = require('path')
const fs = require('fs')
const chalk = require('chalk')

module.exports = function () {

  const root = process.cwd();
  const configPath = path.join(root, '.scprc');
  // 不存在则创建
  if (!fs.existsSync(configPath)) {
    const data = {
      test: {
        build: '/dist',
        host: '127.0.0.1',
        port: 22,
        username: 'root',
        password: '123',
        path: '/home/static',
      },
      prod: {},
    };
    fs.appendFileSync(configPath, JSON.stringify(data, null, 2));
    // 添加进 gitignore
    const gitIgnorePath = path.join(root, '.gitignore');
    if (fs.existsSync(gitIgnorePath)) {
      const gitIgnoreText = fs.readFileSync(gitIgnorePath, 'utf8');
      if (gitIgnoreText.indexOf('.scprc') === -1) {
        fs.appendFileSync(gitIgnorePath, '\n# scp-shell配置文件\n.scprc');
      }
    }

    const msg = {
      build: '本地项目打包目录',
      host: '服务器IP',
      port: '服务器SCP端口，默认22',
      username: '服务器登录账号',
      password: '服务器登录密码',
      path: '服务器部署目录',
    };
    console.log(chalk.green('test => 测试环境\nprod => 线上环境\n'));
    console.log(chalk.green(JSON.stringify(msg, null, 2)));
  } else {
    console.log(chalk.red('当前配置文件已存在'));
  }
}
