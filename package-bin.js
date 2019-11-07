#!/usr/bin/env node

const OLSKSpec = require('./main.js');

const mod = {

	// COMMAND

	CommandLogicTests() {
		require('child_process').spawn('mocha', [].concat.apply([], [
			'**/*-tests.js',
			'--exclude', '**/+(node_modules|__*)/**',
			'--watch',
			'--file', require('path').join(__dirname, 'mocha-start.js'),

			process.argv.slice(2).length
			? process.argv.slice(2)
			: ['--reporter', 'min'],

			]), {
				stdio: 'inherit'
			});
	},

	CommandUITests(args) {
	},

	// LIFECYCLE

	LifecycleScriptDidLoad() {
		if (process.argv[1].endsWith('olsk-spec-ui')) {
			return mod.CommandUITests(process.argv.slice(2));
		};

		if (process.argv[1].endsWith('olsk-spec') && process.argv[2] === 'ui') {
			return mod.CommandUITests(process.argv.slice(3));
		};

		mod.CommandLogicTests();
	},

};

mod.LifecycleScriptDidLoad();
