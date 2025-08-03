#!/bin/bash
cd "$(dirname "$0")"
pwd
npm ci
node build_index.js --src ../ --out ../assets/search_index.json
