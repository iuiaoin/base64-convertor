# base64-convertor
A command line tool for generating base64 code from an image(or url) or a directory that contains images.

![](https://tva4.sinaimg.cn/large/c27dfab0gy1h11bv2ru0jg20dc0b7b2b.gif)
 
[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
<img src="https://img.shields.io/npm/l/base64-convertor.svg" alt="License">

[npm-image]: https://img.shields.io/npm/v/base64-convertor.svg
[npm-url]: https://npmjs.org/package/base64-convertor
[downloads-image]: https://img.shields.io/npm/dm/base64-convertor.svg
[downloads-url]: https://npmjs.org/package/base64-convertor

## Getting Started
Installation:
```bash
yarn global add base64-convertor

or

npm install -g base64-convertor
```
Usage:
```bash
base64-convertor <path>
```
Remember to replace **`<path>`** above with your image or directory or an image url.

## About
If you input an image path or url as the param, the converted base64 code will be output in your terminal directly. Otherwise if it's a directory, base64-convertor will output the result into base64.json file in current directory after the conversion completed.

### LICENSE
[MIT](https://opensource.org/licenses/MIT) © 2017 RENAN.BAS

### Inspired by
- [ImagesToBase64](https://github.com/renanbastos93/image-to-base64)