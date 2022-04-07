#!/usr/bin/env node

const process = require("process");
const base64Convertor = require("./base64-convertor");

base64Convertor(process.argv[2]);