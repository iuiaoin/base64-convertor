#!/usr/bin/env node

const chalk = require("chalk");
const yargs = require("yargs");
const fs = require("fs");
const base64Convertor = require("./base64-convertor");
const { validUrl } = require("./util");

function builder(cmd) {
  cmd.positional("path", {
    describe: "url or file or directory",
    coerce: (param) => {
      if(validUrl(param)) return param;
      fs.lstat(param, (error, stat) => {
        if(error || !stat.isFile() && !stat.isDirectory()) {
          throw new Error(chalk.red.bold("Please give a valid url or file path or directory of images"));
        }
      });
      return param;
    }
  })
}

function handler({ path }) {
  base64Convertor(path);
}

yargs.command("* <path>", false, builder, handler).parse();