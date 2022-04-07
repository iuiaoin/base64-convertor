function validImage(image) {
  return /(?<=\S+)\.(jpg|png|jpeg)/gi.test(image);
}

module.exports = {
  validImage
}