'use strict';

import * as assert from 'assert';
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs-extra';
import * as definition from '../src/definition';

suite('UiFlow Definition Tests', () => {

	let fixturePath = path.join(__dirname, '..', '..', '__test', 'fixtures');
	let fixtureSourcePath = path.join(__dirname, '..', '..', 'test', 'fixtures');

	suiteSetup(() => {
		fs.removeSync(fixturePath);
		fs.mkdirsSync(fixturePath);
		fs.copySync(path.join(fixtureSourcePath, 'definition.uif'), path.join(fixturePath, 'definition.uif'));
	});

	test('Test provideDefinition#UiflowDefinitionProvider', done => {
		vscode.workspace.openTextDocument(path.join(fixturePath, 'definition.uif'))
			.then(doc => {
				let testCases: [vscode.Position, number][] = [
					[new vscode.Position(0, 0), null],
					[new vscode.Position(15, 3), 17],
					[new vscode.Position(15, 2), null],
					[new vscode.Position(26, 4), 9],
					[new vscode.Position(13, 4), null],
				];
				let instance = new definition.UiflowDefinitionProvider();
				let promises = testCases.map(([pos, expected]) => instance.provideDefinition(doc, pos, null)
				.then((location: vscode.Location) => {
					assert.equal(location ? location.range.start.line : location, expected, `Definition line must be ${expected}.`);
				}));
				return Promise.all(promises);
			}, reason => assert.ok(false, `Error in openTextDocument ${reason}.`))
			.then(() => done(), reason => done(reason));
	});
});