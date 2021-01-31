const program = require('commander');
const init = require('./init');
const deploy = require('./deploy');
const {name, version} = require('../package.json');

program.name(name).version(version, '-v, --version').usage('<command> [options]');

program
  .command('init')
  .alias('i')
  .description('生成初始配置文件')
  .action(init);

program
  .command('deploy')
  .option('-d, --env.dev', '开发环境')
  .option('-t, --env.test', '测试环境')
  .option('-p, --env.prod', '线上环境')
  .parse(process.argv)
  .description('发布上线')
  .action((options) => {
    let env = '';
    if (options['env.dev']) {
      env = 'dev'
    }
    if (options['env.test']) {
      env = 'test'
    }
    if (options['env.prod']) {
      env = 'prod'
    }
    deploy(env)
  });

program.on('command:*', (operands) => {
  console.error(`error: unknown command '${operands[0]}'`);
});
// process 是node的全局对象，不需要require引入
program.parse(process.argv); // 放在末尾

if (!program.args.length) {
  program.help();
}
