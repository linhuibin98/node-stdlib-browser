import createRequire from 'create-require';
import pkgDir from 'pkg-dir';

/**
 * @param {string} path
 */
const resolvePath = (path) => {
	let resolvedPath;
	try {
		resolvedPath = require.resolve(path);
	} catch {
		resolvedPath = (
			globalThis.require ?? createRequire(import.meta.url)
		).resolve(path);
	}
	if (!path.includes('./')) {
		const directory = pkgDir.sync(resolvedPath) ?? '';
		return directory;
	}
	return resolvedPath;
};

const assert = require.resolve('assert/');
const buffer = require.resolve('buffer/');
const child_process = resolvePath('./mock/child_process.js');
const cluster = resolvePath('./mock/empty.js');
const _console = require.resolve('console-browserify');
const constants = require.resolve('constants-browserify');
const crypto = require.resolve('crypto-browserify');
const dgram = resolvePath('./mock/empty.js');
const dns = resolvePath('./mock/empty.js');
const domain = require.resolve('domain-browser');
const events = require.resolve('events/');
const fs = resolvePath('./mock/empty-null.js');
const http = require.resolve('stream-http');
const https = require.resolve('https-browserify');
const http2 = resolvePath('./mock/empty.js');
const _module = resolvePath('./mock/module.js');
const net = resolvePath('./mock/empty.js');
const os = require.resolve('os-browserify/browser.js');
const path = require.resolve('path-browserify');
const punycode = require.resolve('punycode/');
const _process = resolvePath('./proxy/process');
const querystring = resolvePath('./proxy/querystring.js');
const readline = resolvePath('./mock/empty.js');
const repl = resolvePath('./mock/empty.js');
const stream = require.resolve('stream-browserify');
const _stream_duplex = require.resolve('readable-stream/lib/_stream_duplex.js');
const _stream_passthrough = require.resolve('readable-stream/lib/_stream_passthrough.js');
const _stream_readable = require.resolve('readable-stream/lib/_stream_readable.js');
const _stream_transform = require.resolve('readable-stream/lib/_stream_transform.js');
const _stream_writable = require.resolve('readable-stream/lib/_stream_writable.js');
const string_decoder = require.resolve('string_decoder/');
const sys = require.resolve('util/util.js');
const timers = require.resolve('timers-browserify');
const timersPromises = require.resolve('isomorphic-timers-promises');
const tls = resolvePath('./mock/empty.js');
const tty = require.resolve('tty-browserify');
const url = resolvePath('./proxy/url.js');
const util = require.resolve('util/util.js');
const vm = require.resolve('vm-browserify');
const zlib = require.resolve('browserify-zlib');
const v8 = resolvePath('./mock/empty.js');

const packages = {
  assert,
  buffer,
  child_process,
  cluster,
  console: _console,
  constants,
  crypto,
  dgram,
  dns,
  domain,
  events,
  'fs/promises': fs,
  fs,
  http,
  https,
  http2,
  module: _module,
  net,
  os,
  path,
  punycode,
  process: _process,
  querystring,
  readline,
  repl,
  stream,
  _stream_duplex,
  _stream_passthrough,
  _stream_readable,
  _stream_transform,
  _stream_writable,
  string_decoder,
  sys,
  'timers/promises': timersPromises,
  timers,
  tls,
  tty,
  url,
  util,
  vm,
  zlib,
  v8
};

/** @typedef {typeof packages} Packages */
/** @typedef {keyof Packages} PackageNames */
/** @typedef {{ [Property in PackageNames as `node:${Property}`]: Packages[Property] }} NodeProtocolPackages */

const packagesWithNodeProtocol = /** @type NodeProtocolPackages */ ({});
for (const [packageName, packagePath] of Object.entries(packages)) {
	packagesWithNodeProtocol[
		`node:${/** @type PackageNames */ (packageName)}`
	] = /** @type PackageNames */ packagePath;
}

export default {
	...packages,
	...packagesWithNodeProtocol
};
