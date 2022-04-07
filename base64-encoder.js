const imageToBase64 = require("image-to-base64");
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const { validImage } = require("./util");

async function encode(fileOrDir) {
  const stat = fs.lstatSync(fileOrDir);
  if (stat.isFile()) {
    const filename = path.basename(fileOrDir);
    if (validImage(filename)) {
      await imageToBase64(fileOrDir)
        .then((res) => {
          console.log(res);
          console.log(chalk.green("The image is successfully converted to base64"));
        })
        .catch((err) => {
          console.log(chalk.red(err));
        });
    }
  }

  if (stat.isDirectory()) {
    const files = fs.readdirSync(fileOrDir);
    console.log(files);
    const dataObj = {};
    for (f of files) {
      if (validImage(f)) {
        await imageToBase64(path.join(fileOrDir, f))
          .then((res) => {
            dataObj[f] = res;
          })
          .catch((err) => {
            console.log(chalk.red(err));
          });
      }
    }
    const data = JSON.stringify(dataObj, null, "\t");
    fs.writeFile("base64.json", data, (err) => {
      if (err) {
        throw err;
      }
      console.log(chalk.green(`The images is successfully saved in ${__dirname}/base64.json`));
    });
  }
}

module.exports = encode;