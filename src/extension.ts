// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
import { StatusBarAlignment, StatusBarItem, window, workspace } from 'vscode'

export function activate(context: vscode.ExtensionContext) {
	const workspaceLabel = new WorkspaceLabel()

	context.subscriptions.push(workspaceLabel)
	context.subscriptions.push(
		workspace.onDidChangeWorkspaceFolders(() => {
			workspaceLabel.refresh()
		})
	)
}

// this method is called when your extension is deactivated
export function deactivate() {}

export class WorkspaceLabel {
	private statusBarItem: StatusBarItem
	private workspaceFolderName: vscode.WorkspaceFolder[] | undefined

	constructor() {
		this.statusBarItem = window.createStatusBarItem(StatusBarAlignment.Right)
		this.workspaceFolderName = workspace.workspaceFolders
		this.updateWorkSpaceLabel()
	}

	updateWorkSpaceLabel() {
		if (this.workspaceFolderName) {
			this.statusBarItem.color = '#D73900'
			this.statusBarItem.text = `[ ${this.workspaceFolderName[0].name} ]`
			this.statusBarItem.show()
		}
	}

	refresh() {
		this.workspaceFolderName = workspace.workspaceFolders
		this.updateWorkSpaceLabel()
	}

	dispose() {
		this.statusBarItem.dispose()
	}
}
