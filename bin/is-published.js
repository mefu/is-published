#!/usr/bin/env node

/* eslint-disable */

const isPublished = require('..').isPublished;

isPublished({
  name: process.argv[2],
  version: process.argv[3]
}).then(published => {
  if (published) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}).catch(err => {
  console.error('Error: ', err.message);
  process.exit(1);
});
