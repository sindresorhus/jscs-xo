import path from 'path';
import childProcess from 'child_process';
import test from 'ava';

test(t => {
	t.plan(3);

	childProcess.execFile('node', [
		path.join(__dirname, 'node_modules', '.bin', 'jscs'),
		'--config=jscsrc',
		'--reporter=json',
		'--verbose',
		'fixture.js'
	], {
		cwd: __dirname
	}, function (_, stdout) {
		var errors = JSON.parse(stdout)['fixture.js'];
		t.is(errors.length, 2);
		t.regexTest(/^validateQuoteMarks/, errors[0].message);
		t.regexTest(/^requireSemicolons/, errors[1].message);
	});
});
