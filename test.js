import path from 'path';
import childProcess from 'child_process';
import test from 'ava';

test.cb(t => {
	childProcess.execFile('node', [
		path.join('node_modules', '.bin', 'jscs'),
		'--config=jscsrc',
		'--reporter=json',
		'--verbose',
		'fixture.js'
	], (_, stdout) => {
		const errors = JSON.parse(stdout)['fixture.js'];
		t.is(errors.length, 2);
		t.regexTest(/^validateQuoteMarks/, errors[0].message);
		t.regexTest(/^requireSemicolons/, errors[1].message);
		t.end();
	});
});
