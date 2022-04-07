#!/usr/bin/env node

const chalk = require("chalk");
const yargs = require("yargs");
const fs = require("fs");
const base64Convertor = require("./base64-convertor");

function builder(cmd) {
  cmd.positional("fileOrDir", {
    describe: "file or directory",
    coerce: (param) => {
      fs.lstat(param, (error, stat) => {
        if(error || !stat.isFile() && !stat.isDirectory()) {
          throw new Error(chalk.red.bold("Please give a valid file path or directory of images"));
        }
      });
      return param;
    }
  })
}

function handler({ fileOrDir }) {
  base64Convertor(fileOrDir);
}

yargs.command("* <fileOrDir>", false, builder, handler).parse();