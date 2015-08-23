'use strict';
var path = require('path');
var childProcess = require('child_process');
var test = require('ava');

test(function (t) {
	t.plan(3);

	childProcess.execFile('node', [
		path.join(__dirname, 'node_modules', '.bin', 'jscs'),
		'--config=.jscs.json',
		'--reporter=json',
		'--verbose',
		'fixture.js'
	], {
		cwd: __dirname
	}, function (_, stdout) {
		var errors = JSON.parse(stdout)['fixture.js'];
		t.assert(errors.length === 2);
		t.assert(/^validateQuoteMarks/.test(errors[0].message));
		t.assert(/^requireSemicolons/.test(errors[1].message));
	});
});
