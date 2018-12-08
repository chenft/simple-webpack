#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
// 控制台字符样式
const chalk = require('chalk');
// 将绝对路径转换为波形路径
const tildify = require('tildify');
const ora = require('ora');
// 是当前执行node命令时候的文件夹地址
const projectPath = process.cwd();
const bundleFile = require('../lib/index');
const configPath = path.join(projectPath, 'pack.config.js');

function init() {
  const spinner = ora('正在打包配置文件...');
  spinner.start();

  if (!fs.existsSync(configPath)) {
    spinner.stop();
    chalk.red('找不到 "pack.config.js" 配置文件.');
  }

  const config = require(configPath);
  const result = bundleFile(config);

  try {
    fs.writeFileSync(path.join(projectPath, config.output), result);
  } catch (e) {
    fs.mkdirSync(path.dirname(config.output));
    fs.writeFileSync(path.join(projectPath, config.output), result);
  }
  spinner.stop();
  chalk.yellow('已生成对应文件。');
}

init();
