import * as vscode from 'vscode';
import { DashboardViewProvider } from './views/dashboardView';
import { openDashboard } from './commands/openDashboard';

export function activate(context: vscode.ExtensionContext): void {
  const provider = new DashboardViewProvider(context);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(DashboardViewProvider.viewId, provider)
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('dctCopilotSkills.openDashboard', () => {
      openDashboard(context);
    })
  );
}

export function deactivate(): void {}
