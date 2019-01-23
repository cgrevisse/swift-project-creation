import * as vscode from 'vscode';
import { AppModel } from "./appModel";

export function activate(context: vscode.ExtensionContext) {
	const appModel = new AppModel();

	let disposable = vscode.commands.registerCommand('extension.createSwiftProject', () => {
		appModel.createSwiftProject();
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
