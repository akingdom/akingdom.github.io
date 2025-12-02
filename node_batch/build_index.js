#!/usr/bin/env node
'use strict';

class File extends Blob {
  constructor(parts, name, opts = {}) {
    super(parts, opts);
    this.name = name;
    this.lastModified = opts.lastModified || Date.now();
  }
}
globalThis.File = File;

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const lunr = require('lunr');
const matter = require('gray-matter');
const cheerio = require('cheerio');
const minimist = require('minimist');

// ---- Parse CLI Arguments ----
const argv = minimist(process.argv.slice(2), {
  string: ['src', 'out'],
  alias: { s: 'src', o: 'out' },
  default: {
    src: '.',
    out: './search_index.json'
  }
});

if (!argv.out) {
  console.error('Error: --out <path> is required');
  process.exit(1);
}

const srcDir = path.resolve(process.cwd(), argv.src);
const outPath = path.resolve(process.cwd(), argv.out);

// ---- Discover Files ----
const patterns = ['**/*.md', '**/*.html'];
const ignoreGlobs = ['**/node_modules/**', '**/.git/**', argv.out];

const files = patterns
  .map(p => glob.sync(p, { cwd: srcDir, ignore: ignoreGlobs }))
  .flat();

// ---- Parse Each File into a Doc ----
const docs = files.map(relativePath => {
  const fullPath = path.join(srcDir, relativePath);
  const ext = path.extname(relativePath).toLowerCase();
  let content = '';
  let metadata = {};

  if (ext === '.md') {
    // Extract front matter + body
    const parsed = matter.read(fullPath);
    metadata = parsed.data || {};
    content = parsed.content;

    if (!metadata.title) {
      const firstHeading = parsed.content.match(/^#\s+(.*)/m);
      if (firstHeading) metadata.title = firstHeading[1];
      else metadata.title = path.basename(relativePath, ext);
    }

  } else {
    // Load HTML, grab <title> and visible text
    const html = fs.readFileSync(fullPath, 'utf8');
    const $ = cheerio.load(html);
    metadata.title = metadata.title || $('head > title').text();
    content = $('body').text();
  }
  
  // Fallbacks
  const title = metadata.title || path.basename(relativePath, ext);
  // Normalize URL: strip index.md/html, ensure leading slash
  let url = '/' + relativePath.replace(/\\/g, '/');
  url = url.replace(/\/index\.(md|html)$/i, '/');
  url = url.replace(/\.(md|html)$/, '');

  return {
    id: relativePath,
    title,
    content,
    url
  };
});

// ---- Build Lunr Index ----
const idx = lunr(function () {
  this.ref('id');
  this.field('title', { boost: 10 });
  this.field('content', { boost: 3 });
  docs.forEach(doc => this.add(doc));
});

// ---- Assemble Final Output ----
const store = {};
docs.forEach(doc => {
  store[doc.id] = {
    title: doc.title,
    url: doc.url
  };
});

const output = {
  index: idx.toJSON(),
  store
};

// ---- Write JSON to Disk ----
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(output), 'utf8');
console.log(`✅ Search index written to ${outPath}`);
