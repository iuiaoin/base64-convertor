const imageToBase64 = require("image-to-base64");
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const process = require("process");
const { validImage } = require("./util");

async function base64Convertor(fileOrDir) {
  const stat = fs.lstatSync(fileOrDir);
  if (stat.isFile()) {
    const filename = path.basename(fileOrDir);
    if (validImage(filename)) {
      await imageToBase64(fileOrDir)
        .then((res) => {
          console.log(res);
          console.log(chalk.green.bold("The image is successfully converted to base64"));
        })
        .catch((err) => {
          console.log(chalk.red.bold(err));
        });
    }
  }

  if (stat.isDirectory()) {
    const files = fs.readdirSync(fileOrDir);
    const dataObj = {};
    for (f of files) {
      if (validImage(f)) {
        await imageToBase64(path.join(fileOrDir, f))
          .then((res) => {
            dataObj[f] = res;
          })
          .catch((err) => {
            console.log(chalk.red.bold(err));
          });
      }
    }
    const data = JSON.stringify(dataObj, null, "\t");
    fs.writeFile("base64.json", data, (err) => {
      if (err) {
        throw err;
      }
      console.log(chalk.green.bold(`The images is successfully saved in ${process.cwd()}/base64.json`));
    });
  }
}

module.exports = base64Convertor;