const path = require('path')
const fs = require('fs')
const scpClient = require('scp2');
const ora = require('ora');
const chalk = require('chalk');
const helper = require('./helper')

module.exports = function (env) {

  if (!env) {
    console.log(chalk.red('请选择服务器环境'));
    return false;
  }

  const root = process.cwd();
  const configPath = path.join(root, '.scprc');

  if (!fs.existsSync(configPath)) {
    console.log(chalk.red('配置文件不存在'));
    return false;
  }

  const configStr = fs.readFileSync(configPath, 'utf8');
  try {
    const config = JSON.parse(configStr);
    const data = config[env];

    if (!data || helper.isEmptyObject(data) || !data.host || !data.port || !data.username || !data.password || !data.path) {
      console.log(chalk.red('请将配置文件补充完整'));
      return;
    }

    const buildPath = path.join(root, data.build || '/dist');
    const serverData = {
      host: data.host,
      port: data.port,
      username: data.username,
      password: data.password,
      path: data.path
    };

    const spinner = ora(env.toUpperCase() + ' 正在发布...');

    const Client = require('ssh2').Client;
    const conn = new Client();

    conn
      .on('ready', function () {
        const cmd = [];
        spinner.start();
        conn.exec(cmd.join('\n'), function (err, stream) {
          if (err) throw err;
          stream
            .on('close', function (code, signal) {
              // 在执行shell命令后，把开始上传部署项目代码放到这里面
              scpClient.scp(buildPath, serverData, function (err) {
                spinner.stop();
                if (err) {
                  console.log(chalk.red('发布失败.\n'));
                  throw err;
                } else {
                  console.log(chalk.green('Success! 成功发布到 ' + env.toUpperCase() + ' ! Ended! \n'));
                }
              });
              conn.end();
            })
            .on('data', function (data) {
              console.log('STDOUT: ' + data);
            })
            .stderr.on('data', function (data) {
              console.log('STDERR: ' + data);
            });
        });
      })
      .connect(serverData);

  } catch (e) {
    // console.log(chalk.red('配置文件格式错误'));
    console.log(chalk.red(e.message));
  }

}
