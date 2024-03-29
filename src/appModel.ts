import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export class AppModel {

    createSwiftProject() {
		this.selectProjectRootFolder().then(uris => {
				if(!uris || uris.length === 0) {
					return;
				}

				let rootFolder = uris[0].fsPath;

				this.selectPackageName(rootFolder).then(packageName => {
					if(!packageName || !/^[A-Za-z0-9_\-]+$/g.test(packageName)) {
						this.showError("The project name must be composed of letters, digits, hyphens and underspaces only!");
						return;
					}

					this.createProjectFiles(rootFolder, packageName);										
				});
			}
		);
	}

	selectProjectRootFolder() {
		return vscode.window.showOpenDialog({
			'canSelectFiles': false,
			'canSelectFolders': true,
			'canSelectMany': false,
		});
	}

	selectPackageName(rootFolder: string) {
		return vscode.window.showInputBox({
			'ignoreFocusOut': true,
			'prompt': 'Choose a name for your Swift project',
			'placeHolder': 'e.g. Exercise1 (only letters and digits)',
		});
	}

	createProjectFiles(rootFolder: string, packageName: string) {
		let projectFolder = path.join(rootFolder, packageName);
		let sourcesFolder = path.join(projectFolder, "Sources");
		let targetFolder = path.join(sourcesFolder, packageName);
		let vscodeFolder = path.join(projectFolder, ".vscode");

		let createLaunchConfigurations = vscode.workspace.getConfiguration('swift-project-creation.swift').get('createLaunchConfigurations', false);

		try {
			this.makeDirSync(projectFolder);

			this.createPackageFile(projectFolder, packageName);
			this.createReadme(projectFolder, packageName);
			this.createGitIgnore(projectFolder);
			this.createMainFile(targetFolder);

			if(createLaunchConfigurations) {
				this.createLaunchFile(vscodeFolder, packageName);
			}
			
			this.createTasksFile(vscodeFolder, packageName);

			this.openProject(projectFolder);
		} catch(error) {
			this.showError("Could not create the project: " + error);
			return;
		}
	}

	createPackageFile(projectFolder: string, packageName: string) {
		let swiftToolsVersion = vscode.workspace.getConfiguration('swift-project-creation.swift').get('toolsVersion', '5.5');

		this.makeFileSync(path.join(projectFolder, "Package.swift"), `// swift-tools-version:${swiftToolsVersion}
import PackageDescription

let package = Package(
	name: "${packageName}",
	products: [
		.executable(name: "${packageName}", targets: ["${packageName}"]),
	],
	dependencies: [],
	targets: [
		.executableTarget(name: "${packageName}", dependencies: [])
	]
)
`
		);
	}

	createReadme(projectFolder: string, packageName: string) {
		this.makeFileSync(path.join(projectFolder, "README.md"), `# ${packageName}

A description of this package.
`);
	}

	createGitIgnore(projectFolder: string) {
		this.makeFileSync(path.join(projectFolder, ".gitignore"), `.DS_Store
/.build
/Packages
/*.xcodeproj
xcuserdata/
/.swiftpm
`);
	}

	createMainFile(sourcesFolder: string) {
		this.makeFileSync(path.join(sourcesFolder, "main.swift"), 'import Foundation\nprint("Hello, World!")\n');
	}

	createLaunchFile(vscodeFolder: string, packageName: string) {
		let launch = {
			"version": "0.2.0",
			"configurations": [
				{
					"type": "lldb",
					"request": "launch",
					"name": "Debug " + packageName,
					"program": "${workspaceFolder}/.build/debug/" + packageName,
					"args": [],
					"cwd": "${workspaceFolder}",
					"terminal": "integrated",
					"preLaunchTask": "swift-build"
				}
			]
		};

		this.makeFileSync(path.join(vscodeFolder, "launch.json"), JSON.stringify(launch, null, 4));
	}

	createTasksFile(vscodeFolder: string, packageName: string) {
		let tasks = {
			"version": "2.0.0",
			"tasks": [
				{
					"label": "swift-build",
					"type": "shell",
					"command": "swift build",
					"group": {
						"kind": "build",
						"isDefault": true
					}
				},
				{
					"label": "Run " + packageName,
					"type": "process",
					"command": "${workspaceFolder}/.build/debug/" + packageName,
					"group": {
						"kind": "test",
						"isDefault": true
					}
				}
			]
		};

		this.makeFileSync(path.join(vscodeFolder, "tasks.json"), JSON.stringify(tasks, null, 4));
	}

	makeDirSync(dir: string) {
		// Source: https://github.com/ritwickdey/vscode-create-file-folder/blob/master/src/appModel.ts
		if (fs.existsSync(dir)) {
			return;
		}
        if (!fs.existsSync(path.dirname(dir))) {
            this.makeDirSync(path.dirname(dir));
        }
        fs.mkdirSync(dir);
    }

    makeFileSync(filename: string, content: string) {
        if (!fs.existsSync(filename)) {
            this.makeDirSync(path.dirname(filename));
			var stream = fs.createWriteStream(filename);
			stream.write(content);
			stream.end();
        }
	}

	async openProject(projectFolder: string) {
		await vscode.commands.executeCommand("vscode.openFolder", vscode.Uri.file(projectFolder), false);
		await vscode.commands.executeCommand("vscode.open", vscode.Uri.file(path.join(projectFolder, "Sources", "main.swift")));
		/*
		// Issue: https://github.com/Microsoft/vscode/issues/43677; https://github.com/microsoft/vscode/issues/76106; https://github.com/microsoft/vscode/issues/69335
		await vscode.workspace.openTextDocument(vscode.Uri.file(path.join(projectFolder, "Sources", "main.swift"))).then(doc => {
			vscode.window.showTextDocument(doc);
		});
		*/
	}
	
	showError(msg: string) {
		vscode.window.showErrorMessage(msg);
		console.log("ERROR: " + msg);
	}

}
