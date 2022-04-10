const imageToBase64 = require("image-to-base64");
const chalk = require("chalk");
const fs = require("fs");
const node_path = require("path");
const process = require("process");
const { validImage, validUrl } = require("./util");

function singleToBase64(path) {
  return imageToBase64(path)
    .then((res) => {
      console.log(res);
      console.log(chalk.green.bold("The image is successfully converted to base64"));
    })
    .catch((error) => {
      console.log(chalk.red.bold(err));
    });
}

async function base64Convertor(path) {
  if (validUrl(path)) {
    return singleToBase64(path);
  }

  const stat = fs.lstatSync(path);
  if (stat.isFile()) {
    const filename = node_path.basename(path);
    if (validImage(filename)) {
      return singleToBase64(path);
    }
  }

  if (stat.isDirectory()) {
    const files = fs.readdirSync(path);
    const dataObj = {};
    for (f of files) {
      if (validImage(f)) {
        await imageToBase64(node_path.join(path, f))
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
      console.log(
        chalk.green.bold(`The images is successfully saved in ${process.cwd()}/base64.json`)
      );
    });
  }
}

module.exports = base64Convertor;