function validImage(image) {
  return /(?<=\S+)\.(jpg|png|jpeg)/gi.test(image);
}

function validUrl(url) {
  return /http(s)?:\/\/(\w+:?\w*@)?(\S+)(:\d+)?((?<=\.)\w+)+(\/([\w#!:.?+=&%@!\-/])*)?/gi.test(url);
}

module.exports = {
  validImage,
  validUrl
}